import {Topic} from "@push-rpc/core"
import * as React from "react"
import {useCallback, useEffect, useState} from "react"

export function useTopic<D, P>(
  topic: Topic<D, P>,
  params: P = {} as any,
  def: Partial<D> = undefined
): {data: Partial<D>} {
  const [data, setData] = useState<Partial<D>>(def)

  const receiveData = useCallback(data => {
    setData(data)
  }, [])

  useEffect(() => {
    if (params) {
      topic.subscribe(receiveData, params)
    }

    return () => {
      if (params) {
        topic.unsubscribe(params, receiveData)
      }
    }
  }, [JSON.stringify(params)])

  return {data}
}
