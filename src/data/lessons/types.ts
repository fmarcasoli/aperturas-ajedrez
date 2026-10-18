import type { Color } from '../openings.ts'

/**
 * Un paso de una lección narrada.
 * - play: jugadas SAN que se animan antes de hablar ("e4 e5 Nf3").
 * - undo: cuántas jugadas se deshacen antes de `play` (para mostrar alternativas).
 * - arrows: flechas "e2e4", con color opcional ":r" rojo (amenaza), ":b" azul (alternativa), ":y" amarillo.
 * - marks: casillas a resaltar "d4 e5".
 */
export interface Step {
  play?: string
  undo?: number
  say: string
  arrows?: string
  marks?: string
}

export interface Lesson {
  id: string
  title: string
  summary: string
  side: Color
  /** Jugadas que se ubican al instante al empezar (sin narrar). */
  start?: string
  steps: Step[]
}
