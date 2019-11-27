import {Topic} from "push-rpc"
import * as React from "react"
import {useCallback, useEffect, useState} from "react"

export function useTopic<D, P>(topic: Topic<D, P>, params: P = null): {data: D} {
  const [data, setData] = useState<D>()

  const receiveData = useCallback(data => {
    setData(data)
  }, [])

  useEffect(() => {
    topic.subscribe(receiveData, params)

    return () => {
      topic.unsubscribe(params, receiveData)
    }
  }, [JSON.stringify(params)])

  return {data}
}
