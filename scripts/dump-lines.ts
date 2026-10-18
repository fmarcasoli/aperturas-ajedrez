// Lista las jugadas numeradas de cada línea (para escribir los comentarios de los videos).
import { openings } from '../src/data/openings.ts'
import { commonPrefixLength, getLines } from '../src/lib/exercises.ts'
import { moveLabel } from '../src/lib/lineLessons.ts'
const id = process.argv[2]
const o = openings.find((x) => x.id === id)!
const lines = getLines(o)
const start = commonPrefixLength(lines.map((l) => l.moves))
console.log(`prefijo: ${lines[0].moves.slice(0, start).map((m, i) => moveLabel(i, m.san)).join(' ')}`)
for (const l of lines) console.log(`\n## ${l.name}\n${l.moves.slice(start).map((m, i) => moveLabel(start + i, m.san) + (m.bad ? '?' : '')).join(' ')}`)
