import { Chess } from 'chess.js'
import { openings } from '../src/data/openings.ts'
import { buildExercises } from '../src/lib/exercises.ts'
import { intro, lessonsByOpening } from '../src/data/lessons/index.ts'
import { buildFrames, estimateSeconds } from '../src/lib/lessonFrames.ts'
import { lineLessons, moveLabel } from '../src/lib/lineLessons.ts'
import { lineComments } from '../src/data/lineComments/index.ts'
import { parseMoves as pm } from '../src/lib/exercises.ts'

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
const sq = /^[a-h][1-8]$/
let secs = 0
for (const lesson of [intro, ...Object.values(lessonsByOpening).flat()]) {
  try {
    const f = buildFrames(lesson)
    for (const st of f.steps) {
      for (const [a, b] of st.arrows) if (!sq.test(a) || !sq.test(b)) throw new Error(`flecha inválida ${a}${b}`)
      for (const m of st.marks) if (!sq.test(m)) throw new Error(`casilla inválida ${m}`)
    }
    secs += estimateSeconds(lesson)
  } catch (e) {
    console.log(`LECCIÓN ${lesson.id}: ${(e as Error).message}`)
    bad++
  }
}
for (const o of openings) if (!lessonsByOpening[o.id]?.length) console.log(`SIN LECCIONES: ${o.id}`)
// Comentarios de los videos por línea: cada clave tiene que existir.
let lineSecs = 0
let commented = 0
let totalLines = 0
for (const o of openings) {
  const byName = lineComments[o.id] ?? {}
  for (const name of Object.keys(byName)) if (name !== '*' && !o.lines.some((l) => l.name === name)) { console.log(`COMENTARIO línea inexistente [${o.id}] ${name}`); bad++ }
  for (const l of o.lines) {
    totalLines++
    const c = byName[l.name]
    if (!c) continue
    commented++
    const labels = new Set(pm(l.moves).map((m, i) => moveLabel(i, m.san)))
    for (const k of Object.keys(c)) if (k !== 'intro' && k !== 'outro' && !labels.has(k)) { console.log(`COMENTARIO jugada inexistente [${o.id}] ${l.name}: ${k}`); bad++ }
  }
  for (const lesson of lineLessons(o)) {
    try { buildFrames(lesson); lineSecs += estimateSeconds(lesson) } catch (e) { console.log(`VIDEO LÍNEA ${lesson.id}: ${(e as Error).message}`); bad++ }
  }
}
console.log(`videos por línea: ${totalLines} (${commented} con explicaciones), ~${Math.round(lineSecs / 60)} min`)
console.log(`lecciones: ${1 + Object.values(lessonsByOpening).flat().length}, ~${Math.round(secs / 60)} min`)
process.exit(bad ? 1 : 0)
