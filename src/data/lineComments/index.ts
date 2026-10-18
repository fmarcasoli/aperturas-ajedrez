/**
 * Explicaciones para los videos de cada línea.
 * Clave de la línea: su nombre. Dentro, claves por jugada ("7.Nc3", "8...Bxc3"),
 * más "intro" (reemplaza la nota de la línea) y "outro" (cierre del video).
 * La línea especial "*" tiene comentarios compartidos para jugadas tempranas comunes a todas las líneas.
 */
export type Comment = string | { say: string; arrows?: string; marks?: string }
export type LineComments = Record<string, Record<string, Comment>>

import { italiana } from './italiana.ts'
import { dosCaballos } from './dosCaballos.ts'
import { evans } from './evans.ts'
import { berlin } from './berlin.ts'
import { marshall } from './marshall.ts'

export const lineComments: Record<string, LineComments> = {
  italiana,
  'dos-caballos': dosCaballos,
  evans,
  berlin,
  marshall,
}
