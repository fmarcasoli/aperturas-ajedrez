import { useEffect, useMemo, useRef, useState } from 'react'
import type { Lesson } from '../data/lessons/index.ts'
import { buildFrames, estimateSeconds, type Frame } from '../lib/lessonFrames.ts'
import { pickVoice, saveVoiceName, speak, speechSupported, spanishVoices, unlockSpeech } from '../lib/speech.ts'
import { Board } from './Board.tsx'
import { MoveList } from './MoveList.tsx'

const RATE_KEY = 'aperturas-ajedrez:velocidad'
const SEEN_KEY = 'aperturas-ajedrez:vistos'

const minutes = (lesson: Lesson) => {
  const s = Math.round(estimateSeconds(lesson))
  return s < 60 ? `${s} s` : `${Math.round(s / 60)} min`
}

function loadSeen(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY) ?? '{}') as Record<string, boolean>
  } catch {
    return {}
  }
}

function markSeen(id: string) {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify({ ...loadSeen(), [id]: true }))
  } catch {
    // ignorar
  }
}

interface TabProps {
  lessons: Lesson[]
  lineLessons: Lesson[]
  initialId?: string
  onOpen?: (id: string | null) => void
}

export function LessonsTab({ lessons, lineLessons, initialId, onOpen }: TabProps) {
  const all = useMemo(() => [...lessons, ...lineLessons], [lessons, lineLessons])
  const found = initialId ? all.findIndex((l) => l.id === initialId) : -1
  const [current, setCurrent] = useState<number | null>(found >= 0 ? found : null)
  const [seen, setSeen] = useState(loadSeen)

  const open = (i: number | null) => {
    setCurrent(i)
    onOpen?.(i === null ? null : all[i].id)
    window.scrollTo(0, 0)
  }

  if (current !== null) {
    const lesson = all[current]
    return (
      <LessonPlayer
        key={lesson.id}
        lesson={lesson}
        onBack={() => {
          setSeen(loadSeen())
          open(null)
        }}
        next={current + 1 < all.length ? { title: all[current + 1].title, go: () => open(current + 1) } : undefined}
      />
    )
  }

  const item = (l: Lesson, i: number, kind: string) => (
    <li key={l.id}>
      <button onClick={() => open(i)}>
        <span className="lesson-play">▶</span>
        <span className="lesson-info">
          <span className="lesson-kind">{kind} · {minutes(l)}</span>
          <span className="line-name">{l.title}</span>
          {kind !== 'Línea' && <span className="small muted">{l.summary}</span>}
        </span>
        {seen[l.id] && <span className="check">✓</span>}
      </button>
    </li>
  )

  return (
    <div className="panel">
      <p className="small muted">
        Lecciones animadas con voz: mirá primero el video general, después los cortos y por último el video de cada línea. Funcionan mejor con el sonido activado.
      </p>
      <ul className="lesson-list">{lessons.map((l, i) => item(l, i, i === 0 ? 'Video general' : 'Video corto'))}</ul>
      {lineLessons.length > 0 && (
        <>
          <h3 className="section-title">Un video por cada línea ({lineLessons.length})</h3>
          <ul className="lesson-list compact">{lineLessons.map((l, i) => item(l, lessons.length + i, 'Línea'))}</ul>
        </>
      )}
    </div>
  )
}

interface PlayerProps {
  lesson: Lesson
  onBack: () => void
  backLabel?: string
  next?: { title: string; go: () => void }
}

