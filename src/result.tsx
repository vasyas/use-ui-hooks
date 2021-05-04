import * as React from "react"
import {useContext, useEffect, useState} from "react"

const resultContext = React.createContext<Result>(null)

/**
 * Return global {@link Result}, installed via ResultContext.
 *
 * Result is used to set/clear operation results.
 *
 * Result is auto-cleared on history change.
 */
export function useResult(): Result {
  const result = useContext(resultContext)
  return result
}

interface ResultContextProps {
  children: any
  addHistoryChangeListener?(handler: () => void): void
}

/** Install {@link Result}, used to track action results */
export function ResultContext(props: ResultContextProps) {
  const [resultState, setResultState] = useState<Result>({
    result: null,
    setResult: (result) =>
      setResultState({
        result,
        setResult: resultState.setResult,
      }),
  })

  useEffect(() => {
    props.addHistoryChangeListener &&
      props.addHistoryChangeListener(() => {
        resultState.setResult(null)
      })
  }, [])

  return <resultContext.Provider value={resultState}>{props.children}</resultContext.Provider>
}

export interface Result {
  result: string
  setResult(result: string): void
}
