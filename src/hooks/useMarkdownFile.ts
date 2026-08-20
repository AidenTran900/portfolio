import { useEffect, useState } from 'react'

type MarkdownState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'loaded'; content: string }
  | { status: 'error' }

// Assumes the caller remounts (e.g. via `key={slug}`) when `path` should
// change to a different document — this hook does not reset state on its own.
export function useMarkdownFile(path?: string): MarkdownState {
  const [state, setState] = useState<MarkdownState>(path ? { status: 'loading' } : { status: 'idle' })

  useEffect(() => {
    if (!path) return

    const controller = new AbortController()

    fetch(path, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`)
        return res.text()
      })
      .then((content) => setState({ status: 'loaded', content }))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setState({ status: 'error' })
      })

    return () => controller.abort()
  }, [path])

  return state
}
