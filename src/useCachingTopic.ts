import {Topic} from "@push-rpc/core"
import {useRef} from "react"

/**
 * Create a new {@link @push-rpc/core.Topic} that will cache invocations to .get
 *
 * To be used when multiple consumers use the same data from server:
 * ```
 * const {fields} = useForm()
 * const folders = useCachingTopic(services.folders)
 * ..
 * <div>Move files</div>
 * <Select label="From" field={fields.from} topic={folders}/>
 * <Select label="To" field={fields.to} topic={folders}/>
 * ```
 *
 * @param original
 */
export function useCachingTopic<Data, Params = {}, TriggerData = Data>(
  original: Topic<Data, Params, TriggerData>
): Topic<Data, Params, TriggerData> {
  const cache: {[key: string]: Promise<Data>} = useRef({}).current

  const topic: Topic<Data, Params, TriggerData> = {
    subscribe(consumer, params?, subscriptionKey?) {
      return original.subscribe(consumer, params, subscriptionKey)
    },

    unsubscribe(params?, subscriptionKey?) {
      return original.unsubscribe(params, subscriptionKey)
    },

    trigger(p?) {
      original.trigger(p)
    },

    get(params?) {
      const key = JSON.stringify(params == undefined ? null : params)

      if (!cache[key]) {
        cache[key] = original.get(params)
      }

      return cache[key]
    },
  }

  return topic
}
