import {useCallback, useEffect, useState} from "react"
import {CallOptions, Topic} from "./topics"

export function useRefetchingTopic<Data, Params>(
  topic: Topic<Data, Params>,
  params: Params | false | null | undefined,
  def?: Data,
  opts?: Options
): {
  /** Loaded data or default value */
  data: Data
  /** True if loading request is in progress */
  loading: boolean
  /** Function to refetch data */
  refetch: () => void
} {
  const {resetOnChange, ...callOpts} = opts || {}

  const [data, setData] = useState<Data>(def as any) // intentionally breaking type-safety here for convenience
  const [loading, setLoading] = useState<boolean>(true)
  const [refetch, setRefetch] = useState<number>(0)

  const receiveData = useCallback((data: Data) => {
    setLoading(false)
    setData(data)
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
  }, [refetch])

  return {data, loading, refetch: () => setRefetch(refetch + 1)}
}

type Options = {
  resetOnChange?: boolean
  timeout?: number
}
