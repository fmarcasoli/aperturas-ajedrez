import { useEffect, useRef } from 'react'
import type { ParsedMove } from '../lib/exercises.ts'

const FIG: Record<string, string> = { K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘' }

export const figurine = (san: string) => san.replace(/^[KQRBN]/, (p) => FIG[p]).replace(/=([QRBN])/, (_m, p) => `=${FIG[p]}`)

interface Props {
  moves: ParsedMove[]
  /** Índice de la jugada a resaltar (la última jugada hecha). */
  current?: number
  pending?: boolean
  /** Las jugadas desde este índice se muestran como parte del ejercicio. */
  highlightFrom?: number
}

export function MoveList({ moves, current, pending, highlightFrom }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [moves.length])
  const items = []
  for (let i = 0; i < moves.length; i++) {
    if (i % 2 === 0) items.push(<span key={`n${i}`} className="mv-num">{i / 2 + 1}.</span>)
    const m = moves[i]
    items.push(
      <span
        key={i}
        className={`mv${i === current ? ' mv-cur' : ''}${m.bad ? ' mv-bad' : ''}${highlightFrom !== undefined && i < highlightFrom ? ' mv-old' : ''}`}
      >
        {figurine(m.san)}
        {m.bad ? '?' : ''}
      </span>,
    )
  }
  if (pending) {
    if (moves.length % 2 === 0) items.push(<span key="pn" className="mv-num">{moves.length / 2 + 1}.</span>)
    items.push(<span key="p" className="mv mv-q">?</span>)
  }
  return (
    <div className="movelist" ref={ref}>
      {items}
    </div>
  )
}
