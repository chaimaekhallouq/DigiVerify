import { useCallback, useEffect, useState } from 'react'

// Appelle une fonction asynchrone et suit son état : { data, loading, error, reload }
export function useFetch(fetcher) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError('')
      try {
        const result = await fetcher()
        if (!cancelled) setData(result)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [fetcher, attempt])

  const reload = useCallback(() => setAttempt((n) => n + 1), [])

  return { data, loading, error, reload }
}