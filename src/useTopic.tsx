import {Topic} from "@push-rpc/core"
import * as React from "react"
import {useCallback, useEffect, useState} from "react"

export function useTopic<D, P>(
  topic: Topic<D, P>,
  params: P = {} as any,
  def?: D
): {data: D; loading: boolean} {
  const [data, setData] = useState<D>(def)
  const [loading, setLoading] = useState<boolean>(true)

  const receiveData = useCallback(data => {
    setLoading(false)
    setData(data)
  }, [])

  useEffect(() => {
    if (params) {
      setLoading(true)
      topic.subscribe(receiveData, params)
    }

    return () => {
      if (params) {
        topic.unsubscribe(params, receiveData)
      }
    }
  }, [JSON.stringify(params)])

  return {data, loading}
}
