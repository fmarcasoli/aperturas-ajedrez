import { useMemo, useState } from 'react'
import { Chess, type Square } from 'chess.js'
import type { Color, Opening } from '../data/openings.ts'
import { buildExercises, type Exercise } from '../lib/exercises.ts'
import type { ExerciseStat } from '../lib/progress.ts'
import { Board, resolveMove, squaresOf } from './Board.tsx'
import { MoveList, figurine } from './MoveList.tsx'

type SideFilter = Color | 'all'
type Pool = 'all' | 'pending' | 'failed'

interface Props {
  opening: Opening
  stats: Record<string, ExerciseStat>
  onRecord: (id: string, firstTry: boolean) => void
}

type Status = 'solving' | 'wrong' | 'solved' | 'revealed'

function weight(s: ExerciseStat | undefined) {
  if (!s) return 4
  if (!s.last) return 6
  return 1
}

function pick(list: Exercise[], stats: Record<string, ExerciseStat>, avoid?: string): Exercise | undefined {
  const options = list.length > 1 ? list.filter((e) => e.id !== avoid) : list
  const total = options.reduce((acc, e) => acc + weight(stats[e.id]), 0)
  let r = Math.random() * total
  for (const e of options) {
    r -= weight(stats[e.id])
    if (r <= 0) return e
  }
  return options[0]
}

