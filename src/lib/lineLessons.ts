import type { Opening } from '../data/openings.ts'
import type { Lesson, Step } from '../data/lessons/index.ts'
import { lineComments, type Comment } from '../data/lineComments/index.ts'
import { commonPrefixLength, getLines, type ParsedLine } from './exercises.ts'

const PIECES: Record<string, string> = { K: 'rey', Q: 'dama', R: 'torre', B: 'alfil', N: 'caballo' }

/** Convierte una jugada SAN en texto para leer en voz alta: "Nxe5+" → "Caballo come en e5, jaque". */
export function spokenMove(san: string): string {
  const check = san.endsWith('#') ? ', jaque mate' : san.endsWith('+') ? ', jaque' : ''
  const core = san.replace(/[+#]$/, '')
  if (core === 'O-O') return `Enroque corto${check}`
  if (core === 'O-O-O') return `Enroque largo${check}`
  const promo = core.match(/=([QRBN])$/)
  const body = core.replace(/=[QRBN]$/, '')
  const target = body.slice(-2)
  const capture = body.includes('x')
  const piece = PIECES[body[0]] ?? 'peón'
  const text = `${piece[0].toUpperCase()}${piece.slice(1)} ${capture ? 'come en ' : ''}${target}`
  return `${text}${promo ? ` y corona ${PIECES[promo[1]]}` : ''}${check}`
}

/** Etiqueta de una jugada según su posición: ply 0 → "1.e4", ply 1 → "1...e5". */
export const moveLabel = (ply: number, san: string) => `${Math.floor(ply / 2) + 1}${ply % 2 === 0 ? '.' : '...'}${san}`

const asStep = (c: Comment | undefined): Partial<Step> => (typeof c === 'string' ? { say: c } : (c ?? {}))

const lessonCache = new Map<string, Lesson[]>()

function buildLineLesson(opening: Opening, line: ParsedLine, start: number): Lesson {
  const comments = lineComments[opening.id]?.[line.name] ?? {}
  // Comentarios compartidos por todas las líneas de la apertura (jugadas tempranas).
  const shared = lineComments[opening.id]?.['*'] ?? {}
  const sans = line.moves.map((m) => m.san)
  const intro = comments.intro
  const steps: Step[] = [
    {
      say: [
        `Variante: ${line.name}.`,
        start > 0 ? 'Partimos de la posición básica de esta apertura.' : '',
        typeof intro === 'string' ? intro : (intro?.say ?? line.note ?? ''),
      ]
        .filter(Boolean)
        .join(' '),
      ...(typeof intro === 'object' ? { arrows: intro.arrows, marks: intro.marks } : {}),
    },
  ]
  for (let ply = start; ply < line.moves.length; ply++) {
    const move = line.moves[ply]
    const label = moveLabel(ply, move.san)
    const c = asStep(comments[label] ?? shared[label])
    const spoken = `${spokenMove(move.san)}${move.bad ? ': un error' : ''}.`
    steps.push({ play: move.san, say: c.say ? `${spoken} ${c.say}` : spoken, arrows: c.arrows, marks: c.marks })
  }
  const outro = comments.outro
  steps.push({
    say:
      (typeof outro === 'string' ? outro : outro?.say) ??
      'Así termina esta línea. Practicala ahora en Líneas completas para fijarla en la memoria.',
    ...(typeof outro === 'object' ? { arrows: outro.arrows, marks: outro.marks } : {}),
  })
  return {
    id: `linea:${line.id}`,
    title: line.name,
    summary: line.note ?? `Video de la línea completa, ${Math.ceil(sans.length / 2)} jugadas.`,
    side: opening.side,
    start: sans.slice(0, start).join(' '),
    steps,
  }
}

/** Un video por cada línea de la apertura, narrado jugada por jugada. */
export function lineLessons(opening: Opening): Lesson[] {
  const cached = lessonCache.get(opening.id)
  if (cached) return cached
  const lines = getLines(opening)
  const start = commonPrefixLength(lines.map((l) => l.moves))
  const lessons = lines.map((l) => buildLineLesson(opening, l, start))
  lessonCache.set(opening.id, lessons)
  return lessons
}
