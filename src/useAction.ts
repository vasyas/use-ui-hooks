import {useState} from "react"

export function useAction<P>(): Action<P> {
  const [error, setError] = useState<string>()
  const [progress, setProgress] = useState<number>(null)

  let actionIndex = 0

  function action(impl: ActionImpl<P>) {
    actionIndex++

    const thisActionIndex = actionIndex

    const trackedAction: TrackedAction<P> = (async (e?, params?: P) => {
      e && e.preventDefault && e.preventDefault()

      try {
        setProgress(thisActionIndex)
        setError(null)

        await impl(params)
      } catch (e) {
        setError(e.message)
      } finally {
        setProgress(null)
      }
    }) as any

    trackedAction.progress = progress == thisActionIndex

    return trackedAction
  }

  return {
    error,
    progress: !!progress,
    action: action as any,
  }
}

type ActionImpl<P> = (p?: P) => Promise<void>

export interface Action<P> {
  error: string
  progress: boolean
  action(impl: ActionImpl<P>): TrackedAction<P>
}

export interface TrackedAction<P> {
  (e?, params?: P): void
  progress: boolean
}
