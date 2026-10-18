import { useEffect, useMemo, useState } from 'react'
import { openings } from './data/openings.ts'
import { buildExercises } from './lib/exercises.ts'
import { useProgress } from './lib/progress.ts'
import { ExerciseMode } from './components/ExerciseMode.tsx'
import { LineMode } from './components/LineMode.tsx'

type Mode = 'ejercicios' | 'lineas'

function parseHash(): { id?: string; mode: Mode } {
  const [, id, mode] = window.location.hash.replace(/^#\/?/, '/').split('/')
  return { id: id || undefined, mode: mode === 'lineas' ? 'lineas' : 'ejercicios' }
}

export default function App() {
  const [route, setRoute] = useState(parseHash)
  const { progress, recordExercise, recordLine, reset } = useProgress()

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route.id])

  const opening = openings.find((o) => o.id === route.id)
  const go = (id?: string, mode: Mode = 'ejercicios') => {
    window.location.hash = id ? `/${id}/${mode}` : '/'
  }

  if (!opening) return <Home progress={progress.exercises} linesDone={progress.lines} onOpen={(id) => go(id)} />

  return (
    <div className="app">
      <header className="topbar">
        <button className="back" onClick={() => go()} aria-label="Volver">←</button>
        <div className="topbar-title">
          <h1>{opening.name}</h1>
        </div>
      </header>
      <nav className="tabs">
        <button className={route.mode === 'ejercicios' ? 'on' : ''} onClick={() => go(opening.id, 'ejercicios')}>
          Ejercicios
        </button>
        <button className={route.mode === 'lineas' ? 'on' : ''} onClick={() => go(opening.id, 'lineas')}>
          Líneas completas
        </button>
      </nav>
      <main>
        {route.mode === 'ejercicios' ? (
          <ExerciseMode key={opening.id} opening={opening} stats={progress.exercises} onRecord={recordExercise} />
        ) : (
          <LineMode key={opening.id} opening={opening} linesDone={progress.lines} onComplete={recordLine} />
        )}
      </main>
      <footer className="foot">
        <button
          className="link"
          onClick={() => {
            if (confirm(`¿Borrar tu progreso en ${opening.name}?`)) reset(`${opening.id}`)
          }}
        >
          Reiniciar progreso de esta apertura
        </button>
      </footer>
    </div>
  )
}

function Home({
  progress,
  linesDone,
  onOpen,
}: {
  progress: Record<string, { last: boolean }>
  linesDone: Record<string, number>
  onOpen: (id: string) => void
}) {
  const cards = useMemo(
    () =>
      openings.map((o) => {
        const ex = buildExercises(o)
        const solved = ex.filter((e) => progress[e.id]?.last).length
        const lines = o.lines.length
        const done = Object.keys(linesDone).filter((k) => k.startsWith(`${o.id}/`)).length
        return { o, total: ex.length, solved, lines, done }
      }),
    [progress, linesDone],
  )
  const total = cards.reduce((a, c) => a + c.total, 0)
  const solved = cards.reduce((a, c) => a + c.solved, 0)

  return (
    <div className="app home">
      <header className="hero">
        <div className="logo">♞</div>
        <div>
          <h1>Entrenador de Aperturas</h1>
          <p className="muted">
            {total} ejercicios · {solved} resueltos
          </p>
        </div>
      </header>
      <div className="grid">
        {cards.map(({ o, total, solved, lines, done }) => (
          <button key={o.id} className="card" onClick={() => onOpen(o.id)}>
            <div className="card-top">
              <span className={`side side-${o.side}`} title={o.side === 'w' ? 'Repertorio de Blancas' : 'Repertorio de Negras'} />
              <h2>{o.name}</h2>
            </div>
            <p className="card-desc">{o.description}</p>
            <div className="card-meta">
              <span>{total} ejercicios</span>
              <span>{done}/{lines} líneas</span>
            </div>
            <div className="progress">
              <div style={{ width: `${(solved / total) * 100}%` }} />
            </div>
            <div className="small muted">{solved} resueltos</div>
          </button>
        ))}
      </div>
      <p className="small muted center">Tu progreso se guarda en este dispositivo.</p>
    </div>
  )
}
