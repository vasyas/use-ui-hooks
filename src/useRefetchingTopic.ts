import {Topic} from "@push-rpc/core"
import {CallOptions} from "@push-rpc/core/dist/rpc"
import * as React from "react"
import {useCallback, useEffect, useState} from "react"

/**
 * Async load data from backend using [push-rpc](https://github.com/vasyas/push-rpc).
 *
 * ```typescript
 * const {data, refetch} = useRefetchingTopic(services.client, {
 *   pk: session.user.clientPk
 * })
 *
 * const onButtonClick = () => {
 *  refetch()
 * }
 * ```
 *
 * In this example `useRefetchingTopic` will subscribe to topic `services.client` on mount and
 * will unsubscribe from it on unmount (much like useEffect works). On every click on button, data will be refetched.
 *
 * If `params` are falsy, no subscription will be performed. This is useful to skip subscription until "parent" data is loaded.
 *
 * `useRefetchingTopic` will re-subscribe topic on changing `refetch` by calling `refetch()`. In the example above, when `refetch()` is called
 * topic will be resubscribed. When re-subscribing, `useRefetchingTopic` will convert params to JSON strings, so it is ok
 * to use inline objects as params.
 *
 * @typeParam Data Data type that topic should return
 * @typeParam Params Type of parameters that topic should accept
 *
 * @param topic  Push-RPC Topic to load data
 * @param params  params to send to topic
 * @param def  default value to use until data is loaded, undefined by default
 * @param opts  Invocation options
 */
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
      topic.subscribe(receiveData, params, undefined, callOpts)
    }

    return () => {
      if (params) {
        topic.unsubscribe(params, receiveData)
      }

      if (resetOnChange) {
        setData(def as any)
      }
    }
  }, [refetch])

  return {data, loading, refetch: () => setRefetch(refetch + 1)}
}

type Options = CallOptions & {
  resetOnChange?: boolean
}
