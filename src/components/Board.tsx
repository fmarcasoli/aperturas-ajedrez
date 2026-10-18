import { useEffect, useState } from 'react'
import { Chess, type Square } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import type { Color } from '../data/openings.ts'

export type Arrow = [Square, Square, string?]

interface Props {
  fen: string
  orientation: Color
  interactive: boolean
  /** Devuelve true si la jugada se acepta (la pieza queda donde se soltó). */
  onMove: (from: Square, to: Square) => boolean
  lastMove?: [string, string]
  hintSquare?: string
  wrongSquare?: string
  arrows?: Arrow[]
  /** Casillas resaltadas (lecciones). */
  marks?: string[]
}

const LAST = 'rgba(255, 214, 0, 0.38)'

export function Board({ fen, orientation, interactive, onMove, lastMove, hintSquare, wrongSquare, arrows, marks }: Props) {
  const [selected, setSelected] = useState<Square | null>(null)

  useEffect(() => {
    setSelected(null)
  }, [fen])

  const chess = new Chess(fen)
  const targets = selected ? chess.moves({ square: selected, verbose: true }).map((m) => m.to) : []

  const styles: Record<string, Record<string, string>> = {}
  if (lastMove) for (const sq of lastMove) styles[sq] = { background: LAST }
  if (marks) for (const sq of marks) styles[sq] = { boxShadow: 'inset 0 0 0 4px rgba(234, 179, 8, 0.95)', background: 'rgba(234, 179, 8, 0.28)' }
  if (hintSquare) styles[hintSquare] = { boxShadow: 'inset 0 0 0 4px var(--hint)', background: 'rgba(80,160,255,.35)' }
  if (selected) styles[selected] = { background: 'rgba(20, 85, 30, 0.5)' }
  for (const t of targets) {
    const occupied = chess.get(t as Square)
    styles[t] = occupied
      ? { background: 'radial-gradient(transparent 0%, transparent 79%, rgba(20,85,0,.35) 80%)' }
      : { background: 'radial-gradient(rgba(20,85,30,.4) 22%, transparent 24%)' }
  }
  if (wrongSquare) styles[wrongSquare] = { background: 'rgba(220, 40, 40, 0.55)' }

  function handleSquareClick(square: Square) {
    if (!interactive) return
    const piece = chess.get(square)
    if (selected) {
      if (targets.includes(square)) {
        setSelected(null)
        onMove(selected, square)
        return
      }
      if (piece && piece.color === chess.turn()) {
        setSelected(square === selected ? null : square)
        return
      }
      setSelected(null)
      return
    }
    if (piece && piece.color === chess.turn()) setSelected(square)
  }

  return (
    <div className="board">
      <Chessboard
        id="board"
        position={fen}
        boardOrientation={orientation === 'w' ? 'white' : 'black'}
        arePiecesDraggable={interactive}
        isDraggablePiece={({ piece }) => interactive && piece[0] === chess.turn()}
        onPieceDrop={(from, to) => {
          setSelected(null)
          return onMove(from as Square, to as Square)
        }}
        onPieceDragBegin={(_p, sq) => setSelected(sq as Square)}
        onSquareClick={(sq) => handleSquareClick(sq as Square)}
        autoPromoteToQueen
        customSquareStyles={styles}
        customArrows={arrows as never}
        animationDuration={220}
        customDarkSquareStyle={{ backgroundColor: 'var(--sq-dark)' }}
        customLightSquareStyle={{ backgroundColor: 'var(--sq-light)' }}
        customBoardStyle={{ borderRadius: '6px', boxShadow: '0 6px 24px rgba(0,0,0,.35)' }}
      />
    </div>
  )
}

/** Encuentra la jugada SAN que corresponde a mover de `from` a `to`, prefiriendo las de libro (útil en promociones). */
export function resolveMove(fen: string, from: string, to: string, preferred: string[]): string | null {
  const chess = new Chess(fen)
  const candidates = chess.moves({ square: from as Square, verbose: true }).filter((m) => m.to === to)
  if (!candidates.length) return null
  const book = candidates.find((m) => preferred.includes(m.san))
  return (book ?? candidates.find((m) => !m.promotion || m.promotion === 'q') ?? candidates[0]).san
}

/** Casillas origen/destino de una jugada SAN en una posición. */
export function squaresOf(fen: string, san: string): [Square, Square] | null {
  try {
    const m = new Chess(fen).move(san)
    return [m.from, m.to]
  } catch {
    return null
  }
}
