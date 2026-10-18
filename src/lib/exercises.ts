import { Chess } from 'chess.js'
import type { Color, Line, Opening } from '../data/openings.ts'

export interface ParsedMove {
  san: string
  bad: boolean
}

export interface Exercise {
  id: string
  fen: string
  turn: Color
  /** Jugadas de libro aceptadas en esta posición (SAN). */
  answers: string[]
  /** Jugadas que llevaron a esta posición, de la primera línea que la alcanza. */
  history: ParsedMove[]
  lineName: string
  lineNote?: string
}

export interface ParsedLine {
  id: string
  name: string
  note?: string
  moves: ParsedMove[]
}

export function parseMoves(text: string): ParsedMove[] {
  return text
    .replace(/\d+\.(\.\.)?/g, ' ')
    .trim()
    .split(/\s+/)
    .map((tok) => ({ san: tok.replace(/[?!]+$/, ''), bad: /\?$/.test(tok) }))
}

const slug = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export function parseLine(openingId: string, line: Line): ParsedLine {
  return { id: `${openingId}/${slug(line.name)}`, name: line.name, note: line.note, moves: parseMoves(line.moves) }
}

/** FEN sin contadores de jugadas: identifica la posición aunque se llegue por transposición. */
export const positionKey = (fen: string) => fen.split(' ').slice(0, 4).join(' ')

function commonPrefixLength(lines: ParsedMove[][]): number {
  let n = 0
  for (;;) {
    const san = lines[0][n]?.san
    if (!san || lines.some((l) => l[n]?.san !== san)) return n
    n++
  }
}

const cache = new Map<string, Exercise[]>()

export function buildExercises(opening: Opening): Exercise[] {
  const cached = cache.get(opening.id)
  if (cached) return cached

  const lines = opening.lines.map((l) => parseLine(opening.id, l))
  const start = commonPrefixLength(lines.map((l) => l.moves))
  const byKey = new Map<string, Exercise>()

  for (const line of lines) {
    const chess = new Chess()
    for (const [ply, move] of line.moves.entries()) {
      const fen = chess.fen()
      if (ply >= start && !move.bad) {
        const key = positionKey(fen)
        const existing = byKey.get(key)
        if (existing) {
          if (!existing.answers.includes(move.san)) existing.answers.push(move.san)
        } else {
          byKey.set(key, {
            id: `${opening.id}:${key}`,
            fen,
            turn: chess.turn(),
            answers: [move.san],
            history: line.moves.slice(0, ply),
            lineName: line.name,
            lineNote: line.note,
          })
        }
      }
      try {
        chess.move(move.san)
      } catch {
        console.error(`Jugada ilegal en "${line.name}": ${move.san}`)
        break
      }
    }
  }

  const result = [...byKey.values()]
  cache.set(opening.id, result)
  return result
}

export function getLines(opening: Opening): ParsedLine[] {
  return opening.lines.map((l) => parseLine(opening.id, l))
}
