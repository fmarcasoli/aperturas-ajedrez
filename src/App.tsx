import { useEffect, useMemo, useState } from 'react'
import { openings } from './data/openings.ts'
import { buildExercises } from './lib/exercises.ts'
import { useProgress } from './lib/progress.ts'
import { ExerciseMode } from './components/ExerciseMode.tsx'
import { LineMode } from './components/LineMode.tsx'
import { LessonPlayer, LessonsTab } from './components/Lessons.tsx'
import { intro, lessonsByOpening } from './data/lessons/index.ts'
import { lineLessons } from './lib/lineLessons.ts'

type Mode = 'ejercicios' | 'lineas' | 'videos'

function parseHash(): { id?: string; mode: Mode; lesson?: string } {
  const [, id, mode, lesson] = window.location.hash.replace(/^#\/?/, '/').split('/')
  return {
    id: id || undefined,
    mode: mode === 'lineas' || mode === 'videos' ? mode : 'ejercicios',
    lesson: lesson ? decodeURIComponent(lesson) : undefined,
  }
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

  if (route.id === 'intro')
    return (
      <div className="app">
        <header className="topbar">
          <button className="back" onClick={() => go()} aria-label="Volver">←</button>
          <div className="topbar-title">
            <h1>Video de introducción</h1>
          </div>
        </header>
        <main>
          <LessonPlayer lesson={intro} onBack={() => go()} backLabel="← Inicio" />
        </main>
      </div>
    )

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
          Líneas
        </button>
        <button className={route.mode === 'videos' ? 'on' : ''} onClick={() => go(opening.id, 'videos')}>
          🎬 Videos
        </button>
      </nav>
      <main>
        {route.mode === 'ejercicios' && (
          <ExerciseMode key={opening.id} opening={opening} stats={progress.exercises} onRecord={recordExercise} />
        )}
        {route.mode === 'lineas' && (
          <LineMode
            key={opening.id}
            opening={opening}
            linesDone={progress.lines}
            onComplete={recordLine}
            onVideo={(lineId) => {
              window.location.hash = `/${opening.id}/videos/${encodeURIComponent(`linea:${lineId}`)}`
            }}
          />
        )}
        {route.mode === 'videos' && (
          <LessonsTab
            key={`${opening.id}-${route.lesson ?? ''}`}
            lessons={lessonsByOpening[opening.id] ?? []}
            lineLessons={lineLessons(opening)}
            initialId={route.lesson}
          />
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
      <a className="intro-card" href="#/intro">
        <span className="lesson-play">▶</span>
        <span>
          <b>Empezá acá: los principios de las aperturas</b>
          <span className="small muted"> Video con voz · cada apertura tiene además su video general y videos cortos.</span>
        </span>
      </a>
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
              <span>{done}/{lines} líneas · 🎬 {lessonsByOpening[o.id]?.length ?? 0}</span>
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
