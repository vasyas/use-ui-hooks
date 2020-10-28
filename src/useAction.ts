import {useState} from "react"

export function useAction(): Action {
  const [error, setError] = useState<string>()
  const [progress, setProgress] = useState<number>(null)

  let actionIndex = 0

  function action<P>(impl: ActionImpl<P>) {
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

export interface Action {
  error: string
  progress: boolean
  action<P>(impl: ActionImpl<P>): TrackedAction<P>
}

export type ActionImpl<P> = (p?: P) => Promise<void>

export interface TrackedAction<P> {
  (e?, params?: P): void
  progress: boolean
}
