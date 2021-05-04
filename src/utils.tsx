import * as React from "react"
import {useEffect, useRef} from "react"
import {Field} from "./useForm"

/** Return value from previous render */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

/**
 * Create one-time field to be used with input components instead of `useForm`.
 * Typical use case - inline edit:
 * ```
 * <span>Number of rows</span>
 * <Select
 *   field={oneTimeField(
 *       (v) => props.setPageRequest({...props.pageRequest, size: +v}),
 *       "" + props.pageRequest.size
 *   )}
 *   options={["1", "10", "20", "100", "200", "500"]}
 *   required
 * />
 * ```
 *
 * @param accept callback to called when value changes
 * @param value current value
 */
export function oneTimeField(accept: (value: string) => void, value: string = ""): Field {
  return {
    setFieldElement() {},
    getValue() {
      return value
    },
    setValue(s) {
      accept(s)
    },
    onBlur() {},
    onFocus() {},
    getError() {
      return null
    },
  }
}
