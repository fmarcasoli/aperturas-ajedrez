import type { LineComments } from './index.ts'

export const evans: LineComments = {
  '*': {
    '4...Bxb4': 'Las negras aceptan el peón del gambito.',
    '5.c3': { say: 'Ataca el alfil y prepara d4: las blancas construyen el centro ganando tiempo.', arrows: 'c3b4 d2d4:b' },
    '5...Ba5': { say: 'La retirada más popular: el alfil vigila c3 y e1.', arrows: 'a5e1' },
    '5...Bc5': 'El alfil vuelve a su diagonal, apuntando a f2.',
    '5...Be7': 'Una retirada segura: el alfil protege al rey.',
    '6.d4': { say: 'El centro blanco avanza y el peón de e5 queda atacado.', arrows: 'd4e5' },
    '4...Bb6': 'Las negras rechazan el gambito y mantienen el alfil en la diagonal.',
  },

  'Aceptado: Defensa Lasker': {
    '6...d6': { say: 'La defensa Lasker: sostener e5 en lugar de comer más peones.', arrows: 'd6e5' },
    '7...Bb6': { say: 'El alfil presiona d4.', arrows: 'b6d4' },
    '8.dxe5': 'Las blancas abren la columna d.',
    '9.Qxd8+': 'Cambio de damas: se llega a un final.',
    '10.Nxe5': 'Las blancas recuperan el peón.',
    '10...Be6': { say: 'Las negras ofrecen cambiar el alfil de c4.', arrows: 'e6c4' },
    '14...f6': 'Las negras echan al caballo.',
    '15.Nxb6+': 'Las blancas se quedan sin la pareja de alfiles de las negras.',
    outro: 'Un final equilibrado: así las negras neutralizan el gambito devolviendo el peón.',
  },

  'Aceptado: Kasparov–Anand 1995': {
    '6...d6': { say: 'Las negras sostienen e5.', arrows: 'd6e5' },
    '7.Qb3': { say: 'La dama apunta a f7 junto con el alfil.', arrows: 'b3f7:r c4f7:r', marks: 'f7' },
    '7...Qd7': 'La dama defiende f7 desde d7.',
    '8.dxe5': 'Las blancas abren el centro.',
    '9...Na5': { say: 'El caballo ataca la dama y el alfil.', arrows: 'a5b3 a5c4' },
    '10...Nxc4': 'Las negras cambian el peligroso alfil de c4.',
    '13.exd6': 'Las blancas cambian para abrir la columna d.',
    '14.Rd1': { say: 'La torre ocupa la columna abierta.', arrows: 'd1d6' },
    outro: 'Así jugó Kasparov contra Anand en 1995, devolviendo el Evans a la élite.',
  },

  'Aceptado: 5...Be7': {
    '6...Na5': { say: 'El caballo ataca el alfil de c4.', arrows: 'a5c4' },
    '7.Nxe5': 'Las blancas recuperan el peón.',
    '7...Nxc4': 'Las negras se quedan con la pareja de alfiles.',
    '8...d5': { say: 'Golpe en el centro.', arrows: 'd5e4' },
    '10.Ne3': { say: 'El caballo ataca la dama.', arrows: 'e3d5' },
    '12.c4': 'Las blancas ganan espacio en el centro.',
    '15.d5': { say: 'Las blancas tienen más espacio.', arrows: 'd5d6' },
  },

  'Aceptado: 5...Bc5 Normal': {
    '6...exd4': 'Las negras comen otro peón.',
    '7.O-O': 'Las blancas enrocan y siguen sacrificando.',
    '7...d6': 'La Variante Normal: las negras se quedan con un peón de ventaja.',
    '8.cxd4': { say: 'Las blancas tienen un centro magnífico.', marks: 'd4 e4' },
    '9...Na5': { say: 'Ataca el alfil de c4.', arrows: 'a5c4' },
    '10.Bg5': { say: 'Clava y presiona.', arrows: 'g5d8' },
    '12.Qa4+': 'Jaque para recuperar la pieza.',
    '13.Qxc4': 'Las blancas recuperan el material.',
    '15.Nd5': { say: 'El caballo se instala en d5.', marks: 'd5' },
  },

  'Aceptado: 9.d5': {
    '7...d6': 'Las negras se quedan con un peón de ventaja.',
    '9.d5': { say: 'Las blancas ganan espacio y echan al caballo.', arrows: 'd5c6' },
    '10.Bb2': { say: 'El alfil apunta a g7 por la gran diagonal.', arrows: 'b2g7' },
    '12...Ng6': 'Los caballos negros defienden el rey.',
    '15.Nf4': { say: 'El caballo ataca g6 y apunta a e6.', arrows: 'f4e6' },
    '17.Ne6': { say: 'El caballo llega a e6, una casilla soñada.', marks: 'e6' },
  },

  'Aceptado: Defensa Comprometida': {
    '6...exd4': 'Las negras comen.',
    '7.O-O': 'Las blancas siguen entregando material.',
    '7...dxc3': 'La Defensa Comprometida: las negras se comen todo.',
    '8.Qb3': { say: 'La dama apunta a f7.', arrows: 'b3f7:r', marks: 'f7' },
    '8...Qf6': 'La dama defiende f7.',
    '9.e5': { say: 'Echa a la dama.', arrows: 'e5f6' },
    '10.Nxc3': 'Las blancas recuperan algo de material y desarrollan.',
    '11.Ba3': { say: 'El alfil controla la diagonal hasta f8.', arrows: 'a3f8' },
    outro: 'Las negras tienen peones de más, pero las blancas tienen una ventaja enorme de desarrollo.',
  },

  'Aceptado: 7...Nge7': {
    '6...exd4': 'Las negras comen.',
    '7.O-O': 'Las blancas enrocan.',
    '7...Nge7': { say: 'Prepara d5 para devolver material.', arrows: 'd7d5:b' },
    '8...d5': { say: 'Golpe en el centro.', arrows: 'd5c4' },
    '10.Ba3': { say: 'El alfil impide el enroque negro.', arrows: 'a3f8', marks: 'f8' },
    '11.Bb5': { say: 'El alfil clava el caballo de c6.', arrows: 'b5c6' },
    '12.Qa4': { say: 'Más presión sobre c6.', arrows: 'a4c6' },
  },

  'Aceptado: 7...Bb6': {
    '6...exd4': 'Las negras comen.',
    '7.O-O': 'Las blancas enrocan.',
    '7...Bb6': 'El alfil se pone a salvo.',
    '9.d5': { say: 'Espacio y ataque al caballo.', arrows: 'd5c6' },
    '10.Bb2': { say: 'El alfil apunta a g7.', arrows: 'b2g7' },
    '15.Nf4': { say: 'El caballo apunta a e6.', arrows: 'f4e6' },
    '17.Ne6': { say: 'Una casilla soñada para el caballo.', marks: 'e6' },
  },

  'Aceptado: 6.O-O': {
    '6.O-O': 'Las blancas enrocan antes de jugar d4.',
    '6...d6': { say: 'Las negras sostienen e5.', arrows: 'd6e5' },
    '9.Qxd8+': 'Cambio de damas.',
    '10.Nxe5': 'Las blancas recuperan el peón.',
    '13.Ndc4': { say: 'El caballo va por el alfil de b6.', arrows: 'c4b6' },
    '15.Nxb6': 'Las blancas cambian el alfil.',
  },

  'Aceptado: Stone-Ware 5...Bd6': {
    '5...Bd6': { say: 'La defensa Stone-Ware: el alfil defiende e5 directamente.', arrows: 'd6e5' },
    '6...Nf6': 'Las negras se desarrollan rápido.',
    '8...h6': 'Evita alfil g5.',
    '10...Bf8': 'El alfil se reubica para defender al rey.',
    '12...Na5': { say: 'Ataca la dama y el alfil.', arrows: 'a5b3 a5c4' },
    '15...exd4': 'Las negras abren el centro.',
  },

  'Aceptado: 6.O-O Nf6': {
    '6.O-O': 'Las blancas enrocan primero.',
    '6...Nf6': { say: 'Las negras atacan e4.', arrows: 'f6e4' },
    '8...Nxe4': 'Las negras comen en e4.',
    '9.Qd5': { say: 'La dama ataca el caballo y f7.', arrows: 'd5e4 d5f7' },
    '11.Ba3': { say: 'El alfil apunta a f8.', arrows: 'a3f8' },
    outro: 'Una línea muy aguda: las negras ganaron material, pero las blancas tienen un ataque peligroso.',
  },

  'Rehusado: 5.a4': {
    '5.a4': { say: 'Las blancas amenazan a5, encerrando al alfil.', arrows: 'a4a5' },
    '5...a6': { say: 'Le deja al alfil la casilla a7.', marks: 'a7' },
    '7.Nd5': { say: 'El caballo ataca el alfil y el caballo negros.', arrows: 'd5b6 d5f6' },
    '8...Nd4': 'El caballo salta al centro.',
    '10.d6': { say: 'Un peón muy molesto en el corazón de la posición negra.', arrows: 'd6c7' },
    '13.Qb3': { say: 'La dama apunta a f7.', arrows: 'b3f7' },
  },

  'Rehusado: 5.b5': {
    '5.b5': { say: 'Las blancas echan al caballo de c6.', arrows: 'b5c6' },
    '5...Na5': 'El caballo se va al borde.',
    '6.Nxe5': 'Las blancas aprovechan para comer en e5.',
    '6...Nh6': { say: 'Defiende f7 de otra manera.', arrows: 'h6f7' },
    '8.Bxh6': 'Las blancas eliminan al defensor de f7.',
    '10.Bxf7+': { say: 'Jaque y peón.', marks: 'f7' },
    '11...Qg5': { say: 'La dama ataca g2 y el alfil de e5.', arrows: 'g5g2 g5e5' },
  },

  'Rehusado: 5.a4 a5': {
    '5...a5': { say: 'Las negras frenan el avance de los peones.', arrows: 'a5b4' },
    '6.b5': { say: 'El peón echa al caballo.', arrows: 'b5c6' },
    '6...Nd4': 'El caballo salta al centro.',
    '9.d4': { say: 'Las blancas abren el centro.', arrows: 'd4e5' },
    '11.Bg5': { say: 'Clava el caballo de e7.', arrows: 'g5e7' },
    '15.Nd5': { say: 'El caballo ataca la dama.', arrows: 'd5e7' },
  },

  'Aceptado: 6...exd4 7.Qb3': {
    '6...exd4': 'Las negras comen.',
    '7.Qb3': { say: 'La dama apunta a f7 antes de recuperar el peón.', arrows: 'b3f7:r' },
    '7...Qe7': 'La dama defiende f7.',
    '9...Nxd4': 'Las negras simplifican con cambios.',
    '11.Nc3': 'Las blancas desarrollan con tiempo.',
    '12.Ba3': { say: 'El alfil presiona d6 y molesta al rey negro.', arrows: 'a3f8' },
  },

  'Aceptado: 7...d6 Clásica': {
    '6...exd4': 'Las negras comen.',
    '7.O-O': 'Las blancas enrocan.',
    '7...d6': 'La línea clásica: las negras se quedan con un peón de más.',
    '8.cxd4': { say: 'Las blancas tienen un gran centro.', marks: 'd4 e4' },
    '9...Na5': { say: 'Ataca el alfil.', arrows: 'a5c4' },
    '12.Qa4+': 'Jaque para recuperar la pieza.',
    '15.Nd5': { say: 'El caballo ocupa d5.', marks: 'd5' },
  },

  'Aceptado: 7.Qb3 Qd7 8.dxe5 dxe5': {
    '6...d6': { say: 'Las negras sostienen e5.', arrows: 'd6e5' },
    '7.Qb3': { say: 'Presión sobre f7.', arrows: 'b3f7:r' },
    '7...Qd7': 'La dama defiende f7.',
    '10.Rd1': { say: 'La torre ataca la dama.', arrows: 'd1d7' },
    '11.Ba3': { say: 'El alfil ataca la dama.', arrows: 'a3e7' },
    '12.Bd5': { say: 'El alfil presiona c6 y f7.', arrows: 'd5f7' },
    '14.Nc4': { say: 'El caballo va por el alfil de b6.', arrows: 'c4b6' },
  },

  'Aceptado: 6.O-O Nge7': {
    '6.O-O': 'Las blancas enrocan primero.',
    '6...Nge7': { say: 'Prepara d5.', arrows: 'd7d5:b' },
    '8...d5': { say: 'Golpe en el centro.', arrows: 'd5c4' },
    '10.Ba3': { say: 'El alfil impide el enroque corto.', arrows: 'a3f8' },
    '11...f6': 'Las negras protegen e5 y le hacen lugar al rey en f7.',
    '14...Kf7': 'El rey se acomoda en f7, a falta de enroque.',
  },

  'Aceptado: Comprometida 8...Qe7': {
    '6...exd4': 'Las negras comen.',
    '7...dxc3': 'Las negras se comen todo.',
    '8.Qb3': { say: 'La dama apunta a f7.', arrows: 'b3f7:r' },
    '8...Qe7': 'La dama defiende f7 desde e7.',
    '10.Nd5': { say: 'El caballo ataca la dama.', arrows: 'd5e7' },
    '13.Bb2': { say: 'El alfil ataca g7 por la gran diagonal.', arrows: 'b2g7' },
  },

  'Aceptado: 9.Nc3 Bg4 (celada en f7)': {
    '7...d6': 'Las negras se quedan con un peón de más.',
    '9...Bg4': { say: 'El alfil clava el caballo de f3.', arrows: 'g4d1' },
    '10.Qa4': { say: 'La dama sale de la clavada y ataca el alfil.', arrows: 'a4d7' },
    '11.Qb3': { say: 'La dama apunta a f7.', arrows: 'b3f7:r' },
    '11...Na5': { say: 'Ataca la dama.', arrows: 'a5b3' },
    '12.Bxf7+': { say: 'La celada: jaque en f7.', marks: 'f7' },
    '14.Ng5+': 'Jaque, y el rey negro queda expuesto.',
    '17.e5': { say: 'Las blancas abren líneas contra el rey.', arrows: 'e5d6' },
  },

  'Aceptado: 5...Be7 7.Be2': {
    '6...Na5': { say: 'Ataca el alfil.', arrows: 'a5c4' },
    '7.Be2': 'El alfil se retira en lugar de permitir el cambio.',
    '8.Qxd4': { say: 'La dama centralizada ataca g7.', arrows: 'd4g7' },
    '9.e5': { say: 'Echa al caballo de f6.', arrows: 'e5f6' },
    '10.Qh4': 'La dama se acerca al rey negro.',
    '15.Bh6': { say: 'El alfil molesta en el flanco de rey.', arrows: 'h6f8' },
  },

  'Aceptado: 5...Be7 10...Qa5': {
    '6...Na5': { say: 'Ataca el alfil.', arrows: 'a5c4' },
    '7.Nxe5': 'Las blancas recuperan el peón.',
    '8...d5': { say: 'Golpe central.', arrows: 'd5e4' },
    '10...Qa5': 'La dama se va a a5 en lugar de d8.',
    '13.Bd2': { say: 'El alfil ataca la dama.', arrows: 'd2a5' },
  },

  'Rehusado: 6.a5': {
    '5.a4': { say: 'Amenaza a5.', arrows: 'a4a5' },
    '6.a5': 'Las blancas fijan el flanco de dama.',
    '7.b5': { say: 'Ataca el caballo de c6.', arrows: 'b5c6' },
    '11.Bxc6': 'Las blancas dañan la estructura de peones negra.',
    '14.Bg5': { say: 'Clava el caballo de f6.', arrows: 'g5f6' },
    '16.g4': 'Las blancas rompen la clavada con los peones.',
  },

  'Rehusado: 5.O-O': {
    '5.O-O': 'Las blancas enrocan con calma.',
    '6.a4': { say: 'Espacio en el flanco de dama.', arrows: 'a4a5' },
    '9.Bg5': { say: 'Clava el caballo.', arrows: 'g5f6' },
    '10...g5': 'Las negras rompen la clavada con los peones.',
    '13.Nd5': { say: 'El caballo ocupa d5.', marks: 'd5' },
  },

  'Aceptado: 5...Ba5 6.d4 b5?': {
    '6...b5': 'Un intento de devolver el peón de forma dudosa.',
    '7.Bxb5': 'Las blancas comen.',
    '10...Bxd4': { say: 'El alfil ataca la torre de a1…', arrows: 'd4a1:r' },
    '11.Qxd4': '…pero la dama simplemente lo come: el alfil no estaba defendido.',
    outro: 'Lección: antes de atacar una pieza, revisá si tu propia pieza queda defendida.',
  },

  'Aceptado: 5...Bc5 6.d4 exd4 7.cxd4': {
    '6...exd4': 'Las negras comen.',
    '7.cxd4': { say: 'Las blancas recuperan de inmediato y arman un centro fuerte.', marks: 'd4 e4' },
    '7...Bb4+': { say: 'Jaque para molestar el centro.', arrows: 'b4e1:r' },
    '10.e5': { say: 'Echa al caballo.', arrows: 'e5f6' },
    '10...d5': { say: 'Contraataque al alfil.', arrows: 'd5c4' },
    '11...Ne4': { say: 'El caballo ocupa e4.', marks: 'e4' },
  },
}
