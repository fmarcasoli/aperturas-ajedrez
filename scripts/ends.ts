// Muestra la posición final de cada línea (para escribir continuaciones).
import { Chess } from 'chess.js'
import { openings } from '../src/data/openings.ts'
import { parseMoves } from '../src/lib/exercises.ts'
const only = process.argv[2]
for (const o of openings) {
  if (only && o.id !== only) continue
  for (const l of o.lines) {
    const c = new Chess()
    for (const m of parseMoves(l.moves)) c.move(m.san)
    const h = c.history()
    const n = h.length
    const board = c.board().map((r) => r.map((p) => (p ? (p.color === 'w' ? p.type.toUpperCase() : p.type) : '.')).join('')).join('/')
    console.log(`[${o.id}] ${l.name} | plies ${n} | ...${h.slice(-4).join(' ')} | ${c.turn()} to move | ${board}`)
  }
}
