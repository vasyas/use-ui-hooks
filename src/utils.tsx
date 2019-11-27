import * as React from "react"
import {useEffect, useRef} from "react"

export function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export function highlight(s: string, term: string): React.ReactFragment {
  if (s && term) {
    s = "" + s

    const parts = s.split(new RegExp(term, "i"))
    if (parts.length == 1) return parts[0]

    const r = []

    let index = 0

    for (const part of parts) {
      if (r.length > 0) {
        const matched = s.substr(index, term.length)
        r.push(
          <span className="hlt" key={index}>
            {matched}
          </span>
        )

        index += term.length
      }

      r.push(part)
      index += part.length
    }

    return r
  }

  return s
}

export function getChildrenText(children) {
  let label = ""

  React.Children.map(children, child => {
    if (typeof child == "string") {
      label += child
    }
  })

  return label
}
