import {useState} from "react"

/**
 * Hook that wraps async functions invocation (ie remote method) in try/catch/finally,
 * maintaining `progress` and `error` state.
 *
 *```typescript
 * const {error, action} = useActions()

 * const create = action(async () => {
 *   await service.user.create()
 * })

 * return (
 *   <div>
 *     {error && <div>{error}</div>}
 *     <button onClick={create} disabled={create.progress}>Create</button>
 *   </div>
 * )
 * ```

 * In addition, action functions calls preventDefault for its first parameter, which makes it handy to use in `a` elements:
 * ```
 * <a href="#" onClick={create}>Create</a>
 * ```
 */
export function useActions(): Actions {
  const [error, setError] = useState<string>()
  const [progress, setProgress] = useState<number>(null)

  let actionIndex = 0

  function action<P>(impl: ActionImpl<P>) {
    actionIndex++

    const thisActionIndex = actionIndex

    const trackedAction: ActionFunction<P> = (async (e?, params?: P) => {
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

/** Factory for creating actions and information about last error */
export interface Actions {
  /** Last action error */
  error: string
  /** Create action function from implementation */
  action<Params>(impl: ActionImpl<Params>): ActionFunction<Params>
  /** True if any of the created actions are in progress */
  progress: boolean
}

/** Action implementations should be async and accept at most one parameter */
export type ActionImpl<Params> = (p?: Params) => Promise<void>

export interface ActionFunction<P> {
  /** Start async action */
  (e?, params?: P): void
  /** This if this action is in progress */
  progress: boolean
}
