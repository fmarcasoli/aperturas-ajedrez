import { useEffect, useMemo, useState } from 'react'
import { Chess, type Square } from 'chess.js'
import type { Color, Opening } from '../data/openings.ts'
import { buildTree, exerciseId, goodMoves, positionKey, type ParsedMove, type TreeMove } from '../lib/exercises.ts'
import { Board, resolveMove } from './Board.tsx'
import { MoveList, figurine } from './MoveList.tsx'

interface Props {
  opening: Opening
  onRecord: (id: string, firstTry: boolean) => void
  onVideo: (lineName: string) => void
}

const START_FEN = new Chess().fen()
const PLAYED_KEY = 'aperturas-ajedrez:partidas'

interface PlayedStore {
  /** Líneas ya jugadas en la ronda actual (para variar el rival). */
  recent: string[]
  games: number
  perfect: number
}

function loadPlayed(openingId: string): PlayedStore {
  try {
    const all = JSON.parse(localStorage.getItem(PLAYED_KEY) ?? '{}') as Record<string, PlayedStore>
    return all[openingId] ?? { recent: [], games: 0, perfect: 0 }
  } catch {
    return { recent: [], games: 0, perfect: 0 }
  }
}

function savePlayed(openingId: string, store: PlayedStore) {
  try {
    const all = JSON.parse(localStorage.getItem(PLAYED_KEY) ?? '{}') as Record<string, PlayedStore>
    localStorage.setItem(PLAYED_KEY, JSON.stringify({ ...all, [openingId]: store }))
  } catch {
    // ignorar
  }
}

/** El rival elige entre las jugadas de libro, prefiriendo variantes que todavía no jugaste. */
function chooseReply(moves: TreeMove[], recent: string[]): TreeMove {
  const weights = moves.map((m) => m.lines.filter((l) => !recent.includes(l)).length + 0.25)
  const total = weights.reduce((a, b) => a + b, 0)
  let r = Math.random() * total
  for (let i = 0; i < moves.length; i++) {
    r -= weights[i]
    if (r <= 0) return moves[i]
  }
  return moves[moves.length - 1]
}

type Phase = 'user' | 'rival' | 'done'

export function PlayMode({ opening, onRecord, onVideo }: Props) {
  const [side, setSide] = useState<Color>(opening.side)
  const [game, setGame] = useState(0)
  const [store, setStore] = useState(() => loadPlayed(opening.id))

  return (
    <Game
      key={`${side}-${game}`}
      opening={opening}
      side={side}
      store={store}
      onSide={setSide}
      onNewGame={() => setGame((g) => g + 1)}
      onFinish={(lines, perfect) => {
        const all = opening.lines.map((l) => l.name)
        let recent = [...new Set([...store.recent, ...lines])]
        if (all.every((l) => recent.includes(l))) recent = []
        const next = { recent, games: store.games + 1, perfect: store.perfect + (perfect ? 1 : 0) }
        savePlayed(opening.id, next)
        setStore(next)
      }}
      onRecord={onRecord}
      onVideo={onVideo}
    />
  )
}

interface GameProps {
  opening: Opening
  side: Color
  store: PlayedStore
  onSide: (c: Color) => void
  onNewGame: () => void
  onFinish: (lines: string[], perfect: boolean) => void
  onRecord: (id: string, firstTry: boolean) => void
  onVideo: (lineName: string) => void
}

