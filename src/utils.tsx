import * as React from "react"
import {useEffect, useRef} from "react"
import {Field} from "./useForm"

export function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

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
