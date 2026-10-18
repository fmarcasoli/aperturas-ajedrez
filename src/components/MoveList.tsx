import type { ParsedMove } from '../lib/exercises.ts'

const FIG: Record<string, string> = { K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘' }

export const figurine = (san: string) => san.replace(/^[KQRBN]/, (p) => FIG[p]).replace(/=([QRBN])/, (_m, p) => `=${FIG[p]}`)

interface Props {
  moves: ParsedMove[]
  /** Índice de la jugada a resaltar (la última jugada hecha). */
  current?: number
  pending?: boolean
}

export function MoveList({ moves, current, pending }: Props) {
  const items = []
  for (let i = 0; i < moves.length; i++) {
    if (i % 2 === 0) items.push(<span key={`n${i}`} className="mv-num">{i / 2 + 1}.</span>)
    const m = moves[i]
    items.push(
      <span key={i} className={`mv${i === current ? ' mv-cur' : ''}${m.bad ? ' mv-bad' : ''}`}>
        {figurine(m.san)}
        {m.bad ? '?' : ''}
      </span>,
    )
  }
  if (pending) {
    if (moves.length % 2 === 0) items.push(<span key="pn" className="mv-num">{moves.length / 2 + 1}.</span>)
    items.push(<span key="p" className="mv mv-q">?</span>)
  }
  return <div className="movelist">{items}</div>
}
