import {Topic} from "@push-rpc/core"
import {useRef} from "react"

export function useCachingTopic<D, P = {}, TD = D>(original: Topic<D, P, TD>): Topic<D, P, TD> {
  const cache: {[key: string]: Promise<D>} = useRef({}).current

  const topic: Topic<D, P, TD> = {
    subscribe(consumer, params?, subscriptionKey?) {
      return original.subscribe(consumer, params, subscriptionKey)
    },

    unsubscribe(params?, subscriptionKey?) {
      return original.unsubscribe(params, subscriptionKey)
    },

    trigger(p?) {
      original.trigger(p)
    },

    async get(params?) {
      const key = JSON.stringify(params == undefined ? null : params)

      const id = Math.random()

      if (!cache[key]) {
        cache[key] = original.get(params)
      }

      return cache[key]
    },
  }

  return topic
}
