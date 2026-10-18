import type { LineComments } from './index.ts'

const FINAL = {
  '4.O-O': 'Las blancas enrocan y dejan el peón de e4 en el aire.',
  '4...Nxe4': 'Las negras lo comen: es la Berlinesa principal.',
  '5.d4': { say: 'Abre el juego: e5 queda atacado y la columna e se abre.', arrows: 'd4e5' },
  '5...Nd6': { say: 'El caballo vuelve y ataca el alfil de b5.', arrows: 'd6b5' },
  '6.Bxc6': 'Las blancas cambian en c6.',
  '6...dxc6': 'Las negras recapturan con el peón d, abriendo líneas para sus alfiles.',
  '7.dxe5': 'Las blancas echan al caballo de d6.',
  '7...Nf5': 'El caballo se va a f5, una buena casilla.',
  '8.Qxd8+': 'Cambio de damas: el famoso Final de Berlín.',
  '8...Kxd8': { say: 'El rey negro ya no puede enrocar, pero sin damas no corre peligro.', marks: 'd8' },
}

export const berlin: LineComments = {
  '*': {
    ...FINAL,
    '4.d3': 'Las blancas evitan el final y defienden e4 con calma.',
    '4...Bc5': { say: 'El alfil sale activo, apuntando a f2.', arrows: 'c5f2' },
  },

  'Final de Berlín: 9.Nc3 Ke8 10.h3 h5': {
    '9.Nc3': 'Las blancas desarrollan el caballo.',
    '9...Ke8': 'El rey vuelve a e8, su casilla más segura.',
    '10.h3': { say: 'Evita caballo g4 o alfil g4.', marks: 'g4' },
    '10...h5': { say: 'La idea: torre h6 para activar la torre por la tercera fila.', arrows: 'h8h6' },
    '11.Bf4': 'El alfil defiende el peón de e5.',
    '13.Ng5': { say: 'El caballo ataca el alfil de e6.', arrows: 'g5e6' },
    '13...Rh6': { say: 'La torre activa, como estaba planeado.', marks: 'h6' },
    '14...Bb4': { say: 'El alfil clava el caballo de c3.', arrows: 'b4c3' },
    '15.g4': 'Las blancas echan al caballo de f5.',
    '18.Re4': { say: 'La torre ataca el caballo de h4.', arrows: 'e4h4' },
    '18...Bxc3': 'Las negras dañan la estructura blanca.',
    outro: 'En este final, las negras se defienden bien con piezas activas.',
  },

  'Final de Berlín: 9...Bd7': {
    '9.Nc3': 'Las blancas desarrollan el caballo.',
    '9...Bd7': 'El alfil se desarrolla y prepara llevar el rey a c8.',
    '11...Kc8': { say: 'El rey va al flanco de dama, donde queda seguro.', arrows: 'c8b7' },
    '12...b6': 'Las negras refuerzan su flanco de dama.',
    '13...c5': { say: 'Controla d4 e impide que el caballo blanco use esa casilla.', marks: 'd4' },
    '14.Nd5': { say: 'El caballo se instala en d5.', marks: 'd5' },
    '18.Nxe7': 'Se cambian caballos.',
  },

  'Final de Berlín: 9...h6 10.Rd1+': {
    '9.Nc3': 'Las blancas desarrollan.',
    '9...h6': { say: 'Evita caballo g5 y alfil g5.', marks: 'g5' },
    '10.Rd1+': 'La torre da jaque por la columna d.',
    '12.g4': 'Las blancas echan al caballo.',
    '12...Nh4': 'El caballo se va a h4.',
    '13.Nxh4': 'Cambio de caballos.',
    '15.Ne4': { say: 'El caballo se centraliza.', marks: 'e4' },
    '16.Rxd8+': 'Cambio de torres: el final queda equilibrado.',
  },

  'Final de Berlín: 9.Rd1+': {
    '9.Rd1+': 'Jaque inmediato por la columna d.',
    '9...Ke8': 'El rey vuelve a e8.',
    '11...Nh4': { say: 'Las negras buscan cambiar caballos.', arrows: 'h4f3' },
    '13...Bf5': { say: 'El alfil ataca c2.', arrows: 'f5c2' },
    '14.Rd2': 'La torre defiende c2 y la segunda fila.',
    '15...Rxd2': 'Cambio de torres.',
    '17.g4': 'Las blancas echan al alfil.',
    '19.Rxd8': 'Se cambian las últimas torres.',
    outro: 'Un final muy parejo: así de sólida es la Berlinesa.',
  },

  'Final de Berlín: 9.h3': {
    '9.h3': { say: 'Una jugada útil antes de sacar el caballo.', marks: 'g4' },
    '9...Ke8': 'El rey vuelve a e8.',
    '10...h5': { say: 'Prepara torre h6.', arrows: 'h8h6' },
    '13.Ng5': { say: 'Ataca el alfil de e6.', arrows: 'g5e6' },
    '13...Rh6': 'La torre se activa por la tercera fila.',
    '15.g4': 'Las blancas echan al caballo.',
    outro: 'Esta posición es la misma de otra variante, a la que se llega con otro orden de jugadas.',
  },

  'Variante Río de Janeiro: 5.Re1': {
    '5.Re1': { say: 'La torre ataca el caballo de e4.', arrows: 'e1e4' },
    '5...Nd6': { say: 'El caballo vuelve, atacando el alfil.', arrows: 'd6b5' },
    '6.Nxe5': 'Las blancas recuperan el peón.',
    '7.Rxe5+': 'Jaque con la torre.',
    '8.Bf1': 'El alfil se pone a salvo.',
    '9...Bf6': { say: 'El alfil ataca la torre.', arrows: 'f6e5' },
    '11...Rxe1': 'Cambio de torres.',
    '13...d5': 'Las negras ocupan el centro.',
    '15...Ng7': 'El caballo se reubica en el flanco de rey.',
    '18.Bxf5': 'Cambio de alfiles.',
    outro: 'Una posición simétrica: las negras igualaron con total comodidad.',
  },

  '5.Re1 Nd6 6.Nxe5 Be7': {
    '5.Re1': { say: 'La torre ataca el caballo.', arrows: 'e1e4' },
    '6.Nxe5': 'Las blancas recuperan el peón.',
    '6...Be7': 'Las negras desarrollan primero, en lugar de cambiar caballos.',
    '7.Bf1': 'El alfil se retira.',
    '9...Bf6': { say: 'Ataca la torre.', arrows: 'f6e5' },
    '11...Rxe1': 'Cambio de torres.',
    '13...d5': 'Las negras se instalan en el centro.',
    '16...Nc7': { say: 'El caballo va a e6.', arrows: 'c7e6' },
  },

  'Antigua línea de Río: 5...Be7': {
    '5.d4': { say: 'Abre el juego.', arrows: 'd4e5' },
    '5...Be7': 'Las negras se preparan para enrocar.',
    '6.Qe2': { say: 'La dama ataca el caballo en la columna e.', arrows: 'e2e4' },
    '6...Nd6': 'El caballo vuelve, atacando el alfil.',
    '8...Nb7': { say: 'El caballo va de b7 a c5 y e6.', arrows: 'b7c5 c5e6' },
    '11...Ne6': 'El caballo llega a e6, una casilla muy sólida.',
    '13...c5': 'Las negras ganan espacio en el flanco de dama.',
    '14...d5': 'Las negras liberan su juego.',
    '15.exd6': 'Las blancas comen al paso.',
  },

  'Anti-Berlín: 4.d3 Bc5 con c3': {
    '5.c3': { say: 'Prepara d4 y una retirada para el alfil.', arrows: 'c3d4' },
    '7.h3': { say: 'Evita alfil g4.', marks: 'g4' },
    '7...a6': 'Pregunta al alfil.',
    '8...Ba7': 'El alfil se guarda en a7.',
    '9...Ne7': { say: 'El caballo va hacia g6.', arrows: 'e7g6' },
    '11.Nf1': { say: 'La maniobra del caballo blanco hacia g3.', arrows: 'f1g3' },
    '11...c6': 'Prepara d5.',
    '14.d4': { say: 'Golpe central.', arrows: 'd4e5' },
    '17...d5': { say: 'Las negras rompen también.', arrows: 'd5e4' },
  },

  'Anti-Berlín: 5.Bxc6': {
    '5.Bxc6': 'Las blancas cambian en c6 para dañar la estructura negra.',
    '5...dxc6': 'Las negras recapturan hacia el centro y quedan con la pareja de alfiles.',
    '6...Be6': 'Desarrollo natural.',
    '7...Bd6': { say: 'El alfil defiende e5.', arrows: 'd6e5' },
    '9.Nc4': { say: 'El caballo ataca e5 y d6.', arrows: 'c4e5 c4d6' },
    '9...f6': 'Las negras refuerzan e5.',
    '11.f4': { say: 'Las blancas abren la columna f.', arrows: 'f4e5' },
    '13.Rxf4': 'La torre se activa.',
  },

  'Anti-Berlín: 4.d3 d6 con fianchetto': {
    '4...d6': 'Las negras sostienen e5.',
    '5...g6': { say: 'Fianchetto del alfil.', arrows: 'f8g7' },
    '8...Nd7': { say: 'El caballo va rumbo a c5.', arrows: 'd7c5' },
    '10.Bxc6': 'Las blancas cambian el alfil para dañar los peones negros.',
    '11.d4': { say: 'Golpe central.', arrows: 'd4e5' },
    '12...Ne6': { say: 'El caballo bloquea en e6.', marks: 'e6' },
    '14...c5': 'Las negras atacan el centro.',
    '16.Qxd8': 'Cambio de damas.',
  },

  'Anti-Berlín: 6...d5': {
    '5.c3': { say: 'Prepara d4.', arrows: 'c3d4' },
    '6...d5': { say: 'Las negras golpean en el centro de inmediato.', arrows: 'd5e4' },
    '7...dxe4': 'Las negras abren la columna d.',
    '8...Qe7': 'La dama se desarrolla.',
    '11.Nc4': { say: 'El caballo ataca e5.', arrows: 'c4e5' },
    '12...Bxe3': 'Cambio de piezas menores.',
    '13...Ng4': { say: 'El caballo ataca el alfil.', arrows: 'g4e3' },
  },

  'Anti-Berlín: 7.Nbd2 a6 8.Bxc6': {
    '5.c3': { say: 'Prepara d4.', arrows: 'c3d4' },
    '8.Bxc6': 'Las blancas cambian en c6.',
    '10...Bb6': 'El alfil se reubica.',
    '11.Nf1': { say: 'La maniobra del caballo hacia g3.', arrows: 'f1g3' },
    '13.Nh4': { say: 'El caballo va hacia f5.', arrows: 'h4f5' },
    '14.Nhf5': { say: 'El caballo llega a f5, una gran casilla.', marks: 'f5' },
    '15...d5': 'Las negras ganan espacio en el centro.',
  },

  'Berlín con 4...Bc5': {
    '4.O-O': 'Las blancas enrocan.',
    '4...Bc5': 'Las negras sacan el alfil en lugar de comer en e4.',
    '6.d4': { say: 'Las blancas atacan el alfil y el centro.', arrows: 'd4c5' },
    '7.Bg5': { say: 'El alfil clava el caballo.', arrows: 'g5d8' },
    '10...exd4': 'Las negras abren el centro.',
    '11...g5': 'Las negras rompen la clavada con los peones.',
    '12...Bg4': { say: 'El alfil clava el caballo de f3 y presiona d4.', arrows: 'g4d1' },
  },

  'Anti-Berlín: 4.d3 Bc5 5.O-O': {
    '5.O-O': 'Las blancas enrocan primero.',
    '6.c3': { say: 'Prepara d4.', arrows: 'c3d4' },
    '9.h3': { say: 'Evita alfil g4.', marks: 'g4' },
    '9...Ne7': { say: 'El caballo va a g6.', arrows: 'e7g6' },
    '11.Nf1': { say: 'El caballo blanco va a g3.', arrows: 'f1g3' },
    '14.d4': { say: 'Golpe central.', arrows: 'd4e5' },
    '17...d5': { say: 'Las negras rompen.', arrows: 'd5e4' },
  },

  'Final de Berlín: 9...Ke8 10.h3 Be7': {
    '9.Nc3': 'Las blancas desarrollan.',
    '9...Ke8': 'El rey vuelve a e8.',
    '10...Be7': 'Las negras desarrollan el alfil.',
    '11.b3': { say: 'Prepara alfil b2.', arrows: 'c1b2' },
    '12...Rd8': { say: 'La torre ocupa la columna d.', arrows: 'd8d1' },
    '13...h5': 'Las negras ganan espacio en el flanco de rey.',
    '15.c4': 'Las blancas ganan espacio.',
    '15...a4': 'Las negras atacan la estructura blanca del flanco de dama.',
  },

  'Berlín: 6.dxe5 Nxb5': {
    '6.dxe5': 'Las blancas dejan el alfil en el aire.',
    '6...Nxb5': 'Las negras comen el alfil.',
    '7.a4': { say: 'Ataca el caballo.', arrows: 'a4b5' },
    '9.Qxd4': 'La dama recupera la pieza.',
    '9...d5': 'Las negras liberan su alfil.',
    '10.exd6': 'Captura al paso.',
    '11.Qe4+': 'Las damas se dan jaques…',
    '14.Qxe6+': 'Finalmente, cambio de damas.',
    '16.Nb5': { say: 'El caballo va por el alfil de d6.', arrows: 'b5d6' },
  },

  'Anti-Berlín: 5.c3 O-O 6.Bg5': {
    '5.c3': { say: 'Prepara d4.', arrows: 'c3d4' },
    '6.Bg5': { say: 'Clava el caballo antes de enrocar.', arrows: 'g5d8' },
    '6...h6': 'Pregunta al alfil.',
    '8...a6': 'Pregunta al otro alfil.',
    '9...b5': { say: 'Gana espacio en el flanco de dama.', arrows: 'b5b4' },
    '12...Ba7': 'El alfil se guarda en a7.',
    '13...Qd7': 'La dama sale de la clavada.',
  },
}
