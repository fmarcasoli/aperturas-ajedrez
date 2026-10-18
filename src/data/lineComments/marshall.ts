import type { LineComments } from './index.ts'

export const marshall: LineComments = {
  '*': {
    '8.c3': { say: 'Las blancas preparan d4. Ahora llega el golpe.', arrows: 'c3d4' },
    '8...d5': { say: '¡El Ataque Marshall! Las negras entregan un peón para abrir líneas contra el rey blanco.', arrows: 'd5e4' },
    '9.exd5': 'Las blancas aceptan.',
    '9...Nxd5': 'El caballo recaptura y queda en el centro.',
    '10.Nxe5': 'Las blancas se comen otro peón.',
    '10...Nxe5': 'Cambio de caballos.',
    '11.Rxe5': 'Las blancas tienen un peón de ventaja, pero las piezas negras están listas para atacar.',
    '11...c6': { say: 'Refuerza el caballo de d5 y abre la diagonal para la dama.', arrows: 'c6d5' },
    '12.d4': 'Las blancas liberan el alfil de c1.',
    '12...Bd6': { say: 'El alfil apunta a h2, junto al rey blanco.', arrows: 'd6h2:r' },
    '13.Re1': 'La torre vuelve a lugar seguro.',
    '13...Qh4': { say: 'La dama amenaza mate en h2.', arrows: 'h4h2:r' },
    '14.g3': 'El peón frena la amenaza, pero debilita las casillas blancas.',
    '14...Qh3': { say: 'La dama se mete en h3, pegada al rey.', marks: 'g2 f1 h1' },
    '15.Be3': 'Las blancas desarrollan el alfil.',
    '15...Bg4': { say: 'El alfil ataca la dama y suma una pieza más al ataque.', arrows: 'g4d1:r' },
    '16.Qd3': 'La dama sale del ataque.',
    '16...Rae8': { say: 'La torre entra en juego por la columna e.', arrows: 'e8e6' },
    '17.Nd2': 'El caballo se desarrolla y defiende f3.',
    '17...Re6': { say: 'La torre va a pasar a h6 o f6 para atacar.', arrows: 'e6h6' },
    '8.a4': { say: 'Anti-Marshall: las blancas atacan b5 para evitar el gambito.', arrows: 'a4b5' },
    '8.h3': 'Anti-Marshall: una jugada útil que evita alfil g4 y espera.',
    '8.d3': 'Anti-Marshall: las blancas defienden e4 y no dejan que d5 llegue con fuerza.',
    '8.d4': 'Anti-Marshall: las blancas golpean primero en el centro.',
  },

  'Principal: 15.Be3 Bg4 16.Qd3': {
    '18.a4': { say: 'Las blancas buscan contrajuego en el flanco de dama.', arrows: 'a4b5' },
    '18...Qh5': 'La dama se reubica y mantiene la presión.',
    '19.axb5': 'Las blancas abren la columna a.',
    outro: 'Las negras siguen con iniciativa: el material de más de las blancas cuesta mucho de aprovechar.',
  },

  'Principal: 18.a4 bxa4': {
    '18.a4': { say: 'Contrajuego en el flanco de dama.', arrows: 'a4b5' },
    '18...bxa4': 'Las negras comen y abren la columna b.',
    '19.Rxa4': { say: 'La torre se activa por la cuarta fila.', arrows: 'a4g4' },
    '19...f5': { say: 'Las negras avanzan el peón para atacar con f4.', arrows: 'f5f4' },
    '20.Qf1': 'Las blancas ofrecen cambiar damas.',
    '21.f4': 'Las blancas frenan el avance negro.',
  },

  'Principal: 17...Qh5': {
    '17...Qh5': 'La dama se retira a h5 de inmediato, manteniendo opciones.',
    '18.a4': { say: 'Contrajuego en el flanco de dama.', arrows: 'a4b5' },
    '18...f5': { say: 'Las negras avanzan en el flanco de rey.', arrows: 'f5f4' },
  },

  '15.Re4: g5': {
    '15.Re4': { say: 'La torre defiende por la cuarta fila y puede ir a h4.', arrows: 'e4h4' },
    '15...g5': { say: 'Le quita la casilla h4 a la torre.', arrows: 'g5h4' },
    '16.Qf1': 'Las blancas ofrecen cambiar damas.',
    '16...Qh5': 'La dama evita el cambio.',
    '17...Bf5': { say: 'El alfil ataca la torre.', arrows: 'f5e4' },
    '18.f3': 'El peón defiende la torre.',
    '18...Nf6': { say: 'El caballo vuelve a atacar la torre.', arrows: 'f6e4' },
    '20.Rxe8': 'Cambio de torres.',
  },

  'Anti-Marshall: 12.d3': {
    '12.d3': 'Más sólido que d4: no debilita e3 ni c3.',
    '15.Re4': { say: 'La torre defiende por la cuarta fila.', arrows: 'e4h4' },
    '15...g5': { say: 'Le quita h4 a la torre.', arrows: 'g5h4' },
    '17...Bf5': { say: 'Ataca la torre.', arrows: 'f5e4' },
  },

  'Marshall original 11...Nf6': {
    intro: 'Así se jugó el Marshall por primera vez: Capablanca contra Marshall, Nueva York 1918.',
    '11...Nf6': 'En lugar de c6, el caballo se retira a f6.',
    '12...Bd6': { say: 'El alfil apunta a h2.', arrows: 'd6h2' },
    '13...Ng4': { say: 'El caballo se ofrece en g4.', arrows: 'g4f2' },
    '14.Qf3': 'La dama ataca el caballo.',
    '14...Qh4': { say: 'Las negras ignoran la amenaza y atacan.', arrows: 'h4h2' },
    '15...Nxf2': { say: 'Sacrificio en f2.', marks: 'f2' },
    '16...Bg4': 'Otro sacrificio: el alfil ataca la dama.',
    '17.hxg4': 'Las blancas aceptan.',
    '17...Bh2+': 'Jaque con el alfil.',
    '19.Rxf2': 'Las blancas devuelven material.',
    '19...Qh1+': 'Jaque y el rey blanco tiene que salir.',
    outro: 'Capablanca se defendió con precisión y ganó la partida, pero el gambito dio que hablar durante cien años.',
  },

  '12.d4 Bd6 13.Re1 Qh4 14.g3 Qh3 15.Be3 Bg4 16.Qd3 f5': {
    '16...f5': { say: 'Las negras amenazan avanzar f4.', arrows: 'f5f4' },
    '17.f4': 'Las blancas frenan el avance del peón.',
    '17...Kh8': 'El rey se aparta de la diagonal del alfil de b3.',
  },

  '12.Bxd5': {
    '12.Bxd5': 'Las blancas cambian el caballo de d5 de inmediato.',
    '12...cxd5': 'Las negras quedan con un peón central.',
    '14.Re3': { say: 'La torre defiende por la tercera fila.', arrows: 'e3h3' },
    '15...Qf4': { say: 'La dama ataca la torre.', arrows: 'f4e5' },
    '17...Bf5': 'Las negras tienen buen desarrollo por el peón.',
  },

  '9.d4': {
    '9.d4': 'Las blancas no comen en d5: abren el centro.',
    '10.e5': { say: 'Ataca el caballo.', arrows: 'e5f6' },
    '10...Ne4': { say: 'El caballo salta a e4.', marks: 'e4' },
    '11...Bg4': { say: 'Clava el caballo de f3.', arrows: 'g4d1' },
    '15...Na5': { say: 'Ataca el alfil de b3.', arrows: 'a5b3' },
    '17.Bxg6': 'Cambio de alfiles.',
  },

  '12.d4 Bd6 13.Re1 Qh4 14.g3 Qh3 15.Bxd5': {
    '15.Bxd5': 'Las blancas cambian el caballo de d5.',
    '16.Qf3': { say: 'La dama ataca d5.', arrows: 'f3d5' },
    '16...Bf5': 'Las negras desarrollan con tiempo.',
    '17.Qxd5': 'Las blancas ganan otro peón.',
    '17...Rad8': 'Pero las negras activan todas sus piezas.',
  },

  '12.g3': {
    '12.g3': 'Las blancas evitan dama h4 de antemano.',
    '13...Qd7': { say: 'La dama va a h3 por otro camino.', arrows: 'd7h3' },
    '14...Qh3': 'Llegamos a una posición conocida.',
    '15.Re4': { say: 'La torre defiende.', arrows: 'e4h4' },
    '15...g5': 'Le quita h4 a la torre.',
    outro: 'Esta posición es la misma de la variante 15.Re4, a la que se llega con otro orden.',
  },

  'Anti-Marshall: 8.a4 b4': {
    '8...b4': { say: 'El peón avanza y le quita c3 al caballo.', marks: 'c3' },
    '10.a5': 'Fija el flanco de dama.',
    '10...Be6': { say: 'Ofrece cambiar el alfil de b3.', arrows: 'e6b3' },
    '12.Bc4': 'El alfil evita el cambio.',
    '14.Ne3': { say: 'El caballo va a d5.', arrows: 'e3d5' },
    '15.Nd5': { say: 'Una gran casilla para el caballo.', marks: 'd5' },
  },

  'Anti-Marshall: 8.a4 Bb7': {
    '8...Bb7': 'Las negras defienden b5 desarrollando el alfil.',
    '9...Re8': 'La torre apoya e5.',
    '10...Bf8': 'El alfil se reubica.',
    '12.Ba2': 'El alfil se pone a salvo.',
    '13...Na5': 'El caballo se reubica.',
    '16...d5': { say: 'Las negras rompen en el centro.', arrows: 'd5e4' },
  },

  'Anti-Marshall: 8.h3': {
    '8...Bb7': 'Las negras desarrollan el alfil.',
    '10.a3': 'Las blancas preparan una retirada para el alfil.',
    '10...Na5': { say: 'Ataca el alfil.', arrows: 'a5b3' },
    '11.Ba2': 'El alfil se retira.',
    '13...Bc8': 'El alfil se reubica a e6.',
    '15.Nd5': { say: 'El caballo se instala en d5.', marks: 'd5' },
  },

  'Anti-Marshall: 8.d4': {
    '8...d6': 'Las negras sostienen e5.',
    '9...Bg4': { say: 'Clava el caballo y presiona d4.', arrows: 'g4d1' },
    '10.d5': { say: 'Las blancas cierran el centro y echan al caballo.', arrows: 'd5c6' },
    '11...c6': { say: 'Las negras atacan el peón de d5.', arrows: 'c6d5' },
    '15...Nc4': { say: 'El caballo llega a c4.', marks: 'c4' },
  },

  'Anti-Marshall: 8.a4 b4 9.d4': {
    '8...b4': 'El peón avanza.',
    '9.d4': 'Las blancas abren el centro.',
    '11.Qxd8': 'Cambio de damas.',
    '12...Bc5': 'El alfil se activa.',
    '14.Nc4': 'El caballo ataca e5.',
    '17.Bxe6': 'Cambio de alfiles: final equilibrado.',
  },

  'Anti-Marshall: 8.h3 Bb7 9.d3 d6 10.a4': {
    '10.a4': { say: 'Presión en el flanco de dama.', arrows: 'a4b5' },
    '10...Na5': { say: 'Ataca el alfil.', arrows: 'a5b3' },
    '11...b4': 'El peón avanza.',
    '13.Nc4': 'El caballo ocupa c4.',
    '14...Nd7': { say: 'El caballo va a b6.', arrows: 'd7b6' },
    '18.d4': { say: 'Las blancas golpean en el centro.', arrows: 'd4e5' },
  },

  'Anti-Marshall: 8.d3': {
    '8...d6': 'Las negras sostienen e5.',
    '9...Na5': { say: 'Ataca el alfil.', arrows: 'a5b3' },
    '10...c5': 'Estructura típica de la Ruy López cerrada.',
    '12.Nf1': { say: 'La maniobra del caballo.', arrows: 'f1g3' },
    '15.d4': { say: 'Golpe central.', arrows: 'd4e5' },
  },

  'Anti-Marshall: 8.a4 Rb8': {
    '8...Rb8': 'La torre defiende b5.',
    '9.axb5': 'Las blancas abren la columna a.',
    '10.c3': 'Las blancas juegan c3… y permiten el Marshall igual.',
    '10...d5': { say: '¡El Marshall llega de todos modos!', arrows: 'd5e4' },
    '13...c6': { say: 'Refuerza el caballo.', arrows: 'c6d5' },
    '15...Qh4': { say: 'Amenaza mate.', arrows: 'h4h2:r' },
    '17...Bg4': { say: 'Ataca la dama.', arrows: 'g4d1' },
    '18...Rbe8': 'La torre entra al centro.',
  },

  'Anti-Marshall: 8.a4 Bb7 9.d3 d6': {
    '8...Bb7': 'El alfil defiende b5.',
    '10...Na5': 'El caballo se reubica.',
    '11.Ba2': 'El alfil se retira.',
    '11...c5': 'Ganan espacio en el flanco de dama.',
    '14...Rfe8': 'La torre apoya el centro.',
    '16...d5': { say: 'Las negras rompen en el centro.', arrows: 'd5e4' },
  },

  'Variante Steiner 9...e4': {
    '9...e4': { say: 'En vez de recapturar, las negras atacan el caballo.', arrows: 'e4f3' },
    '10.dxc6': 'Las blancas comen el caballo.',
    '10...exf3': 'Las negras comen el caballo de f3.',
    '11...fxg2': 'El peón llega a g2, junto al rey blanco.',
    '12.Qf3': 'La dama defiende y ataca.',
    '12...Bg4': { say: 'Ataca la dama.', arrows: 'g4f3' },
    '13...Bd6': { say: 'El alfil apunta a h2.', arrows: 'd6h2' },
  },

  '14.g3 Qh3 15.Qe2': {
    '15.Qe2': 'La dama se aparta antes de que la ataque el alfil.',
    '16.Qf1': 'Las blancas ofrecen cambiar damas.',
    '16...Qh5': 'La dama evita el cambio.',
    '18.f3': 'Las blancas cierran la diagonal del alfil.',
    '18...Bf5': 'El alfil se reubica.',
  },

  '11...Bb7': {
    '11...Bb7': { say: 'El alfil sale a la gran diagonal, apuntando a g2.', arrows: 'b7g2' },
    '15.Qf3': 'La dama defiende g2.',
    '15...Rae8': 'Las negras activan sus torres.',
  },

  '12.d3 Bd6 13.Re1 Bf5': {
    '12.d3': 'Las blancas juegan sólido.',
    '13...Bf5': { say: 'El alfil apunta a d3.', arrows: 'f5d3' },
    '14.Qf3': { say: 'La dama ataca el alfil.', arrows: 'f3f5' },
    '14...Bg6': 'El alfil se retira.',
    '16.Ne4': { say: 'El caballo ataca el alfil de d6.', arrows: 'e4d6' },
  },

  'Marshall: 11...Nf6 12.d4': {
    '11...Nf6': 'El caballo se retira a f6.',
    '12.d4': 'Las blancas abren el alfil.',
    '13...Ng4': { say: 'El caballo amenaza h2 y f2.', arrows: 'g4f2' },
    '14.h3': 'Las blancas atacan el caballo.',
    '14...Qh4': 'Las negras ignoran la amenaza.',
    '15...Nxf2': { say: 'Sacrificio en f2.', marks: 'f2' },
  },
}
