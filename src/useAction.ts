import {useState} from "react"

export function useAction<P>(): Action<P> {
  const [error, setError] = useState<string>()
  const [progress, setProgress] = useState(false)

  function action(impl: ActionImpl<P>) {
    return async (e?, params?: P) => {
      e && e.preventDefault && e.preventDefault()

      try {
        setProgress(true)
        setError(null)

        await impl(params)
      } catch (e) {
        setError(e.message)
      } finally {
        setProgress(false)
      }
    }
  }

  return {
    error,
    progress,
    action,
  }
}

type ActionImpl<P> = (p?: P) => Promise<void>

export interface Action<P> {
  error: string
  progress: boolean
  action(impl: ActionImpl<P>): (e?, params?: P) => void
}
