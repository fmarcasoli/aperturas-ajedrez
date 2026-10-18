// Narración con la voz del dispositivo (Web Speech API).

const VOICE_KEY = 'aperturas-ajedrez:voz'
const LANG_RANK = ['es-AR', 'es-419', 'es-US', 'es-MX', 'es-ES']

export const speechSupported = () => typeof window !== 'undefined' && 'speechSynthesis' in window

export function spanishVoices(): SpeechSynthesisVoice[] {
  if (!speechSupported()) return []
  const rank = (v: SpeechSynthesisVoice) => {
    const i = LANG_RANK.indexOf(v.lang.replace('_', '-'))
    const quality = /premium|enhanced|mejorad|natural|google/i.test(v.name) ? -0.5 : 0
    // Voces novedosas de macOS/iOS: suenan poco naturales para narrar.
    const novelty = /^(eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley)\b/i.test(v.name) ? 10 : 0
    return (i === -1 ? LANG_RANK.length : i) + quality + novelty
  }
  return speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith('es'))
    .sort((a, b) => rank(a) - rank(b))
}

export function savedVoiceName(): string | null {
  try {
    return localStorage.getItem(VOICE_KEY)
  } catch {
    return null
  }
}

export function saveVoiceName(name: string) {
  try {
    localStorage.setItem(VOICE_KEY, name)
  } catch {
    // ignorar
  }
}

export function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = spanishVoices()
  const saved = savedVoiceName()
  return voices.find((v) => v.name === saved) ?? voices[0]
}

/** iOS solo deja hablar si la primera locución ocurre dentro de un toque del usuario. */
export function unlockSpeech() {
  if (!speechSupported()) return
  const u = new SpeechSynthesisUtterance(' ')
  u.volume = 0
  speechSynthesis.speak(u)
}

const sentences = (text: string) => text.match(/[^.!?…]+[.!?…]*/g)?.map((s) => s.trim()).filter(Boolean) ?? [text]

/**
 * Lee el texto oración por oración (Chrome corta las locuciones largas) y llama a onEnd al terminar.
 * Devuelve una función para cancelar.
 */
export function speak(text: string, opts: { rate: number; onEnd: () => void }): () => void {
  let cancelled = false
  let timer: ReturnType<typeof setTimeout> | undefined
  const parts = sentences(text)

  // Sin voz disponible: avanzar según el tiempo de lectura estimado.
  if (!speechSupported() || !spanishVoices().length) {
    timer = setTimeout(() => !cancelled && opts.onEnd(), (text.split(/\s+/).length / 2.6 / opts.rate) * 1000 + 800)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }

  const voice = pickVoice()
  speechSynthesis.cancel()

  const sayPart = (i: number) => {
    if (cancelled) return
    if (i >= parts.length) return opts.onEnd()
    const u = new SpeechSynthesisUtterance(parts[i])
    if (voice) {
      u.voice = voice
      u.lang = voice.lang
    } else {
      u.lang = 'es-ES'
    }
    u.rate = opts.rate
    let done = false
    const next = () => {
      if (done) return
      done = true
      clearTimeout(timer)
      sayPart(i + 1)
    }
    u.onend = next
    u.onerror = next
    // Red de seguridad por si el navegador no dispara onend.
    timer = setTimeout(next, (parts[i].split(/\s+/).length / 2 / opts.rate) * 1000 + 2500)
    speechSynthesis.speak(u)
  }
  sayPart(0)

  return () => {
    cancelled = true
    clearTimeout(timer)
    speechSynthesis.cancel()
  }
}
