import { useEffect, useMemo, useState } from 'react'
import { Chess, type Square } from 'chess.js'
import type { Color, Opening } from '../data/openings.ts'
import { buildTree, exerciseId, goodMoves, type Exercise, type ParsedMove, type TreeMove } from '../lib/exercises.ts'
import type { ExerciseStat } from '../lib/progress.ts'
import { Board, resolveMove } from './Board.tsx'
import { MoveList, figurine } from './MoveList.tsx'

type SideFilter = Color | 'all'
type Pool = 'all' | 'pending' | 'failed'

interface Props {
  opening: Opening
  stats: Record<string, ExerciseStat>
  onRecord: (id: string, firstTry: boolean) => void
}

/** user: te toca mover · auto: responde el rival · done: terminó la línea */
type Phase = 'user' | 'auto' | 'done'

interface Message {
  kind: 'good' | 'bad' | 'info'
  text: string
  extra?: string
}

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

function filterList(all: Exercise[], stats: Record<string, ExerciseStat>, side: SideFilter, pool: Pool) {
  return all.filter((e) => {
    if (side !== 'all' && e.turn !== side) return false
    const s = stats[e.id]
    if (pool === 'pending') return !s || !s.last
    if (pool === 'failed') return !!s && !s.last
    return true
  })
}

function lastMoveOf(history: ParsedMove[]): [string, string] | undefined {
  if (!history.length) return undefined
  const chess = new Chess()
  let last: [string, string] | undefined
  for (const m of history) {
    const r = chess.move(m.san)
    last = [r.from, r.to]
  }
  return last
}

export function ExerciseMode({ opening, stats, onRecord }: Props) {
  const tree = useMemo(() => buildTree(opening), [opening])
  const all = tree.exercises
  const [side, setSide] = useState<SideFilter>('all')
  const [pool, setPool] = useState<Pool>('all')
  const [current, setCurrent] = useState<Exercise | undefined>(() => pick(all, stats))
  const [streak, setStreak] = useState(0)
  const [round, setRound] = useState(0)

  const list = filterList(all, stats, side, pool)
  const solvedCount = list.filter((e) => stats[e.id]?.last).length

  function changeFilter(newSide: SideFilter, newPool: Pool) {
    setSide(newSide)
    setPool(newPool)
    setCurrent(pick(filterList(all, stats, newSide, newPool), stats))
    setRound((r) => r + 1)
  }

  function next() {
    setCurrent(pick(list, stats, current?.id))
    setRound((r) => r + 1)
  }

  const header = (
    <>
      <Filters side={side} pool={pool} onChange={changeFilter} />
      <div className="stats-row">
        <span>Posiciones dominadas <b>{solvedCount}</b> / {list.length}</span>
        {streak > 1 && <span className="streak">🔥 {streak} seguidas</span>}
      </div>
    </>
  )

  if (!current) {
    return (
      <div className="panel empty">
        {header}
        <p>{pool === 'failed' ? '¡No tenés ejercicios fallados! 🎉' : '¡Completaste todos los ejercicios de este filtro! 🎉'}</p>
        <button className="btn primary" onClick={() => changeFilter(side, 'all')}>Practicar todos</button>
      </div>
    )
  }

  return (
    <Sequence
      key={round}
      exercise={current}
      tree={tree}
      openingId={opening.id}
      header={header}
      onRecord={onRecord}
      onFinish={(perfect) => setStreak((s) => (perfect ? s + 1 : 0))}
      onNext={next}
    />
  )
}

interface SequenceProps {
  exercise: Exercise
  tree: ReturnType<typeof buildTree>
  openingId: string
  header: React.ReactNode
  onRecord: (id: string, firstTry: boolean) => void
  onFinish: (perfect: boolean) => void
  onNext: () => void
}

