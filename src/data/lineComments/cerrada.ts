import type { LineComments } from './index.ts'

export const cerrada: LineComments = {
  '*': {
    '6.Re1': { say: 'La torre defiende e4: ahora las blancas amenazan comer en c6 y luego en e5.', arrows: 'e1e4 a4c6:b' },
    '6...b5': 'Echa al alfil antes de que gane el peón.',
    '7.Bb3': { say: 'El alfil se instala en una gran diagonal, apuntando a f7.', arrows: 'b3f7' },
    '7...d6': { say: 'Refuerza e5 y abre la diagonal del alfil de c8.', arrows: 'd6e5' },
    '8.c3': { say: 'Prepara d4 y le da al alfil la retirada c2.', arrows: 'c3d4 b3c2:b' },
    '8...O-O': 'Las negras completan el enroque.',
    '9.h3': { say: 'Evita alfil g4, que clavaría el caballo y presionaría d4.', marks: 'g4' },
    '9...Na5': { say: 'Defensa Chigorin: el caballo ataca el alfil y prepara c5.', arrows: 'a5b3 c7c5:b' },
    '10.Bc2': 'El alfil se retira a c2, donde sigue apuntando al flanco de rey.',
    '10...c5': 'Las negras ganan espacio en el flanco de dama.',
    '11.d4': { say: 'Las blancas finalmente toman el centro.', arrows: 'd4e5' },
    '11...Qc7': { say: 'La dama refuerza e5 y mira la columna c.', arrows: 'c7e5' },
    '12.Nbd2': { say: 'El caballo empieza su viaje hacia f1 y g3.', arrows: 'd2f1 f1g3' },
    '9...Nb8': { say: 'Defensa Breyer: el caballo vuelve para reubicarse en d7.', arrows: 'b8d7' },
    '10...Nbd7': 'El caballo llega a d7, desde donde defiende e5 sin estorbar al peón c.',
    '11.Nbd2': 'Las blancas desarrollan el caballo.',
    '11...Bb7': { say: 'El alfil presiona e4.', arrows: 'b7e4' },
    '12.Bc2': 'El alfil defiende e4.',
    '13.Nf1': { say: 'La maniobra típica del caballo.', arrows: 'f1g3' },
    '13...Bf8': 'El alfil se reubica y deja e7 libre.',
    '14.Ng3': 'El caballo llega a g3, mirando f5 y h5.',
    '14...g6': { say: 'Prepara alfil g7 y quita la casilla f5 al caballo.', marks: 'f5' },
    '9...Bb7': { say: 'Defensa Zaitsev: presión inmediata sobre e4.', arrows: 'b7e4' },
    '10...Re8': { say: 'La torre también apunta a e4.', arrows: 'e8e4' },
    '11...Bf8': 'El alfil deja e7 libre para la torre.',
  },

  'Chigorin: 11...Qc7': {
    '12...cxd4': 'Las negras abren la columna c.',
    '13...Nc6': { say: 'El caballo vuelve al juego presionando d4.', arrows: 'c6d4' },
    '14.Nb3': 'El caballo defiende d4.',
    '14...a5': { say: 'Las negras amenazan a4, echando al caballo.', arrows: 'a5a4' },
    '16...Bd7': 'Las negras completan el desarrollo.',
    '17.Rc1': { say: 'La torre ocupa la columna c.', arrows: 'c1c8' },
  },

  'Chigorin: 12...Bd7': {
    '12...Bd7': 'Las negras desarrollan antes de cambiar en d4.',
    '14...Rac8': { say: 'La torre ocupa la columna c.', arrows: 'c8c2' },
    '15.Ne3': { say: 'El caballo apunta a d5 y f5.', arrows: 'e3d5 e3f5' },
    '16.d5': 'Las blancas ganan espacio y echan al caballo.',
    '16...Nb4': { say: 'El caballo ataca el alfil.', arrows: 'b4c2' },
    '18...Na6': 'El caballo se reubica por c5.',
  },

  'Chigorin: 11...Nd7': {
    '11...Nd7': 'El caballo prepara llevar el alfil a f6.',
    '13...Nc6': { say: 'Presión sobre d4.', arrows: 'c6d4' },
    '16...Bf6': { say: 'El alfil presiona d4.', arrows: 'f6d4' },
    '17.d5': 'Las blancas cierran el centro.',
    '17...Nd4': { say: 'El caballo salta a d4.', marks: 'd4' },
    '18.Bxd4': 'Las blancas cambian el fuerte caballo.',
    '19...Ne5': { say: 'El otro caballo llega a e5.', marks: 'e5' },
  },

  'Chigorin: 12.d5': {
    '12.d5': { say: 'Las blancas cierran el centro de inmediato.', arrows: 'd5c6' },
    '12...Nc4': { say: 'El caballo se instala en c4.', marks: 'c4' },
    '13.b3': 'Las blancas echan al caballo.',
    '15.Nf1': { say: 'La maniobra del caballo.', arrows: 'f1g3' },
    '15...Rfc8': 'La torre va a la columna c.',
    '16...c4': 'Las negras ganan espacio en el flanco de dama.',
    '19...Na4': { say: 'El caballo ataca c3.', arrows: 'a4c3' },
  },

  'Breyer: 9...Nb8': {
    '10.d4': { say: 'Las blancas toman el centro.', arrows: 'd4e5' },
    '12...Re8': 'La torre apoya e5.',
    '15.a4': { say: 'Presión en el flanco de dama.', arrows: 'a4b5' },
    '15...c5': 'Las negras atacan el centro.',
    '16.d5': 'Las blancas cierran el centro.',
    '16...c4': { say: 'Las negras ganan espacio y la casilla d3.', marks: 'd3' },
    '17.Bg5': { say: 'El alfil molesta en el flanco de rey.', arrows: 'g5f6' },
    '18...Nc5': { say: 'El caballo se instala en c5.', marks: 'c5' },
  },

  'Breyer: 15.b3': {
    '10.d4': { say: 'Las blancas toman el centro.', arrows: 'd4e5' },
    '12...Re8': 'La torre apoya e5.',
    '15.b3': 'Las blancas evitan c4 de las negras.',
    '15...Bg7': 'El alfil se instala en g7.',
    '16.d5': 'Las blancas cierran el centro.',
    '17...c6': { say: 'Las negras abren la columna c.', arrows: 'c6d5' },
    '19...Rc8': { say: 'La torre ocupa la columna c.', arrows: 'c8c1' },
  },

  'Breyer: 10.d3': {
    '10.d3': 'Las blancas juegan con calma, sin d4.',
    '12...Nc5': { say: 'El caballo ataca el alfil.', arrows: 'c5b3' },
    '13...Re8': 'La torre apoya e5.',
    '15.b4': 'Las blancas echan al caballo.',
    '17.a5': 'Espacio en el flanco de dama.',
    '19...d5': { say: 'Las negras rompen en el centro.', arrows: 'd5e4' },
  },

  'Breyer: 12.Bc2 Re8 13.a4': {
    '10.d4': { say: 'Las blancas toman el centro.', arrows: 'd4e5' },
    '12...Re8': 'La torre apoya e5.',
    '13.a4': { say: 'Presión inmediata en el flanco de dama.', arrows: 'a4b5' },
    '14.Bd3': 'El alfil defiende b5.',
    '14...c6': 'Las negras defienden b5.',
    '18...exd4': 'Las negras cambian en el centro.',
    '20.d5': 'Las blancas cierran el centro.',
    '21...Nc5': { say: 'El caballo llega a c5.', marks: 'c5' },
  },

  'Zaitsev: 9...Bb7': {
    '10.d4': { say: 'Las blancas toman el centro.', arrows: 'd4e5' },
    '12.a4': { say: 'Presión en el flanco de dama.', arrows: 'a4b5' },
    '12...h6': 'Evita caballo g5.',
    '13...exd4': 'Las negras abren el juego.',
    '14...Nb4': { say: 'El caballo ataca el alfil.', arrows: 'b4c2' },
    '15...c5': 'Las negras atacan el centro.',
    '17.Ra3': { say: 'La famosa torre a3: sale por la tercera fila hacia el flanco de rey.', arrows: 'a3g3' },
    '17...f5': { say: 'Las negras atacan el centro blanco.', arrows: 'f5e4' },
  },

  'Zaitsev: 12.a3': {
    '10.d4': { say: 'Las blancas toman el centro.', arrows: 'd4e5' },
    '12.a3': 'Las blancas evitan caballo b4.',
    '13...Nb8': { say: 'El caballo se reubica por d7, como en la Breyer.', arrows: 'b8d7' },
    '14.b4': 'Espacio en el flanco de dama.',
    '16.Qb1': { say: 'La dama defiende e4 y apunta al flanco de rey.', arrows: 'b1e4' },
    '19.dxe5': 'Las blancas cambian en e5.',
  },

  'Zaitsev: 11.Ng5 Rf8': {
    '10.d4': { say: 'Las blancas toman el centro.', arrows: 'd4e5' },
    '11.Ng5': { say: 'El caballo ataca f7, que perdió a la torre como defensora.', arrows: 'g5f7' },
    '11...Rf8': 'La torre vuelve a defender f7.',
    '12.Nf3': 'El caballo vuelve.',
    '12...Re8': 'Las negras ofrecen repetir las jugadas.',
    '14.a4': { say: 'Presión en el flanco de dama.', arrows: 'a4b5' },
    outro: 'Si las blancas no quieren repetir, se llega a la posición principal de la Zaitsev.',
  },

  'Smyslov: 9...h6': {
    '9...h6': { say: 'Defensa Smyslov: evita caballo g5 y prepara torre e8.', marks: 'g5' },
    '10.d4': { say: 'Las blancas toman el centro.', arrows: 'd4e5' },
    '10...Re8': 'La torre apoya e5.',
    '12.Nf1': { say: 'La maniobra del caballo.', arrows: 'f1g3' },
    '13...Na5': { say: 'Ataca el alfil.', arrows: 'a5b3' },
    '16.d5': 'Las blancas cierran el centro.',
    '20.Nf5': { say: 'El caballo llega a f5.', marks: 'f5' },
  },

  'Karpov: 9...Nd7': {
    '9...Nd7': 'Defensa Karpov: el caballo libera la diagonal para el alfil.',
    '10.d4': { say: 'Las blancas toman el centro.', arrows: 'd4e5' },
    '10...Bf6': { say: 'El alfil presiona d4.', arrows: 'f6d4' },
    '11.a4': { say: 'Presión en el flanco de dama.', arrows: 'a4b5' },
    '12.Na3': 'El caballo presiona b5 y apunta a c4.',
    '14...b4': 'Las negras ganan espacio.',
    '16...c5': 'Las negras atacan el centro.',
    '19.Qxd4': 'Las blancas centralizan la dama.',
    '21.Qxd8': 'Cambio de damas: final igualado.',
  },

  'Variante 9...Be6': {
    '9...Be6': 'Las negras ofrecen cambiar el alfil de b3.',
    '10.d4': { say: 'Las blancas toman el centro.', arrows: 'd4e5' },
    '10...Bxb3': 'Cambio de alfiles.',
    '12...d5': { say: 'Las negras golpean el centro.', arrows: 'd5e4' },
    '13.e5': 'Las blancas echan al caballo.',
    '14...f5': { say: 'Refuerza el caballo de e4.', arrows: 'f5e4' },
    '15.exf6': 'Captura al paso.',
    '17...Qd5': { say: 'La dama ataca la torre y d4.', arrows: 'd5e4 d5d4' },
  },

  'Variante 9...a5': {
    '9...a5': { say: 'Las negras ganan espacio en el flanco de dama.', arrows: 'a5a4' },
    '10.d4': { say: 'Las blancas toman el centro.', arrows: 'd4e5' },
    '10...a4': 'Echa al alfil.',
    '12.Nbd2': 'El caballo se desarrolla.',
    '12...Re8': 'La torre apoya e5.',
    '15.Be3': 'El alfil se desarrolla.',
    '18.d5': 'Las blancas cierran el centro y echan al caballo.',
  },

  'Chigorin con 9.d3': {
    '11.d3': 'Las blancas juegan sin d4 por ahora.',
    '11...Nc6': 'El caballo vuelve al centro.',
    '12...Re8': 'La torre apoya e5.',
    '15.d4': { say: 'Ahora sí, golpe central.', arrows: 'd4e5' },
    '17.Nxd4': 'Las blancas centralizan el caballo.',
    '18.Qxd4': 'La dama domina el centro.',
  },

  '9.d4 Bg4': {
    '9.d4': 'Sin h3: las blancas permiten la clavada.',
    '9...Bg4': { say: 'El alfil clava el caballo y presiona d4.', arrows: 'g4d1' },
    '10.Be3': 'Las blancas defienden d4.',
    '11...Na5': { say: 'Ataca el alfil.', arrows: 'a5b3' },
    '12...Nc4': { say: 'El caballo ataca el alfil de e3.', arrows: 'c4e3' },
    '15.d5': 'Las blancas cierran el centro.',
  },

  '9.d3 Na5': {
    '9.d3': 'Las blancas juegan con calma.',
    '11.Nbd2': 'El caballo se desarrolla.',
    '12...Re8': 'La torre apoya e5.',
    '15.d4': { say: 'Golpe central.', arrows: 'd4e5' },
    '18.Qxd4': 'La dama domina el centro.',
  },

  'Orden 7...O-O 8.c3 d6': {
    '7...O-O': 'Las negras enrocan primero: así también podrían jugar el Marshall.',
    '8...d6': 'Las negras eligen la Cerrada.',
    '12...Nc6': { say: 'El caballo vuelve presionando d4.', arrows: 'c6d4' },
    '13.dxc5': 'Las blancas cambian en c5.',
    '14.Nf1': { say: 'La maniobra del caballo.', arrows: 'f1e3' },
    '16...c4': 'Las negras ganan espacio.',
  },

  'Chigorin: 13.dxc5': {
    '12...Nc6': { say: 'Presión sobre d4.', arrows: 'c6d4' },
    '13.dxc5': 'Las blancas abren la columna d.',
    '14.Nf1': { say: 'El caballo va a e3.', arrows: 'f1e3' },
    '15...Rad8': 'La torre ocupa la columna d.',
    '17.Ng5': { say: 'El caballo ataca el alfil de e6.', arrows: 'g5e6' },
  },

  'Ataque Worrall (6.Qe2)': {
    '6.Qe2': { say: 'Ataque Worrall: la dama defiende e4 y deja libre la torre.', arrows: 'e2e4' },
    '7...O-O': 'Las negras enrocan.',
    '8...d5': { say: 'Las negras golpean en el centro.', arrows: 'd5e4' },
    '9.d3': 'Las blancas defienden e4.',
    '10...Bb7': 'Las negras se desarrollan.',
    '13...Na5': { say: 'Ataca el alfil.', arrows: 'a5b3' },
    '15...d4': 'Las negras ganan espacio.',
  },

  'Variante 9...Re8 10.d4 Bb7': {
    '9...Re8': 'Las negras ponen primero la torre.',
    '10.d4': { say: 'Las blancas toman el centro.', arrows: 'd4e5' },
    '10...Bb7': 'Transponemos a la Zaitsev.',
    '13...exd4': 'Las negras abren el juego.',
    '14...Nb4': { say: 'Ataca el alfil.', arrows: 'b4c2' },
    outro: 'Llegamos a la misma posición de la Zaitsev por otro orden de jugadas.',
  },
}
