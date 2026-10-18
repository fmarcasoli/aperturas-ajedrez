import { Chess, type Square } from 'chess.js'
import type { Lesson } from '../data/lessons/index.ts'

export interface Frame {
  fen: string
  last?: [string, string]
  /** SAN de todas las jugadas que llevaron a esta posición. */
  history: string[]
}

export type ArrowSpec = [Square, Square, string]

export interface StepFrames {
  before: Frame
  /** Posiciones intermedias que se animan (incluye la final). */
  anim: Frame[]
  after: Frame
  arrows: ArrowSpec[]
  marks: string[]
  say: string
}

const COLORS: Record<string, string> = {
  g: 'rgba(21, 128, 61, 0.8)',
  r: 'rgba(220, 38, 38, 0.8)',
  b: 'rgba(37, 99, 235, 0.8)',
  y: 'rgba(234, 179, 8, 0.85)',
}

export function parseArrows(spec?: string): ArrowSpec[] {
  if (!spec) return []
  return spec
    .trim()
    .split(/\s+/)
    .map((tok) => {
      const [sq, color = 'g'] = tok.split(':')
      return [sq.slice(0, 2) as Square, sq.slice(2, 4) as Square, COLORS[color] ?? COLORS.g]
    })
}

const tokens = (s?: string) => (s ? s.trim().split(/\s+/) : [])

/** Precalcula todas las posiciones de una lección. Lanza error si alguna jugada es ilegal. */
export function buildFrames(lesson: Lesson): { start: Frame; steps: StepFrames[] } {
  const chess = new Chess()
  const stack: Frame[] = [{ fen: chess.fen(), history: [] }]

  const push = (san: string) => {
    const top = stack[stack.length - 1]
    const c = new Chess(top.fen)
    const m = c.move(san)
    stack.push({ fen: c.fen(), last: [m.from, m.to], history: [...top.history, m.san] })
  }

  for (const san of tokens(lesson.start)) push(san)
  const start = stack[stack.length - 1]

  const steps = lesson.steps.map((step) => {
    const before = stack[stack.length - 1]
    const anim: Frame[] = []
    if (step.undo) {
      if (step.undo >= stack.length) throw new Error(`undo ${step.undo} demasiado grande`)
      stack.length -= step.undo
      anim.push(stack[stack.length - 1])
    }
    for (const san of tokens(step.play)) {
      push(san)
      anim.push(stack[stack.length - 1])
    }
    return {
      before,
      anim,
      after: stack[stack.length - 1],
      arrows: parseArrows(step.arrows),
      marks: tokens(step.marks),
      say: step.say,
    }
  })

  return { start, steps }
}

/** Duración estimada en segundos (voz + animaciones). */
export function estimateSeconds(lesson: Lesson): number {
  return lesson.steps.reduce((acc, s) => acc + s.say.split(/\s+/).length / 2.6 + tokens(s.play).length * 0.7 + 0.6, 0)
}
