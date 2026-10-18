import { useEffect, useMemo, useState } from 'react'
import { Chess, type Square } from 'chess.js'
import type { Color, Opening } from '../data/openings.ts'
import { getLines, type ParsedLine } from '../lib/exercises.ts'
import { Board, resolveMove, squaresOf } from './Board.tsx'
import { MoveList, figurine } from './MoveList.tsx'

interface Props {
  opening: Opening
  linesDone: Record<string, number>
  onComplete: (lineId: string) => void
}

export function LineMode({ opening, linesDone, onComplete }: Props) {
  const lines = useMemo(() => getLines(opening), [opening])
  const [side, setSide] = useState<Color>(opening.side)
  const [line, setLine] = useState<ParsedLine | null>(null)

  if (!line) {
    return (
      <div className="panel">
        <div className="filters">
          <div className="seg">
            {(['w', 'b'] as Color[]).map((c) => (
              <button key={c} className={side === c ? 'on' : ''} onClick={() => setSide(c)}>
                Juego con {c === 'w' ? 'Blancas' : 'Negras'}
              </button>
            ))}
          </div>
          <button className="btn primary" onClick={() => setLine(lines[Math.floor(Math.random() * lines.length)])}>
            🎲 Línea al azar
          </button>
        </div>
        <p className="small muted">Jugá la línea completa: la computadora mueve el otro bando y vos tenés que recordar cada jugada.</p>
        <ul className="line-list">
          {lines.map((l) => (
            <li key={l.id}>
              <button onClick={() => setLine(l)}>
                <span className="line-name">{l.name}</span>
                <span className="line-meta">
                  {Math.ceil(l.moves.length / 2)} jugadas
                  {linesDone[l.id] ? <span className="check"> ✓ {linesDone[l.id]}</span> : null}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <LineDrill
      key={`${line.id}-${side}`}
      line={line}
      side={side}
      onBack={() => setLine(null)}
      onNext={() => {
        const others = lines.filter((l) => l.id !== line.id)
        setLine(others[Math.floor(Math.random() * others.length)] ?? line)
      }}
      onComplete={() => onComplete(line.id)}
    />
  )
}

interface DrillProps {
  line: ParsedLine
  side: Color
  onBack: () => void
  onNext: () => void
  onComplete: () => void
}

function LineDrill({ line, side, onBack, onNext, onComplete }: DrillProps) {
  const [ply, setPly] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [wrong, setWrong] = useState<{ san: string; to: string } | null>(null)
  const [hint, setHint] = useState(false)
  const [restart, setRestart] = useState(0)

  const positions = useMemo(() => {
    const chess = new Chess()
    const fens = [chess.fen()]
    const squares: [string, string][] = []
    for (const m of line.moves) {
      const r = chess.move(m.san)
      fens.push(chess.fen())
      squares.push([r.from, r.to])
    }
    return { fens, squares }
  }, [line])

  const finished = ply >= line.moves.length
  const fen = positions.fens[ply]
  const turn: Color = ply % 2 === 0 ? 'w' : 'b'
  const nextMove = line.moves[ply]
  const autoPlay = !finished && (turn !== side || nextMove.bad)

  useEffect(() => {
    if (!autoPlay) return
    const t = setTimeout(() => setPly((p) => p + 1), ply === 0 ? 350 : 650)
    return () => clearTimeout(t)
  }, [autoPlay, ply, restart])

  useEffect(() => {
    if (finished) onComplete()
    // solo al terminar
  }, [finished])

  function handleMove(from: Square, to: Square) {
    if (autoPlay || finished) return false
    const san = resolveMove(fen, from, to, [nextMove.san])
    if (!san) return false
    if (san === nextMove.san) {
      setWrong(null)
      setHint(false)
      setPly((p) => p + 1)
      return true
    }
    setMistakes((m) => m + 1)
    setWrong({ san, to })
    return false
  }

  function reveal() {
    setMistakes((m) => m + 1)
    setWrong(null)
    setHint(false)
    setPly((p) => p + 1)
  }

  const lastBad = ply > 0 && line.moves[ply - 1].bad
  const userMoves = line.moves.filter((m, i) => (i % 2 === 0 ? 'w' : 'b') === side && !m.bad).length

  return (
    <div className="practice">
      <div className="board-col">
        <Board
          fen={fen}
          orientation={side}
          interactive={!autoPlay && !finished}
          onMove={handleMove}
          lastMove={ply > 0 ? positions.squares[ply - 1] : undefined}
          hintSquare={hint && !finished ? squaresOf(fen, nextMove.san)?.[0] : undefined}
          wrongSquare={wrong?.to}
        />
      </div>
      <div className="panel">
        <div className="line-head">
          <button className="btn ghost small-btn" onClick={onBack}>← Líneas</button>
          <div className="variant-name">{line.name}</div>
        </div>
        <div className="stats-row">
          <span>Jugada {Math.min(ply + 1, line.moves.length)} / {line.moves.length}</span>
          <span>Errores: <b>{mistakes}</b></span>
        </div>
        <div className="progress"><div style={{ width: `${(ply / line.moves.length) * 100}%` }} /></div>
        <MoveList moves={line.moves.slice(0, ply)} current={ply - 1} pending={!finished && !autoPlay} />

        {lastBad && !finished && (
          <div className="feedback info">
            {figurine(line.moves[ply - 1].san)}? es un error típico: ¡aprovechalo!
          </div>
        )}
        {wrong && (
          <div className="feedback bad">
            <b>{figurine(wrong.san)}</b> no es la jugada de esta línea. Probá de nuevo.
          </div>
        )}
        {finished && (
          <div className="feedback good">
            {mistakes === 0 ? '🏆 ¡Línea perfecta!' : `✓ Línea completada con ${mistakes} error${mistakes > 1 ? 'es' : ''}.`}
            <div className="small">Jugaste {userMoves} jugadas de memoria.</div>
          </div>
        )}
        {finished && line.note && <div className="variant small">{line.note}</div>}

        <div className="actions">
          {!finished ? (
            <>
              <button className="btn" onClick={() => setHint(true)} disabled={autoPlay || hint}>💡 Pista</button>
              <button className="btn" onClick={reveal} disabled={autoPlay}>Ver jugada</button>
            </>
          ) : (
            <>
              <button
                className="btn"
                onClick={() => {
                  setPly(0)
                  setMistakes(0)
                  setWrong(null)
                  setRestart((r) => r + 1)
                }}
              >
                ↺ Repetir
              </button>
              <button className="btn primary" onClick={onNext}>Otra línea →</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
