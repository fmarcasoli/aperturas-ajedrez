import { Chess } from 'chess.js'
import { openings } from '../src/data/openings.ts'
import { buildExercises } from '../src/lib/exercises.ts'

let bad = 0
for (const o of openings) {
  for (const l of o.lines) {
    const toks = l.moves.replace(/\d+\.(\.\.)?/g, ' ').trim().split(/\s+/)
    const c = new Chess()
    for (const t of toks) {
      const san = t.replace(/[?!]+$/, '')
      try { c.move(san) } catch { console.log(`ILEGAL [${o.id}] ${l.name}: ${t} en ${c.history().join(' ')}`); bad++; break }
      if (san.endsWith('#') && !c.isCheckmate()) { console.log(`NO MATE [${o.id}] ${l.name}: ${t}`); bad++ }
    }
  }
  const ex = buildExercises(o)
  const w = ex.filter(e => e.turn === 'w').length
  console.log(`${o.id}: ${ex.length} ejercicios (blancas ${w}, negras ${ex.length - w}), ${o.lines.length} líneas`)
}
process.exit(bad ? 1 : 0)
