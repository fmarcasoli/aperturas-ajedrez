import { dosCaballos, evans, intro, italiana } from './abiertas.ts'
import { berlin, cerrada, marshall, trampasRuy } from './ruy.ts'
import { gambitoDama, najdorf } from './cerradas.ts'
import type { Lesson } from './types.ts'

export type { Lesson, Step } from './types.ts'
export { intro }

/** Lecciones por apertura: la primera de cada lista es el video general. */
export const lessonsByOpening: Record<string, Lesson[]> = {
  italiana,
  'dos-caballos': dosCaballos,
  evans,
  berlin,
  marshall,
  cerrada,
  'trampas-ruy': trampasRuy,
  najdorf,
  'gambito-dama': gambitoDama,
}
