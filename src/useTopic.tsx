import {useCallback, useEffect, useState} from "react"
import {CallOptions, Topic} from "./topics"

export function useTopic<Data, Params>(
  topic: Topic<Data, Params>,
  params: Params | false | null | undefined,
  def?: Data,
  opts?: Options
): {
  /** Loaded data or default value */
  data: Data
  /** True if loading request is in progress */
  loading: boolean
} {
  const {resetOnChange, subscribe = true, ...callOpts} = opts || {}

  const cachedData = params ? getCachedTopic(topic.itemName, [params]) : undefined

  const [data, setData] = useState<Data>(cachedData ?? (def as any)) // intentionally breaking type-safety here for convenience
  const [loading, setLoading] = useState<boolean>(!cachedData)

  const receiveData = useCallback((data: Data) => {
    setData(data)
    setLoading(false)
  }, [])

  const errorHandler = useCallback((e: any) => {
    // ignore error, just mark loading ended
    setLoading(false)
  }, [])

  useEffect(() => {
    if (params) {
      setLoading(true)

      if (subscribe) {
        if (callOpts.timeout) {
          topic
            .subscribe(receiveData, params, new CallOptions({timeout: callOpts.timeout}))
            .catch(errorHandler)
        } else {
          topic.subscribe(receiveData, params).catch(errorHandler)
        }
      } else {
        topic(params).then(receiveData).catch(errorHandler)
      }
    }

    return () => {
      if (subscribe && params) {
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
  subscribe?: boolean
}

export type GetCachedTopic = (itemName: string, parameters: unknown[]) => unknown

let getCachedTopic: GetCachedTopic = () => undefined

export function setTopicCache(t: GetCachedTopic) {
  getCachedTopic = t
}