export function LessonPlayer({ lesson, onBack, backLabel = '← Videos', next }: PlayerProps) {
  const { start, steps } = useMemo(() => buildFrames(lesson), [lesson])
  const [idx, setIdx] = useState(-1) // -1: portada · steps.length: fin
  const [playing, setPlaying] = useState(false)
  const [frame, setFrame] = useState<Frame>(start)
  const [decor, setDecor] = useState(false)
  const [rate, setRate] = useState(() => {
    try {
      return Number(localStorage.getItem(RATE_KEY)) || 1
    } catch {
      return 1
    }
  })
  const [voices, setVoices] = useState(spanishVoices)
  const [voiceName, setVoiceName] = useState(() => pickVoice()?.name ?? '')
  const run = useRef(0)
  const cancelSpeech = useRef<(() => void) | undefined>(undefined)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (!speechSupported()) return
    const update = () => {
      setVoices(spanishVoices())
      setVoiceName((n) => n || pickVoice()?.name || '')
    }
    speechSynthesis.addEventListener('voiceschanged', update)
    return () => speechSynthesis.removeEventListener('voiceschanged', update)
  }, [])

  function stopAll() {
    run.current++
    cancelSpeech.current?.()
    cancelSpeech.current = undefined
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  useEffect(() => stopAll, [])

  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms))

  function finish() {
    setPlaying(false)
    setIdx(steps.length)
    setDecor(false)
    markSeen(lesson.id)
  }

  function runStep(i: number, speed = rate) {
    stopAll()
    const id = run.current
    const st = steps[i]
    setIdx(i)
    setDecor(false)
    setFrame(st.before)
    let k = 0
    const tick = () => {
      if (id !== run.current) return
      if (k < st.anim.length) {
        setFrame(st.anim[k++])
        later(tick, 750 / speed)
        return
      }
      setDecor(true)
      cancelSpeech.current = speak(st.say, {
        rate: speed,
        onEnd: () => {
          if (id !== run.current) return
          later(() => {
            if (id !== run.current) return
            if (i + 1 < steps.length) runStep(i + 1, speed)
            else finish()
          }, 650)
        },
      })
    }
    later(tick, st.anim.length ? 350 : 50)
  }

  function show(i: number) {
    stopAll()
    setIdx(i)
    setFrame(steps[i].after)
    setDecor(true)
  }

  function play() {
    unlockSpeech()
    setPlaying(true)
    runStep(idx < 0 || idx >= steps.length ? 0 : idx)
  }

  function pause() {
    stopAll()
    setPlaying(false)
    if (idx >= 0 && idx < steps.length) {
      setFrame(steps[idx].after)
      setDecor(true)
    }
  }

  function goTo(i: number) {
    const target = Math.max(0, Math.min(steps.length - 1, i))
    if (playing) runStep(target)
    else show(target)
  }

  function changeRate(r: number) {
    setRate(r)
    try {
      localStorage.setItem(RATE_KEY, String(r))
    } catch {
      // ignorar
    }
    if (playing && idx >= 0 && idx < steps.length) runStep(idx, r)
  }

  const step = idx >= 0 && idx < steps.length ? steps[idx] : undefined
  const ended = idx >= steps.length
  const history = frame.history.map((san) => ({ san, bad: false }))

  return (
    <div className="practice">
      <div className="board-col">
        <div className="video-frame">
          <Board
            fen={frame.fen}
            orientation={lesson.side}
            interactive={false}
            onMove={() => false}
            lastMove={frame.last}
            arrows={decor && step ? step.arrows : []}
            marks={decor && step ? step.marks : []}
          />
          {idx === -1 && (
            <button className="video-cover" onClick={play}>
              <span className="video-cover-play">▶</span>
              <span className="video-cover-title">{lesson.title}</span>
              <span className="small">{minutes(lesson)} · con voz en español</span>
            </button>
          )}
          {ended && (
            <div className="video-cover">
              <span className="video-cover-title">¡Fin del video!</span>
              <div className="actions">
                <button className="btn" onClick={() => {
                  setPlaying(true)
                  runStep(0)
                }}>↺ Ver de nuevo</button>
                {next && <button className="btn primary" onClick={next.go}>Siguiente →</button>}
              </div>
              {next && <span className="small">Sigue: {next.title}</span>}
            </div>
          )}
        </div>
        <div className="caption" aria-live="polite">
          {step ? step.say : ended ? 'Practicá ahora estas ideas en Líneas completas y Ejercicios.' : lesson.summary}
        </div>
        <div className="video-controls">
          <button className="ctl" onClick={() => goTo(idx - 1)} disabled={idx <= 0} aria-label="Paso anterior">⏮</button>
          {playing ? (
            <button className="ctl main" onClick={pause} aria-label="Pausa">⏸</button>
          ) : (
            <button className="ctl main" onClick={play} aria-label="Reproducir">▶</button>
          )}
          <button className="ctl" onClick={() => goTo(idx + 1)} disabled={idx >= steps.length - 1} aria-label="Paso siguiente">⏭</button>
          <div className="seek">
            {steps.map((_, i) => (
              <button
                key={i}
                className={`seg-dot${i < idx ? ' done' : ''}${i === idx ? ' cur' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Ir al paso ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="line-head">
          <button className="btn ghost small-btn" onClick={() => { stopAll(); onBack() }}>{backLabel}</button>
          <div className="variant-name">{lesson.title}</div>
        </div>
        <div className="stats-row">
          <span>Paso {Math.max(0, Math.min(idx + 1, steps.length))} / {steps.length}</span>
          <span>{minutes(lesson)}</span>
        </div>
        <MoveList moves={history} current={history.length - 1} />
        <div className="video-settings">
          <label>
            Velocidad
            <select value={rate} onChange={(e) => changeRate(Number(e.target.value))}>
              <option value={0.85}>Lenta</option>
              <option value={1}>Normal</option>
              <option value={1.15}>Rápida</option>
            </select>
          </label>
          {voices.length > 1 && (
            <label>
              Voz
              <select
                value={voiceName}
                onChange={(e) => {
                  setVoiceName(e.target.value)
                  saveVoiceName(e.target.value)
                }}
              >
                {voices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        {!speechSupported() || (voices.length === 0 && speechSupported()) ? (
          <p className="small muted">
            Si no escuchás la voz, revisá que el sonido esté activado. En algunos navegadores la voz en español tarda unos segundos en cargar; los subtítulos siempre se muestran.
          </p>
        ) : null}
      </div>
    </div>
  )
}
