import * as React from "react"
import cx from "classnames"
import {useResult} from ".."

export const ActionResult = ({error = undefined}) => {
  const {result} = useResult()

  if (!error && !result) return null

  return (
    <div className={cx("alert", {"alert-danger": !!error, "alert-success": !!result})}>
      {error || result}
    </div>
  )
}
