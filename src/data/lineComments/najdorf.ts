import type { LineComments } from './index.ts'

export const najdorf: LineComments = {
  '*': {
    '6.Be3': { say: 'El Ataque Inglés: las blancas preparan f3, dama d2, enroque largo y avanzar los peones del flanco de rey.', arrows: 'f2f3:b g2g4:b' },
    '6...e5': { say: 'Echa al caballo de d4 y gana espacio. A cambio, la casilla d5 queda débil.', arrows: 'e5d4', marks: 'd5' },
    '7.Nb3': 'El caballo se retira a b3, desde donde vigila c5 y d4.',
    '7...Be6': { say: 'El alfil controla d5, la casilla clave.', arrows: 'e6d5' },
    '8.f3': { say: 'Evita caballo g4 y prepara g4.', marks: 'g4' },
    '6.Bg5': { say: 'La línea más aguda: clava el caballo de f6 y prepara f4.', arrows: 'g5f6' },
    '6...e6': 'Las negras refuerzan d5 y abren la diagonal del alfil de f8.',
    '7.f4': { say: 'Las blancas amenazan avanzar e5.', arrows: 'e4e5:r' },
    '7...Be7': 'Desarrollo clásico: rompe la clavada.',
    '8.Qf3': 'La dama se desarrolla y prepara el enroque largo.',
    '7...Qb6': { say: 'El peón envenenado: la dama ataca b2 y el caballo de d4.', arrows: 'b6b2 b6d4' },
    '6.Be2': 'La línea clásica: las blancas juegan posicional.',
  },

  'Ataque Inglés: 6...e5': {
    '8...Be7': 'Las negras se desarrollan.',
    '9.Qd2': 'La dama se conecta con el alfil de e3, preparando el enroque largo.',
    '10.O-O-O': 'Enroques opuestos: empieza la carrera de ataques.',
    '11.g4': { say: 'Los peones blancos van contra el rey negro.', arrows: 'g4g5' },
    '11...b5': { say: 'Los peones negros van contra el rey blanco.', arrows: 'b5b4' },
    '12.g5': { say: 'Echa al caballo de f6.', arrows: 'g5f6' },
    '12...b4': { say: 'Echa al caballo de c3.', arrows: 'b4c3' },
    '13...Ne8': 'El caballo se retira.',
    '14.f4': { say: 'Las blancas abren líneas.', arrows: 'f4e5' },
    '15.f5': 'Echa al alfil de e6.',
    '16.Nbd4': 'Un sacrificio de caballo para abrir líneas.',
    '17...b3': { say: 'Las negras golpean primero: el peón llega a b3.', arrows: 'b3a2 b3c2' },
    '19...Bb3': 'Otro sacrificio: el alfil abre el rey blanco.',
    outro: 'Una carrera de ataques típica de la Najdorf: cada tiempo cuenta.',
  },

  'Ataque Inglés: 8...h5': {
    '8...h5': { say: 'Las negras frenan el avance g4.', arrows: 'h5g4' },
    '9...Nbd7': 'El caballo defiende el centro.',
    '11.Kb1': 'El rey se pone a salvo.',
    '12.Nd5': { say: 'El caballo ocupa la casilla débil de d5.', marks: 'd5' },
    '12...Bxd5': 'Las negras cambian el caballo.',
    '13...Nb6': { say: 'El caballo ataca el peón de d5.', arrows: 'b6d5' },
    '14.Bxb6': 'Las blancas cambian el caballo.',
    '17.Qe3': 'Las blancas ofrecen cambiar damas.',
  },

  'Ataque Inglés: 10.g4 b5': {
    '9.Qd2': 'Las blancas preparan el enroque largo.',
    '10.g4': { say: 'Las blancas atacan antes de enrocar.', arrows: 'g4g5' },
    '10...b5': { say: 'Las negras contraatacan.', arrows: 'b5b4' },
    '12.Nd5': { say: 'El caballo salta a d5.', marks: 'd5' },
    '13...Nh5': 'El caballo se va al borde, pero amenaza f4.',
    '14.O-O-O': 'Ahora sí, enroque largo.',
    '17.Bb5': { say: 'El alfil molesta en b5.', arrows: 'b5d7' },
  },

  'Ataque Inglés: 6...e6': {
    '6...e6': 'Esquema Scheveningen: centro flexible con e6 y d6.',
    '7.f3': { say: 'Prepara g4.', arrows: 'g2g4' },
    '7...b5': { say: 'Las negras se expanden rápido.', arrows: 'b5b4' },
    '9.g4': { say: 'Los peones blancos avanzan.', arrows: 'g4g5' },
    '9...h6': 'Frena g5.',
    '11...b4': { say: 'Echa al caballo.', arrows: 'b4c3' },
    '12...d5': { say: 'Las negras golpean el centro.', arrows: 'd5e4' },
    '14.Bh3': { say: 'El alfil presiona e6.', arrows: 'h3e6' },
  },

  'Ataque Inglés: 6...Ng4': {
    '6...Ng4': { say: 'El caballo ataca el alfil de e3.', arrows: 'g4e3' },
    '7.Bg5': 'El alfil se va a g5.',
    '7...h6': 'Echa al alfil.',
    '8...g5': 'Sigue echándolo.',
    '9...Bg7': { say: 'El alfil se instala en la gran diagonal.', arrows: 'g7b2' },
    '11.Bxg4': 'Las blancas cambian el caballo.',
    '12.f3': 'Las blancas controlan e4 y g4.',
    '16...Ne5': { say: 'El caballo llega a e5, una gran casilla.', marks: 'e5' },
  },

  '6.Be3 e5 7.Nf3': {
    '7.Nf3': 'El caballo se va a f3 en lugar de b3.',
    '7...Qc7': 'La dama se desarrolla.',
    '8.a4': { say: 'Evita b5.', marks: 'b5' },
    '11.Nd2': { say: 'El caballo va a c4.', arrows: 'd2c4' },
    '12.Nc4': { say: 'El caballo presiona d6.', arrows: 'c4d6' },
    '14.Nb6': { say: 'El caballo ataca la torre.', arrows: 'b6a8' },
  },

  '6.Bg5: línea principal 7...Be7': {
    '8...Qc7': 'La dama se desarrolla.',
    '9.O-O-O': 'Enroque largo.',
    '10.g4': { say: 'Los peones avanzan.', arrows: 'g4g5' },
    '10...b5': { say: 'Contraataque.', arrows: 'b5b4' },
    '11.Bxf6': 'Las blancas cambian el caballo.',
    '12.g5': 'Echa al caballo.',
    '13.f5': { say: 'Las blancas atacan e6.', arrows: 'f5e6' },
    '14.f6': { say: 'El peón se mete en la posición negra.', arrows: 'f6e7' },
    '15...Bf8': 'El alfil se retira: una posición muy aguda.',
  },

  'Peón envenenado': {
    '8.Qd2': 'Las blancas entregan el peón de b2.',
    '8...Qxb2': 'Las negras lo comen.',
    '9.Rb1': { say: 'La torre ataca la dama.', arrows: 'b1b8' },
    '9...Qa3': 'La dama se esconde en a3.',
    '10.f5': { say: 'Las blancas atacan e6.', arrows: 'f5e6' },
    '13.e5': { say: 'Las blancas abren líneas.', arrows: 'e5f6' },
    '15.Ne4': { say: 'El caballo ataca f6.', arrows: 'e4f6' },
    '17.Rb3': { say: 'La torre ataca la dama.', arrows: 'b3a3' },
    '18.Nxf6+': 'Jaque.',
    '19...Bh4+': 'Jaque con el alfil.',
    outro: 'El peón envenenado exige memoria precisa a los dos bandos: practicalo con cuidado.',
  },

  'Peón envenenado: 8.Nb3': {
    '8.Nb3': 'Las blancas defienden b2 con el caballo.',
    '8...Be7': 'Desarrollo normal.',
    '10.O-O-O': 'Enroque largo.',
    '10...Qc7': 'La dama vuelve a c7.',
    '11...b5': { say: 'Contraataque en el flanco de dama.', arrows: 'b5b4' },
    '13...b4': { say: 'Echa al caballo.', arrows: 'b4c3' },
  },

  'Trampa de Gotemburgo': {
    intro: 'La trampa de Gotemburgo: tres partidas perdidas igual en el mismo torneo, en 1955.',
    '8...h6': 'Las negras preguntan al alfil.',
    '9...g5': 'Una idea agresiva: atacar los peones.',
    '10.fxg5': 'Las blancas comen.',
    '10...Nfd7': { say: 'El caballo va a e5. Este es el error.', arrows: 'd7e5' },
    '11.Nxe6': { say: '¡Sacrificio en e6! Ataca la dama.', arrows: 'e6d8' },
    '12.Qh5+': { say: 'Jaque.', arrows: 'h5e8' },
    '13.Bb5': { say: 'Otra pieza al ataque: el rey negro no tiene defensa.', arrows: 'b5d7' },
    outro: 'No abras tu flanco de rey con g5 si tu rey está en el centro.',
  },

  '6.Bg5 e6 7.f4 h6': {
    '7...h6': 'Las negras preguntan al alfil.',
    '8...Qb6': { say: 'La dama ataca b2.', arrows: 'b6b2' },
    '9.a3': 'Las blancas defienden b2 indirectamente.',
    '10.Bf2': { say: 'El alfil ataca la dama.', arrows: 'f2b6' },
    '12.O-O-O': 'Enroque largo.',
    '12...b5': { say: 'Contraataque.', arrows: 'b5b4' },
    '13.g4': 'Los peones blancos avanzan.',
    '15...Nc5': { say: 'El caballo ataca e4.', arrows: 'c5e4' },
  },

  '6.Bg5 e6 7.Qf3': {
    '7.Qf3': 'La dama sale antes de f4.',
    '7...h6': 'Pregunta al alfil.',
    '9.O-O-O': 'Enroque largo.',
    '10.Qg3': { say: 'La dama presiona g7 y d6.', arrows: 'g3d6' },
    '11.f4': 'Las blancas avanzan.',
    '11...b5': { say: 'Contraataque.', arrows: 'b5b4' },
  },

  '6.Bg5 Nbd7': {
    '6...Nbd7': 'El caballo defiende f6.',
    '7...Qc7': 'La dama se desarrolla.',
    '9.O-O-O': 'Enroque largo.',
    '9...b5': { say: 'Contraataque.', arrows: 'b5b4' },
    '11.Rhe1': { say: 'La torre apoya e4 y prepara e5.', arrows: 'e1e4' },
    '12.Nb3': 'El caballo se retira.',
    '14.Qh3': { say: 'La dama presiona e6.', arrows: 'h3e6' },
  },

  'Clásica 6.Be2': {
    '7.Nb3': 'El caballo se retira a b3.',
    '7...Be7': 'Desarrollo.',
    '9.Be3': 'El alfil apunta a b6.',
    '9...Be6': { say: 'Control de d5.', arrows: 'e6d5' },
    '11.a4': 'Espacio en el flanco de dama.',
    '12.a5': 'Fija el flanco de dama.',
    '14.Bf3': { say: 'El alfil presiona d5.', arrows: 'f3d5' },
    '16.Nd5': { say: 'El caballo ocupa d5.', marks: 'd5' },
  },

  '6.Be2 e5 7.Nf3': {
    '7.Nf3': 'El caballo se va a f3.',
    '7...h6': 'Evita alfil g5.',
    '9.Re1': 'La torre apoya e4.',
    '11.Bf1': 'El alfil se reubica.',
    '12...Rc8': { say: 'La torre ocupa la columna c.', arrows: 'c8c2' },
    '15.Nc4': 'El caballo presiona d6.',
  },

  'Adams 6.h3': {
    '6.h3': 'El Ataque Adams: prepara g4.',
    '7.Nde2': 'El caballo se va a e2.',
    '7...h5': 'Frena g4.',
    '8.g3': { say: 'Fianchetto del alfil.', arrows: 'f1g2' },
    '9...b5': { say: 'Espacio en el flanco de dama.', arrows: 'b5b4' },
    '11.Nd5': { say: 'El caballo ocupa d5.', marks: 'd5' },
    '12...Bf5': 'El alfil se activa.',
  },

  'Fischer-Sozin 6.Bc4': {
    '6.Bc4': { say: 'El sistema de Fischer: el alfil presiona e6 y f7.', arrows: 'c4f7' },
    '7.Bb3': 'El alfil se retira antes de que lo ataquen.',
    '7...b5': { say: 'Las negras ganan espacio.', arrows: 'b5b4' },
    '9.Qf3': { say: 'La dama sale con la idea de ir a g3 y presionar g7.', arrows: 'f3g3' },
    '10.Qg3': { say: 'La dama presiona g7.', arrows: 'g3g7' },
    '13...Rg8': 'La torre defiende g7.',
    '14...O-O-O': 'Las negras enrocan largo.',
  },

  '6.Bc4 Nbd7': {
    '7...Nbd7': { say: 'El caballo va a c5 para atacar el alfil.', arrows: 'd7c5' },
    '8.f4': 'Las blancas preparan e5.',
    '9.e5': { say: 'Las blancas atacan.', arrows: 'e5f6' },
    '11.Bf4': 'El alfil defiende e5.',
    '12...Nxb3': 'Las negras cambian el alfil.',
    '14.Qh5': { say: 'La dama ataca el flanco de rey.', arrows: 'h5f7' },
  },

  '6.f3': {
    '6.f3': 'Las blancas juegan f3 primero.',
    '7.Nb3': 'El caballo se retira.',
    '8.Be3': 'Transponemos al Ataque Inglés.',
    '10.O-O-O': 'Enroque largo.',
    outro: 'Llegamos a la misma posición del Ataque Inglés con otro orden de jugadas.',
  },

  '6.g3': {
    '6.g3': { say: 'Fianchetto: el alfil irá a g2 para controlar d5.', arrows: 'f1g2' },
    '7.Nde2': 'El caballo se retira a e2.',
    '7...b5': { say: 'Espacio.', arrows: 'b5b4' },
    '8...Bb7': { say: 'El alfil presiona e4.', arrows: 'b7e4' },
    '11.Nd5': { say: 'El caballo ocupa d5.', marks: 'd5' },
    '15.c3': 'Las blancas abren el flanco de dama.',
  },

  '6.Be3 e6 7.Qd2': {
    '6...e6': 'Esquema Scheveningen.',
    '7.Qd2': 'La dama primero.',
    '7...b5': { say: 'Las negras se expanden.', arrows: 'b5b4' },
    '9.O-O-O': 'Enroque largo.',
    '10.g4': { say: 'Los peones avanzan.', arrows: 'g4g5' },
    '12...d5': { say: 'Golpe central.', arrows: 'd5e4' },
    outro: 'Esta posición es la misma de 6...e6 7.f3, por otro orden.',
  },

  '6.a4': {
    '6.a4': { say: 'Las blancas impiden b5.', marks: 'b5' },
    '7.Nf3': 'El caballo se retira a f3.',
    '8.Bc4': { say: 'El alfil presiona f7.', arrows: 'c4f7' },
    '10.Bxe6': 'Las blancas cambian el alfil.',
    '11.Ng5': { say: 'El caballo ataca e6.', arrows: 'g5e6' },
    '12.f4': 'Las blancas abren la columna f.',
  },

  '6.Be2 e6 Scheveningen': {
    '7.O-O': 'Las blancas enrocan corto.',
    '8.f4': 'Las blancas preparan e5 o f5.',
    '9.Kh1': 'El rey sale de la diagonal.',
    '10.a4': { say: 'Evita b5.', marks: 'b5' },
    '12.Bf3': { say: 'El alfil presiona el centro.', arrows: 'f3c6' },
    '15.g4': { say: 'Ataque Keres: los peones avanzan.', arrows: 'g4g5' },
  },

  '6.Bg5 e6 7.f4 Be7 8.Qf3 h6 9.Bh4 Qc7': {
    '8...h6': 'Pregunta al alfil.',
    '9...Qc7': 'La dama se desarrolla.',
    '10.O-O-O': 'Enroque largo.',
    '11...g5': 'Las negras atacan los peones blancos.',
    '12...Ne5': { say: 'El caballo ataca la dama.', arrows: 'e5f3' },
    '13...Nfg4': { say: 'El caballo ataca la dama.', arrows: 'g4e3' },
    '15...Bxg5+': 'Jaque.',
  },
}