function Game({ opening, side, store, onSide, onNewGame, onFinish, onRecord, onVideo }: GameProps) {
  const tree = useMemo(() => buildTree(opening), [opening])
  const [nodeKey, setNodeKey] = useState(() => positionKey(START_FEN))
  const [fen, setFen] = useState(START_FEN)
  const [moves, setMoves] = useState<ParsedMove[]>([])
  const [last, setLast] = useState<[string, string]>()
  const [phase, setPhase] = useState<Phase>(side === 'w' ? 'user' : 'rival')
  const [errors, setErrors] = useState(0)
  const [stepErrors, setStepErrors] = useState(0)
  const [hint, setHint] = useState(false)
  const [wrong, setWrong] = useState<string>()
  const [message, setMessage] = useState<{ kind: 'good' | 'bad' | 'info'; text: string }>()
  const [lastEdge, setLastEdge] = useState<TreeMove>()
  const [arrow, setArrow] = useState<[Square, Square]>()

  const node = tree.nodes.get(nodeKey)
  const accepted = goodMoves(node)
  const fullMoves = Math.ceil(moves.length / 2)

  function advance(move: TreeMove, extraErrors = 0) {
    setMoves((ms) => [...ms, { san: move.san, bad: move.bad }])
    setLast([move.from, move.to])
    setFen(move.nextFen)
    setNodeKey(move.next)
    setLastEdge(move)
    setStepErrors(0)
    setHint(false)
    setWrong(undefined)
    const nextNode = tree.nodes.get(move.next)
    if (!nextNode || !nextNode.moves.length) return finish(move, extraErrors)
    if (nextNode.turn === side) {
      if (!goodMoves(nextNode).length) return finish(move, extraErrors)
      setPhase('user')
    } else {
      setPhase('rival')
    }
  }

  function finish(move: TreeMove, extraErrors: number) {
    setPhase('done')
    onFinish(move.lines, errors + extraErrors === 0)
  }

  // Turno del rival: responde con una jugada de libro, distinta en cada partida.
  useEffect(() => {
    if (phase !== 'rival' || !node) return
    const t = setTimeout(() => {
      const reply = chooseReply(node.moves, store.recent)
      setArrow(undefined)
      setMessage(
        reply.bad
          ? { kind: 'info', text: `El rival jugó ${figurine(reply.san)}?, un error típico. ¿Cómo lo aprovechás?` }
          : undefined,
      )
      advance(reply)
    }, 750)
    return () => clearTimeout(t)
    // advance y node dependen de nodeKey, que ya está en las dependencias
  }, [phase, nodeKey])

  function handleMove(from: Square, to: Square): boolean {
    if (phase !== 'user' || !node) return false
    const san = resolveMove(fen, from, to, accepted.map((m) => m.san))
    if (!san) return false
    const move = accepted.find((m) => m.san === san)
    if (move) {
      onRecord(exerciseId(opening.id, node.key), stepErrors === 0 && !hint)
      setMessage(undefined)
      setArrow(undefined)
      advance(move)
      return true
    }
    const trap = node.moves.some((m) => m.bad && m.san === san)
    setErrors((n) => n + 1)
    setStepErrors((n) => n + 1)
    setWrong(to)
    setMessage({
      kind: 'bad',
      text: trap
        ? `${figurine(san)}? cae en una trampa conocida. Buscá otra jugada.`
        : `${figurine(san)} no es teoría en esta posición. Probá otra jugada.`,
    })
    return false
  }

  function reveal() {
    if (phase !== 'user' || !node || !accepted.length) return
    const move = accepted[Math.floor(Math.random() * accepted.length)]
    onRecord(exerciseId(opening.id, node.key), false)
    setErrors((n) => n + 1)
    setArrow([move.from as Square, move.to as Square])
    setMessage({ kind: 'info', text: `La jugada de teoría era ${figurine(move.san)}.` })
    advance(move, 1)
  }

  const done = phase === 'done'
  const lineName = lastEdge?.lines.length === 1 ? lastEdge.lines[0] : lastEdge?.lineName
  const options = accepted.length > 1 ? accepted.map((m) => figurine(m.san)).join(', ') : undefined

  return (
    <div className="practice">
      <div className="board-col">
        <Board
          fen={fen}
          orientation={side}
          interactive={phase === 'user'}
          onMove={handleMove}
          lastMove={last}
          hintSquare={hint && phase === 'user' ? accepted[0]?.from : undefined}
          wrongSquare={wrong}
          arrows={arrow ? [[arrow[0], arrow[1], 'rgba(0,140,255,.8)']] : []}
        />
      </div>
      <div className="panel">
        <div className="filters">
          <div className="seg">
            {(['w', 'b'] as Color[]).map((c) => (
              <button key={c} className={side === c ? 'on' : ''} onClick={() => onSide(c)}>
                Juego con {c === 'w' ? 'Blancas' : 'Negras'}
              </button>
            ))}
          </div>
          <button className="btn small-btn" onClick={onNewGame}>↺ Nueva partida</button>
        </div>
        <div className="stats-row">
          <span>Partidas: <b>{store.games}</b> · perfectas: <b>{store.perfect}</b></span>
          <span>Errores: <b>{errors}</b></span>
        </div>
        <div className={`prompt turn-${side}`}>
          <span className="dot" />
          {done
            ? 'Terminó la apertura: empieza el medio juego'
            : phase === 'user'
              ? `Te toca: jugá como lo haría alguien que sabe la ${opening.name}`
              : 'El rival está pensando…'}
        </div>
        <MoveList moves={moves} current={moves.length - 1} pending={phase === 'user'} />

        {message && !done && <div className={`feedback ${message.kind}`}>{message.text}</div>}

        {done && (
          <div className={`feedback ${errors === 0 ? 'good' : 'info'}`}>
            {errors === 0
              ? `🏆 ¡Partida perfecta! Jugaste ${fullMoves} jugadas de teoría sin errores.`
              : `✓ Apertura completada en ${fullMoves} jugadas, con ${errors} error${errors === 1 ? '' : 'es'}.`}
          </div>
        )}
        {done && lineName && (
          <div className="variant">
            <div className="small muted">Variante que se jugó</div>
            <div className="variant-name">{lineName}</div>
            {lastEdge?.lineNote && lastEdge.lines.length === 1 && <div className="small">{lastEdge.lineNote}</div>}
          </div>
        )}

        <div className="actions">
          {!done ? (
            <>
              <button className="btn" onClick={() => setHint(true)} disabled={phase !== 'user' || hint}>💡 Pista</button>
              <button className="btn" onClick={reveal} disabled={phase !== 'user'}>Ver jugada</button>
            </>
          ) : (
            <>
              {lineName && <button className="btn" onClick={() => onVideo(lineName)}>🎬 Ver el video</button>}
              <button className="btn primary" onClick={onNewGame}>Nueva partida →</button>
            </>
          )}
        </div>
        {hint && phase === 'user' && (
          <div className="small muted">
            La pieza a mover está marcada en azul.{options ? ` Hay varias jugadas de teoría: ${options}.` : ''}
          </div>
        )}
        {!done && moves.length === 0 && phase === 'user' && (
          <p className="small muted">
            El rival va a elegir una variante distinta en cada partida. La partida termina cuando se acaba la teoría y empieza el medio juego.
          </p>
        )}
      </div>
    </div>
  )
}