export function ExerciseMode({ opening, stats, onRecord }: Props) {
  const all = useMemo(() => buildExercises(opening), [opening])
  const [side, setSide] = useState<SideFilter>('all')
  const [pool, setPool] = useState<Pool>('all')

  const list = useMemo(
    () =>
      all.filter((e) => {
        if (side !== 'all' && e.turn !== side) return false
        const s = stats[e.id]
        if (pool === 'pending') return !s || !s.last
        if (pool === 'failed') return !!s && !s.last
        return true
      }),
    // stats queda fuera a propósito: el filtro se recalcula al cambiarlo, no en cada respuesta
    [all, side, pool],
  )

  const [current, setCurrent] = useState<Exercise | undefined>(() => pick(all, stats))
  const [status, setStatus] = useState<Status>('solving')
  const [attempts, setAttempts] = useState(0)
  const [hint, setHint] = useState(false)
  const [played, setPlayed] = useState<{ fen: string; san: string; from: string; to: string } | null>(null)
  const [wrong, setWrong] = useState<{ san: string; to: string } | null>(null)
  const [streak, setStreak] = useState(0)

  function next() {
    const remaining = pool === 'all' ? list : list.filter((e) => !stats[e.id]?.last)
    setCurrent(pick(remaining, stats, current?.id))
    setStatus('solving')
    setAttempts(0)
    setHint(false)
    setPlayed(null)
    setWrong(null)
  }

  function changeFilter(newSide: SideFilter, newPool: Pool) {
    setSide(newSide)
    setPool(newPool)
    const filtered = all.filter((e) => {
      if (newSide !== 'all' && e.turn !== newSide) return false
      const s = stats[e.id]
      if (newPool === 'pending') return !s || !s.last
      if (newPool === 'failed') return !!s && !s.last
      return true
    })
    setCurrent(pick(filtered, stats))
    setStatus('solving')
    setAttempts(0)
    setHint(false)
    setPlayed(null)
    setWrong(null)
  }

  if (!current) {
    return (
      <div className="panel empty">
        <Filters side={side} pool={pool} onChange={changeFilter} />
        <p>{pool === 'failed' ? '¡No tenés ejercicios fallados! 🎉' : '¡Completaste todos los ejercicios de este filtro! 🎉'}</p>
        <button className="btn primary" onClick={() => changeFilter(side, 'all')}>Practicar todos</button>
      </div>
    )
  }

  const ex = current
  const lastMove = lastMoveOf(ex)

  function handleMove(from: Square, to: Square): boolean {
    if (status === 'solved' || status === 'revealed') return false
    const san = resolveMove(ex.fen, from, to, ex.answers)
    if (!san) return false
    if (ex.answers.includes(san)) {
      const chess = new Chess(ex.fen)
      chess.move(san)
      const firstTry = attempts === 0 && !hint
      onRecord(ex.id, firstTry)
      setStreak((s) => (firstTry ? s + 1 : 0))
      setPlayed({ fen: chess.fen(), san, from, to })
      setStatus('solved')
      setWrong(null)
      return true
    }
    setAttempts((a) => a + 1)
    setWrong({ san, to })
    setStatus('wrong')
    return false
  }

  function reveal() {
    const sq = squaresOf(ex.fen, ex.answers[0])
    if (!sq) return
    onRecord(ex.id, false)
    setStreak(0)
    const chess = new Chess(ex.fen)
    chess.move(ex.answers[0])
    setPlayed({ fen: chess.fen(), san: ex.answers[0], from: sq[0], to: sq[1] })
    setStatus('revealed')
    setWrong(null)
  }

  const hintSquare = hint && status !== 'solved' && status !== 'revealed' ? squaresOf(ex.fen, ex.answers[0])?.[0] : undefined
  const done = status === 'solved' || status === 'revealed'
  const solvedCount = list.filter((e) => stats[e.id]?.last).length
  const others = played ? ex.answers.filter((a) => a !== played.san) : []

  return (
    <div className="practice">
      <div className="board-col">
        <Board
          fen={played?.fen ?? ex.fen}
          orientation={ex.turn}
          interactive={!done}
          onMove={handleMove}
          lastMove={played ? [played.from, played.to] : lastMove}
          hintSquare={hintSquare}
          wrongSquare={status === 'wrong' ? wrong?.to : undefined}
          arrows={status === 'revealed' && played ? [[played.from as Square, played.to as Square, 'rgba(0,140,255,.8)']] : []}
        />
      </div>
      <div className="panel">
        <Filters side={side} pool={pool} onChange={changeFilter} />
        <div className="stats-row">
          <span>Resueltos <b>{solvedCount}</b> / {list.length}</span>
          {streak > 1 && <span className="streak">🔥 {streak} seguidos</span>}
        </div>
        <div className={`prompt turn-${ex.turn}`}>
          <span className="dot" /> Juegan las {ex.turn === 'w' ? 'Blancas' : 'Negras'}: encontrá la jugada de la teoría
        </div>
        <MoveList moves={played ? [...ex.history, { san: played.san, bad: false }] : ex.history} current={played ? ex.history.length : ex.history.length - 1} pending={!played} />

        {status === 'wrong' && wrong && (
          <div className="feedback bad">
            <b>{figurine(wrong.san)}</b> no es la jugada de libro. Probá de nuevo.
          </div>
        )}
        {status === 'solved' && played && (
          <div className="feedback good">
            ✓ ¡Correcto! <b>{figurine(played.san)}</b>
            {others.length > 0 && <div className="small">También es teoría: {others.map(figurine).join(', ')}</div>}
          </div>
        )}
        {status === 'revealed' && played && (
          <div className="feedback info">
            La jugada era <b>{figurine(played.san)}</b>
            {others.length > 0 && <div className="small">También: {others.map(figurine).join(', ')}</div>}
          </div>
        )}
        {done && (
          <div className="variant">
            <div className="variant-name">{ex.lineName}</div>
            {ex.lineNote && <div className="small">{ex.lineNote}</div>}
          </div>
        )}

        <div className="actions">
          {!done ? (
            <>
              <button className="btn" onClick={() => setHint(true)} disabled={hint}>💡 Pista</button>
              <button className="btn" onClick={reveal}>Ver solución</button>
              <button className="btn ghost" onClick={() => next()}>Saltar</button>
            </>
          ) : (
            <button className="btn primary wide" onClick={() => next()}>Siguiente ejercicio →</button>
          )}
        </div>
        {hint && !done && <div className="small muted">La pieza a mover está marcada en azul. Variante: {ex.lineName}</div>}
      </div>
    </div>
  )
}

function lastMoveOf(ex: Exercise): [string, string] | undefined {
  if (!ex.history.length) return undefined
  const chess = new Chess()
  let last: [string, string] | undefined
  for (const m of ex.history) {
    const r = chess.move(m.san)
    last = [r.from, r.to]
  }
  return last
}

function Filters({ side, pool, onChange }: { side: SideFilter; pool: Pool; onChange: (s: SideFilter, p: Pool) => void }) {
  return (
    <div className="filters">
      <div className="seg">
        {(['all', 'w', 'b'] as SideFilter[]).map((s) => (
          <button key={s} className={side === s ? 'on' : ''} onClick={() => onChange(s, pool)}>
            {s === 'all' ? 'Ambos' : s === 'w' ? 'Blancas' : 'Negras'}
          </button>
        ))}
      </div>
      <div className="seg">
        {(['all', 'pending', 'failed'] as Pool[]).map((p) => (
          <button key={p} className={pool === p ? 'on' : ''} onClick={() => onChange(side, p)}>
            {p === 'all' ? 'Todos' : p === 'pending' ? 'Pendientes' : 'Fallados'}
          </button>
        ))}
      </div>
    </div>
  )
}
