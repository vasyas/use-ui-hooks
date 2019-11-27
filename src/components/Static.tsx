import * as React from "react"
import {FormGroup, FormGroupProps} from "./FormGroup"
import {getChildrenText} from "../utils"

interface Props extends FormGroupProps {
  children: any
}

export const Static = ({label, invalidFeedback, children}: Props) => (
  <FormGroup label={label} invalidFeedback={invalidFeedback}>
    <input type="text" className="form-control" value={getChildrenText(children)} disabled />
  </FormGroup>
)
