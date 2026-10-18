import { useCallback, useState } from 'react'

export interface ExerciseStat {
  ok: number
  fail: number
  /** true si la última vez se resolvió al primer intento */
  last: boolean
}

interface Progress {
  exercises: Record<string, ExerciseStat>
  lines: Record<string, number>
}

const KEY = 'aperturas-ajedrez:v1'

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Progress
  } catch {
    // almacenamiento no disponible: se empieza de cero
  }
  return { exercises: {}, lines: {} }
}

function save(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    // ignorar
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)

  const update = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((prev) => {
      const next = fn(prev)
      save(next)
      return next
    })
  }, [])

  const recordExercise = useCallback(
    (id: string, firstTry: boolean) =>
      update((p) => {
        const s = p.exercises[id] ?? { ok: 0, fail: 0, last: false }
        return {
          ...p,
          exercises: {
            ...p.exercises,
            [id]: { ok: s.ok + (firstTry ? 1 : 0), fail: s.fail + (firstTry ? 0 : 1), last: firstTry },
          },
        }
      }),
    [update],
  )

  const recordLine = useCallback(
    (id: string) => update((p) => ({ ...p, lines: { ...p.lines, [id]: (p.lines[id] ?? 0) + 1 } })),
    [update],
  )

  const reset = useCallback((prefix: string) => {
    update((p) => ({
      exercises: Object.fromEntries(Object.entries(p.exercises).filter(([k]) => !k.startsWith(prefix))),
      lines: Object.fromEntries(Object.entries(p.lines).filter(([k]) => !k.startsWith(prefix))),
    }))
  }, [update])

  return { progress, recordExercise, recordLine, reset }
}
