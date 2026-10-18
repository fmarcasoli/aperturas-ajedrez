# Entrenador de Aperturas

App para practicar aperturas de ajedrez desde la compu o el celular.

- **Ejercicios**: una posición de teoría y tenés que encontrar la jugada de libro. Se pueden filtrar por bando (Blancas / Negras / Ambos) y por estado (Todos / Pendientes / Fallados). Los fallados aparecen más seguido.
- **Líneas completas**: jugás una variante entera de memoria; la computadora mueve el otro bando.
- **Jugar**: partidas contra un rival que conoce la teoría y elige una variante distinta cada vez; la partida termina al llegar al medio juego.
- **Videos**: lecciones animadas con voz en español (general, cortos y uno por cada línea).

El progreso se guarda en el navegador de cada dispositivo.

## Agregar o corregir teoría

Todo está en `src/data/openings.ts`. Cada línea es una lista de jugadas en notación inglesa (SAN).
Una jugada con `?` (por ejemplo `8.Qxd4?`) es el error que cae en una trampa: se juega sola y nunca se pide como ejercicio.

Después de editar, validá que todas las jugadas sean legales y mirá cuántos ejercicios hay:

```bash
node scripts/validate.ts
```

## Correr en local

```bash
npm install
npm run dev
```

## Publicar

El repo está conectado a GitHub y Vercel: cada `git push` a `main` publica la app sola en https://aperturas-ajedrez.vercel.app.
