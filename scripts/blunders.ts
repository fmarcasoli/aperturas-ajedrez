// Heurística: avisa si en alguna línea queda material grande sin tomar (posible error al escribir la teoría).
import { Chess } from 'chess.js'
import { openings } from '../src/data/openings.ts'
import { parseMoves } from '../src/lib/exercises.ts'
const V: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }
function gain(c: Chess, m: { to: string; captured?: string; piece: string; san: string }) {
  if (!m.captured) return 0
  c.move(m.san)
  const recapture = c.moves({ verbose: true }).some((r) => r.to === m.to)
  c.undo()
  return V[m.captured] - (recapture ? V[m.piece] : 0)
}
for (const o of openings) for (const l of o.lines) {
  const c = new Chess()
  const moves = parseMoves(l.moves)
  moves.forEach((mv, i) => {
    const legal = c.moves({ verbose: true })
    const scored = legal.map((m) => [gain(c, m), m.san] as const).sort((a, b) => b[0] - a[0])
    const best = Math.max(0, scored[0]?.[0] ?? 0)
    const book = c.move(mv.san)
    c.undo()
    const g = gain(c, book)
    if (best - g >= 3 && !mv.bad && !book.san.includes('+') && !book.san.includes('#')) console.log(`[${o.id}] ${l.name} | jugada ${Math.floor(i / 2) + 1}${i % 2 ? '...' : '.'}${mv.san} | había +${best} con ${scored[0][1]}`)
    c.move(mv.san)
  })
}
