import type { LineComments } from './index.ts'

export const italiana: LineComments = {
  '*': {
    '3...Bc5': { say: 'El alfil sale a una diagonal activa, apuntando a f2, el punto débil de las blancas.', arrows: 'c5f2:r' },
    '3...Nd4': { say: 'Una jugada tramposa: deja el peón de e5 sin defensa a propósito.', marks: 'e5' },
    '3...Be7': 'Una jugada modesta: el alfil queda pasivo, pero protege al rey de cualquier ataque sobre f7.',
    '3...d6': 'Las negras sostienen e5 con el peón, pero el alfil de f8 queda encerrado.',
  },

  'Pianissimo: plan con a4 y b4': {
    '4.c3': { say: 'Prepara d4 y le da a la dama la casilla b3.', arrows: 'c3d4:b' },
    '5.d3': 'La forma tranquila de defender e4: las blancas no se apuran por abrir el centro.',
    '6...a6': { say: 'Le prepara la casilla a7 al alfil, para que no lo ataquen con ganancia de tiempo.', arrows: 'c5a7:b' },
    '7.a4': { say: 'Gana espacio en el flanco de dama y frena b5.', arrows: 'a4a5' },
    '9.h3': { say: 'Evita alfil g4 y caballo g4.', marks: 'g4' },
    '11.b4': { say: 'El plan de la élite: los peones avanzan en el flanco de dama para ganar espacio.', arrows: 'b4b5' },
    '12.Bxe6': 'Las blancas cambian el alfil de e6, que molestaba al de c4.',
    '13...d5': { say: 'Las negras rompen en el centro: ahora la tensión es máxima.', arrows: 'd5e4' },
    '16.exd5': 'Las blancas abren el juego para aprovechar su torre en d1.',
    '18.b5': { say: 'Los peones del flanco de dama siguen avanzando.', arrows: 'b5b6' },
    '20...Nf4': { say: 'El caballo salta a f4 atacando la dama: las negras ganan actividad en el flanco de rey.', arrows: 'f4e2' },
  },

  'Pianissimo: maniobra Nbd2-f1-g3': {
    '7.Bb3': 'El alfil se retira antes de que lo ataquen con d5 o b5.',
    '9...Ne7': { say: 'Las negras usan la misma maniobra que las blancas: el caballo va a g6.', arrows: 'e7g6' },
    '11.Nf1': { say: 'El caballo sigue su viaje hacia g3.', arrows: 'f1g3' },
    '13.d4': { say: 'Ahora sí, con todas las piezas listas, las blancas golpean en el centro.', arrows: 'd4e5' },
    '15.Bxe6': 'Se cambian los alfiles de casillas blancas.',
    '18.Nf5': { say: 'El caballo llega a f5, una casilla soñada cerca del rey negro.', arrows: 'f5h6 f5e7' },
    '19.dxe5': 'Las blancas abren la columna d para cambiar torres.',
  },

  'Pianissimo: enroque temprano': {
    '4.O-O': 'Las blancas enrocan primero y dejan c3 para más adelante.',
    '6.c3': 'Ahora sí, c3 para preparar d4.',
    '9...Ne7': { say: 'El caballo de c6 se reubica en g6, donde vigila f4 y h4.', arrows: 'e7g6' },
    '13.d4': { say: 'Llega el golpe central.', arrows: 'd4e5' },
    '14...exd4': 'Las negras cambian para abrir el juego y activar sus piezas.',
    '15...Ne5': { say: 'El caballo ocupa la casilla central que quedó libre.', marks: 'e5' },
    '19...Bb6': 'El alfil se reubica para presionar el caballo de d4.',
  },

  'Pianissimo: plan con d4 y Bf1': {
    '5...a6': 'Las negras guardan la casilla a7 para el alfil antes de enrocar.',
    '10.d4': { say: 'Las blancas toman el centro.', arrows: 'd4e5' },
    '12.Bf1': 'El alfil se retira a f1 para proteger el rey y liberar la torre.',
    '13.g3': { say: 'Prepara alfil g2, donde el alfil defiende al rey y presiona el centro.', arrows: 'f1g2' },
    '17...d5': { say: 'Las negras rompen en el centro aprovechando que todas sus piezas están desarrolladas.', arrows: 'd5e4' },
    '19...exd4': 'Las negras liberan su posición con cambios.',
  },

  'Pianissimo: ...d5 rápido': {
    '5...O-O': 'Las negras enrocan rápido, preparando el golpe central.',
    '6...d5': { say: 'La idea: si las blancas juegan lento, las negras toman la iniciativa en el centro.', arrows: 'd5e4' },
    '8...Bg4': { say: 'El alfil clava el caballo de f3 contra la dama.', arrows: 'g4d1:r' },
    '9...Nb6': 'El caballo se retira atacando el alfil de c4.',
    '10.Bb5': { say: 'El alfil presiona el caballo de c6, que defiende e5.', arrows: 'b5c6' },
    '14.Nxe5': 'Las blancas ganan un peón: el caballo de c6 defendía e5 y quedó cambiado.',
    '15...Bd6': { say: 'Las negras dan el peón a cambio de piezas activas apuntando al rey blanco.', arrows: 'd6h2:r' },
    '17...c6': { say: 'Echa al alfil antes de llevar la torre a e8: si no, alfil b5 clavaría la torre.', arrows: 'c6b5' },
  },

  'Pianissimo: ...a5 y Be6': {
    '7...a5': { say: 'Las negras frenan el avance b4 de las blancas.', arrows: 'a5b4' },
    '9...Be6': 'El alfil ofrece cambiarse por el de c4, que es el mejor alfil blanco.',
    '10.Bb5': 'Las blancas evitan el cambio y presionan el caballo de c6.',
    '12.d4': { say: 'Las blancas golpean en el centro.', arrows: 'd4e5' },
    '17...d5': { say: 'Las negras rompen en el centro con todas sus piezas listas.', arrows: 'd5e4' },
  },

  'Pianissimo: 5...h6': {
    '5...h6': { say: 'Una jugada útil: impide alfil g5 y caballo g5.', marks: 'g5' },
    '11...Be6': 'Las negras ofrecen cambiar el alfil de b3.',
    '13.Be3': { say: 'Las blancas ofrecen cambiar el alfil de a7, que presiona f2.', arrows: 'e3a7' },
    '15...d5': { say: 'Con el alfil malo cambiado, las negras rompen en el centro.', arrows: 'd5e4' },
    '19.Rxe8+': 'Se cambian torres en la columna e.',
  },

  'Pianissimo: 7.h3 y d4': {
    '7.h3': { say: 'Evita la clavada con alfil g4.', marks: 'g4' },
    '8.a4': 'Las blancas ganan espacio en el flanco de dama.',
    '10.d4': { say: 'El golpe en el centro.', arrows: 'd4e5' },
    '13.g3': { say: 'El alfil va a ir a g2, una casilla segura junto al rey.', arrows: 'f1g2' },
    '17...d5': { say: 'Las negras liberan su juego rompiendo en el centro.', arrows: 'd5e4' },
  },

  'Pianissimo: 6.b4': {
    '6.b4': { say: 'Las blancas ganan espacio de inmediato y empujan al alfil.', arrows: 'b4c5' },
    '7.a4': { say: 'Amenaza a5, encerrando al alfil de b6.', arrows: 'a4a5' },
    '7...a6': { say: 'Le deja al alfil la casilla a7.', marks: 'a7' },
    '9...Ne7': { say: 'El caballo va rumbo a g6.', arrows: 'e7g6' },
    '15...Bc7': 'El alfil se reubica para defender e5 y apuntar al flanco de rey.',
    '16.d4': { say: 'Las blancas finalmente golpean en el centro.', arrows: 'd4e5' },
  },

  'Pianissimo: 4.d3 y Nc3-a4': {
    '4.d3': 'Las blancas defienden e4 de inmediato, sin c3.',
    '5.Nc3': 'El caballo sale a c3, su casilla natural, ya que no se juega c3.',
    '6.Na4': { say: 'El caballo busca cambiarse por el alfil de c5, el mejor alfil negro.', arrows: 'a4c5' },
    '7.Nxb6': 'Las blancas consiguen la pareja de alfiles.',
    '7...axb6': { say: 'Las negras recapturan hacia el centro y abren la columna a para su torre.', arrows: 'a8a1' },
    '11.d4': { say: 'Ahora sí, con c3 preparado, el golpe central.', arrows: 'd4e5' },
    '15...d5': { say: 'Las negras contragolpean en el centro.', arrows: 'd5e4' },
    '18...Nxe3': 'Las negras cambian el alfil de e3 para quedarse con una buena posición.',
  },

  'Pianissimo: 4.d3 con a4': {
    '4.d3': 'Las blancas defienden e4 de inmediato.',
    '7.a4': { say: 'Espacio en el flanco de dama.', arrows: 'a4a5' },
    '12.Bxe6': 'Se cambian los alfiles de casillas blancas.',
    '13...d5': { say: 'Las negras ganan espacio en el centro.', arrows: 'd5e4' },
    '16.Be3': { say: 'Las blancas ofrecen cambiar el alfil de a7.', arrows: 'e3a7' },
    '19.d4': { say: 'Las blancas abren el centro.', arrows: 'd4e5' },
  },

  'Giuoco Piano: 7.Bd2 cambio de alfiles': {
    '5.d4': { say: 'La versión clásica: las blancas abren el centro de inmediato.', arrows: 'd4e5' },
    '6.cxd4': { say: 'Las blancas tienen el centro ideal, con peones en e4 y d4.', marks: 'e4 d4' },
    '6...Bb4+': { say: 'El alfil da jaque para molestar ese centro.', arrows: 'b4e1:r' },
    '7.Bd2': 'La respuesta tranquila: ofrecer cambiar alfiles.',
    '8...d5': { say: 'La jugada clave: las negras rompen el centro antes de que las blancas jueguen e5.', arrows: 'd5e4' },
    '9...Nxd5': { say: 'Las blancas quedan con un peón aislado en d4: debilidad a largo plazo, pero piezas activas.', marks: 'd4' },
    '10.Qb3': { say: 'Presiona el caballo de d5.', arrows: 'b3d5' },
    '10...Nce7': 'El otro caballo refuerza d5.',
    '15.Bxd5': 'Las blancas cambian el fuerte caballo de d5.',
    '16.Nc5': { say: 'El caballo salta a c5, una casilla fuerte delante del peón aislado.', marks: 'c5' },
    '19.Rxc8': 'Se cambian torres por la columna c: la posición queda equilibrada.',
  },

  'Giuoco Piano: ataque Møller': {
    '5.d4': { say: 'Las blancas abren el centro.', arrows: 'd4e5' },
    '6...Bb4+': { say: 'Jaque para molestar el centro.', arrows: 'b4e1:r' },
    '7.Nc3': 'El Ataque Møller: las blancas entregan el peón de e4 para atacar.',
    '7...Nxe4': 'Las negras aceptan el desafío.',
    '9.d5': { say: 'Las blancas no recuperan la pieza: avanzan d5, atacando el caballo y abriendo la columna e.', arrows: 'd5c6 f1e1:b' },
    '10.Re1': { say: 'La torre ataca al caballo de e4, que no puede escapar fácil.', arrows: 'e1e4' },
    '11.Rxe4': 'Las blancas recuperan la pieza.',
    '12.Bg5': 'Las blancas cambian el alfil defensor del rey negro.',
    '13...h6': { say: 'Las negras atacan el caballo de g5.', arrows: 'h6g5' },
    '14.Qe2': { say: 'La dama entra en la columna e, apuntando al rey negro.', arrows: 'e2e7' },
    '16.dxe6': 'El peón de e6 queda clavado en la posición negra como una espina.',
    '18.Rh3': { say: 'La torre se mete por la columna h.', arrows: 'h3h8' },
    '20.Qf3': 'Una posición de ataque: las blancas tienen compensación por el material.',
  },

  'Giuoco Piano: 6.e5': {
    '5.d4': { say: 'Las blancas abren el centro.', arrows: 'd4e5' },
    '6.e5': { say: 'En vez de recapturar, las blancas avanzan e5 y atacan el caballo.', arrows: 'e5f6' },
    '6...d5': { say: 'La mejor respuesta: contraataca el alfil de c4.', arrows: 'd5c4' },
    '7.Bb5': 'El alfil se va a b5 y clava el caballo de c6.',
    '7...Ne4': { say: 'El caballo se instala en e4, una casilla excelente.', marks: 'e4' },
    '11...f5': { say: 'Las negras refuerzan el caballo de e4.', arrows: 'f5e4' },
    '12.exf6': 'Las blancas comen al paso, abriendo la columna f.',
    '14...Bf5': { say: 'El alfil ataca la dama de c2.', arrows: 'f5c2' },
  },

  'Giuoco Piano: 4...Qe7': {
    '4...Qe7': { say: 'La dama defiende e5 de antemano, para mantener el peón en el centro.', arrows: 'e7e5' },
    '5.d4': { say: 'Las blancas atacan igual el centro.', arrows: 'd4e5' },
    '5...Bb6': 'El alfil se aparta del ataque y presiona d4.',
    '10.Na3': { say: 'El caballo va a c4 por a3, porque d2 no está disponible con comodidad.', arrows: 'a3c4' },
    '13.d5': { say: 'Las blancas cierran el centro y ganan espacio.', arrows: 'd5c6' },
    '13...Nb8': { say: 'El caballo se reubica por d7.', arrows: 'b8d7' },
    '15...Nc5': { say: 'El caballo llega a c5, una casilla fuerte.', marks: 'c5' },
  },

  'Giuoco Piano: 7.Bd2 Nxe4': {
    '5.d4': { say: 'Las blancas abren el centro.', arrows: 'd4e5' },
    '6...Bb4+': { say: 'Jaque para molestar el centro.', arrows: 'b4e1:r' },
    '7...Nxe4': 'En lugar de cambiar alfiles, las negras comen en e4.',
    '9.Bxf7+': { say: 'El sacrificio en f7: el rey negro queda expuesto.', marks: 'f7' },
    '10.Qb3+': { say: 'Jaque doble sobre el rey y presión sobre b4.', arrows: 'b3f7 b3b4' },
    '10...d5': 'Las negras tapan el jaque con el peón.',
    '11.Ne5+': { say: 'El caballo da jaque desde el centro. Las negras están bien si juegan rey e6 y luego c5, pero la posición es muy aguda.', arrows: 'e5f7' },
  },

  'Defensa Húngara': {
    '4.d4': { say: 'Las blancas aprovechan la pasividad negra para abrir el centro.', arrows: 'd4e5' },
    '5.Nxd4': { say: 'Las blancas tienen un caballo muy fuerte en el centro.', marks: 'd4' },
    '5...d6': 'Las negras se desarrollan con calma.',
    '8.h3': 'Evita alfil g4 y caballo g4.',
    '9...Bf8': 'El alfil se reubica para defender al rey y dejar libre la columna e.',
    '10.Bf4': { say: 'Las blancas presionan d6, el punto débil de las negras.', arrows: 'f4d6' },
    '10...Ne5': { say: 'El caballo salta a e5 atacando el alfil de c4.', arrows: 'e5c4' },
    '12...Ng6': { say: 'El caballo ataca el alfil de f4.', arrows: 'g6f4' },
    '16...Nc5': { say: 'Las negras completan su desarrollo. Las blancas tienen más espacio.', marks: 'c5' },
  },

  'Trampa de Blackburne-Shilling': {
    intro: 'Una trampa en la que caen muchísimos jugadores. Mirá bien cómo funciona, para no caer nunca.',
    '4.Nxe5': 'Comer el peón parece natural, pero es justamente el error.',
    '4...Qg5': { say: 'La dama ataca g2 y el caballo de e5 al mismo tiempo.', arrows: 'g5g2:r g5e5:r' },
    '5.Nxf7': { say: 'Las blancas atacan dama y torre, sin ver el peligro.', arrows: 'f7g5 f7h8' },
    '5...Qxg2': { say: 'La dama come g2 y ataca la torre de h1.', arrows: 'g2h1:r' },
    '6...Qxe4+': 'Jaque, y ahora llega el golpe final.',
    '7...Nf3#': { say: 'Mate. El caballo de d4 cierra la red. Lo correcto era caballo por d4 o enroque en la jugada cuatro.', marks: 'e1' },
    outro: 'Recordá: contra caballo d4 en la Italiana, cambiá el caballo con caballo por d4. No comas en e5.',
  },

  'Contra 3...Nd4: 4.Nxd4': {
    '4.Nxd4': 'La respuesta correcta: cambiar caballos.',
    '4...exd4': 'Las negras recapturan, pero su peón de d4 queda adelantado y débil.',
    '5.c3': { say: 'Las blancas atacan el peón de d4 de inmediato.', arrows: 'c3d4' },
    '6...d5': { say: 'Las negras contraatacan en el centro.', arrows: 'd5c4' },
    '10.cxd4': 'Las blancas recuperan el peón.',
    '13...Nxe3': 'Las negras se quedan con la pareja de alfiles.',
    '15.Qf3': 'Las blancas tienen un buen centro y desarrollo cómodo.',
  },

  'Pianissimo: 6.Bb3 y Nbd2': {
    '6.Bb3': 'El alfil se retira antes de que lo ataquen.',
    '7.Nbd2': { say: 'Las blancas posponen el enroque y empiezan la maniobra del caballo.', arrows: 'd2f1 f1g3' },
    '8...Be6': 'Las negras ofrecen cambiar el alfil de b3.',
    '10...Ne7': { say: 'El caballo va rumbo a g6.', arrows: 'e7g6' },
    '13.Bc2': 'El alfil evita el cambio y sigue apuntando al flanco de rey.',
    '14.d4': { say: 'El golpe central, con todas las piezas preparadas.', arrows: 'd4e5' },
  },

  'Giuoco Piano: 7.Nc3 d5': {
    '5.d4': { say: 'Las blancas abren el centro.', arrows: 'd4e5' },
    '6...Bb4+': { say: 'Jaque para molestar el centro.', arrows: 'b4e1:r' },
    '7.Nc3': 'Las blancas entregan el peón de e4, como en el Ataque Møller.',
    '7...d5': { say: 'La respuesta más segura: las negras devuelven el material rompiendo el centro.', arrows: 'd5e4' },
    '10.Bg5': { say: 'El alfil ataca la dama.', arrows: 'g5d8' },
    '11.Bxd5': 'Comienzan los cambios.',
    '13.Bxe7': 'Después de los cambios, el rey negro no puede enrocar, pero la posición es equilibrada.',
    '14...f6': 'Las negras protegen e5 y le hacen lugar al rey en f7.',
    '18.Nc5': { say: 'El caballo ocupa una buena casilla.', marks: 'c5' },
  },

  'Mate de Légal': {
    intro: 'Una de las trampas más antiguas y bonitas del ajedrez.',
    '3...d6': 'Las negras sostienen e5 con el peón.',
    '4...Bg4': { say: 'El alfil clava el caballo de f3 contra la dama.', arrows: 'g4d1:r' },
    '5.h3': 'Las blancas le preguntan al alfil.',
    '5...Bh5': 'Las negras mantienen la clavada. Este es el error que permite la trampa.',
    '6.Nxe5': { say: 'Las blancas entregan la dama a propósito.', arrows: 'h5d1:r' },
    '6...Bxd1': 'Las negras se comen la dama. Lo correcto era caballo por e5.',
    '7.Bxf7+': { say: 'Jaque con el alfil.', marks: 'f7' },
    '8.Nd5#': { say: 'Mate. Las tres piezas menores coordinan a la perfección.', marks: 'e7' },
    outro: 'La lección: antes de comer material, preguntate siempre qué amenaza el rival.',
  },
}
