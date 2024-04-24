import {useCallback, useEffect, useState} from "react"
import {CallOptions, Topic} from "./topics"

export function useTopic<Data, Params>(
  topic: Topic<Data, Params>,
  params: Params | false | null | undefined = {} as any,
  def?: Data,
  opts?: Options
): {
  /** Loaded data or default value */
  data: Data
  /** True if loading request is in progress */
  loading: boolean
} {
  const {resetOnChange, ...callOpts} = opts || {}

  const [data, setData] = useState<Data>(def as any) // intentionally breaking type-safety here for convenience
  const [loading, setLoading] = useState<boolean>(false)

  const receiveData = useCallback((data: Data) => {
    setData(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (params) {
      setLoading(true)
      if (callOpts.timeout) {
        topic.subscribe(receiveData, params, new CallOptions({timeout: callOpts.timeout}))
      } else {
        topic.subscribe(receiveData, params)
      }
    }

    return () => {
      if (params) {
        topic.unsubscribe(receiveData, params)
      }

      if (resetOnChange) {
        setData(def as any)
      }
    }
  }, [JSON.stringify(params)])

  return {data, loading}
}

type Options = {
  resetOnChange?: boolean
  timeout?: number
}
