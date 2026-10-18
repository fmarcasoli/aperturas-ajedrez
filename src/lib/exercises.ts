import { Chess } from 'chess.js'
import type { Color, Line, Opening } from '../data/openings.ts'

export interface ParsedMove {
  san: string
  bad: boolean
}

/** Una jugada del árbol: lleva de una posición a la siguiente. */
export interface TreeMove {
  san: string
  bad: boolean
  from: string
  to: string
  next: string
  nextFen: string
  lineName: string
  lineNote?: string
  /** Nombres de todas las líneas que pasan por esta jugada. */
  lines: string[]
}

export interface TreeNode {
  key: string
  fen: string
  turn: Color
  moves: TreeMove[]
}

export interface Exercise {
  id: string
  key: string
  fen: string
  turn: Color
  /** Jugadas de libro aceptadas en esta posición (SAN). */
  answers: string[]
  /** Jugadas que llevaron a esta posición, de la primera línea que la alcanza. */
  history: ParsedMove[]
  lineName: string
}

export interface OpeningTree {
  nodes: Map<string, TreeNode>
  exercises: Exercise[]
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

/** id de estadísticas de una posición. */
export const exerciseId = (openingId: string, key: string) => `${openingId}:${key}`

export function commonPrefixLength(lines: ParsedMove[][]): number {
  let n = 0
  for (;;) {
    const san = lines[0][n]?.san
    if (!san || lines.some((l) => l[n]?.san !== san)) return n
    n++
  }
}

export const goodMoves = (node: TreeNode | undefined) => (node ? node.moves.filter((m) => !m.bad) : [])

const cache = new Map<string, OpeningTree>()

export function buildTree(opening: Opening): OpeningTree {
  const cached = cache.get(opening.id)
  if (cached) return cached

  const lines = opening.lines.map((l) => parseLine(opening.id, l))
  const start = commonPrefixLength(lines.map((l) => l.moves))
  const nodes = new Map<string, TreeNode>()
  const exercises = new Map<string, Exercise>()

  for (const line of lines) {
    const chess = new Chess()
    for (const [ply, move] of line.moves.entries()) {
      const fen = chess.fen()
      const key = positionKey(fen)
      let result
      try {
        result = chess.move(move.san)
      } catch {
        console.error(`Jugada ilegal en "${line.name}": ${move.san}`)
        break
      }

      let node = nodes.get(key)
      if (!node) {
        node = { key, fen, turn: result.color, moves: [] }
        nodes.set(key, node)
      }
      const existing = node.moves.find((m) => m.san === move.san)
      if (existing) {
        // Si alguna línea la marca como buena, prevalece.
        existing.bad &&= move.bad
        if (!existing.lines.includes(line.name)) existing.lines.push(line.name)
      } else {
        node.moves.push({
          san: move.san,
          bad: move.bad,
          from: result.from,
          to: result.to,
          next: positionKey(chess.fen()),
          nextFen: chess.fen(),
          lineName: line.name,
          lineNote: line.note,
          lines: [line.name],
        })
      }

      if (ply >= start && !move.bad) {
        const ex = exercises.get(key)
        if (ex) {
          if (!ex.answers.includes(move.san)) ex.answers.push(move.san)
        } else {
          exercises.set(key, {
            id: exerciseId(opening.id, key),
            key,
            fen,
            turn: result.color,
            answers: [move.san],
            history: line.moves.slice(0, ply),
            lineName: line.name,
          })
        }
      }
    }
  }

  const tree = { nodes, exercises: [...exercises.values()] }
  cache.set(opening.id, tree)
  return tree
}

export const buildExercises = (opening: Opening) => buildTree(opening).exercises

export function getLines(opening: Opening): ParsedLine[] {
  return opening.lines.map((l) => parseLine(opening.id, l))
}