/** Un ejercicio: desde la posición inicial se juega la línea hasta el final, alternando con el rival. */
function Sequence({ exercise, tree, openingId, header, onRecord, onFinish, onNext }: SequenceProps) {
  const userSide = exercise.turn
  const [nodeKey, setNodeKey] = useState(exercise.key)
  const [fen, setFen] = useState(exercise.fen)
  const [moves, setMoves] = useState<ParsedMove[]>([])
  const [lastSquares, setLastSquares] = useState<[string, string] | undefined>(() => lastMoveOf(exercise.history))
  const [phase, setPhase] = useState<Phase>('user')
  const [stepErrors, setStepErrors] = useState(0)
  const [hint, setHint] = useState(false)
  const [errors, setErrors] = useState(0)
  const [userMoves, setUserMoves] = useState(0)
  const [wrongSquare, setWrongSquare] = useState<string>()
  const [message, setMessage] = useState<Message>()
  const [line, setLine] = useState<{ name: string; note?: string }>({ name: exercise.lineName })
  const [arrow, setArrow] = useState<[Square, Square]>()
  const [finishedCalled, setFinishedCalled] = useState(false)

  const node = tree.nodes.get(nodeKey)
  const accepted = goodMoves(node)

  // Avanza a la posición siguiente y decide de quién es el turno.
  function advance(move: TreeMove) {
    setMoves((ms) => [...ms, { san: move.san, bad: move.bad }])
    setLastSquares([move.from, move.to])
    setLine({ name: move.lineName, note: move.lineNote })
    setNodeKey(move.next)
    setFen(move.nextFen)
    setStepErrors(0)
    setHint(false)
    setWrongSquare(undefined)
    const nextNode = tree.nodes.get(move.next)
    if (!nextNode || !nextNode.moves.length) return setPhase('done')
    if (nextNode.turn === userSide) return setPhase(goodMoves(nextNode).length ? 'user' : 'done')
    setPhase('auto')
  }

  // El rival responde con alguna jugada de la teoría (a veces, el error típico de la trampa).
  useEffect(() => {
    if (phase !== 'auto' || !node) return
    const t = setTimeout(() => {
      const reply = node.moves[Math.floor(Math.random() * node.moves.length)]
      setArrow(undefined)
      if (reply.bad) {
        setMessage({ kind: 'info', text: `El rival juega ${figurine(reply.san)}?, un error típico: ¡aprovechalo!` })
      }
      advance(reply)
    }, 700)
    return () => clearTimeout(t)
    // advance y node dependen solo de nodeKey, que ya está en las dependencias
  }, [phase, nodeKey])

  useEffect(() => {
    if (phase === 'done' && !finishedCalled) {
      setFinishedCalled(true)
      onFinish(errors === 0)
    }
  }, [phase, finishedCalled, errors, onFinish])

  function handleMove(from: Square, to: Square): boolean {
    if (phase !== 'user' || !node) return false
    const san = resolveMove(fen, from, to, accepted.map((m) => m.san))
    if (!san) return false
    const move = accepted.find((m) => m.san === san)
    if (move) {
      onRecord(exerciseId(openingId, node.key), stepErrors === 0 && !hint)
      setUserMoves((n) => n + 1)
      const others = accepted.filter((m) => m.san !== san).map((m) => figurine(m.san))
      setMessage({
        kind: 'good',
        text: `✓ ${figurine(san)} es correcto`,
        extra: others.length ? `También es teoría: ${others.join(', ')}` : undefined,
      })
      setArrow(undefined)
      advance(move)
      return true
    }
    const isTrap = node.moves.some((m) => m.bad && m.san === san)
    setStepErrors((n) => n + 1)
    setErrors((n) => n + 1)
    setWrongSquare(to)
    setMessage({
      kind: 'bad',
      text: isTrap
        ? `${figurine(san)}? es justamente el error que cae en la trampa. Buscá otra.`
        : `${figurine(san)} no es la jugada de la teoría. Probá de nuevo.`,
    })
    return false
  }

  function reveal() {
    if (phase !== 'user' || !node || !accepted.length) return
    const move = accepted[0]
    onRecord(exerciseId(openingId, node.key), false)
    setErrors((n) => n + 1)
    setUserMoves((n) => n + 1)
    setMessage({ kind: 'info', text: `La jugada era ${figurine(move.san)}` })
    setArrow([move.from as Square, move.to as Square])
    advance(move)
  }

  const history = [...exercise.history, ...moves]
  const total = exercise.history.length
  const done = phase === 'done'

  return (
    <div className="practice">
      <div className="board-col">
        <Board
          fen={fen}
          orientation={userSide}
          interactive={phase === 'user'}
          onMove={handleMove}
          lastMove={lastSquares}
          hintSquare={hint && phase === 'user' ? accepted[0]?.from : undefined}
          wrongSquare={wrongSquare}
          arrows={arrow ? [[arrow[0], arrow[1], 'rgba(0,140,255,.8)']] : []}
        />
      </div>
      <div className="panel">
        {header}
        <div className={`prompt turn-${userSide}`}>
          <span className="dot" />
          {done
            ? 'Fin de la línea teórica'
            : phase === 'user'
              ? `Juegan las ${userSide === 'w' ? 'Blancas' : 'Negras'}: encontrá la jugada de la teoría`
              : 'El rival está pensando…'}
        </div>
        <div className="stats-row">
          <span>Tus jugadas: <b>{userMoves}</b></span>
          <span>Errores: <b>{errors}</b></span>
        </div>
        <MoveList moves={history} current={history.length - 1} pending={phase === 'user'} highlightFrom={total} />

        {message && !done && (
          <div className={`feedback ${message.kind}`}>
            {message.text}
            {message.extra && <div className="small">{message.extra}</div>}
          </div>
        )}
        {done && (
          <div className={`feedback ${errors === 0 ? 'good' : 'info'}`}>
            {errors === 0
              ? `🏆 ¡Perfecto! Jugaste ${userMoves} jugada${userMoves === 1 ? '' : 's'} de teoría sin errores.`
              : `✓ Línea terminada: ${userMoves} jugada${userMoves === 1 ? '' : 's'}, ${errors} error${errors === 1 ? '' : 'es'}.`}
          </div>
        )}
        {done && (
          <div className="variant">
            <div className="variant-name">{line.name}</div>
            {line.note && <div className="small">{line.note}</div>}
          </div>
        )}

        <div className="actions">
          {!done ? (
            <>
              <button className="btn" onClick={() => setHint(true)} disabled={phase !== 'user' || hint}>💡 Pista</button>
              <button className="btn" onClick={reveal} disabled={phase !== 'user'}>Ver jugada</button>
              <button className="btn ghost" onClick={onNext}>Saltar</button>
            </>
          ) : (
            <button className="btn primary wide" onClick={onNext}>Siguiente ejercicio →</button>
          )}
        </div>
        {hint && phase === 'user' && <div className="small muted">La pieza a mover está marcada en azul. Variante: {line.name}</div>}
      </div>
    </div>
  )
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
