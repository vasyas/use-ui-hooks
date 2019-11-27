import * as React from "react"
import {FormGroup, FormGroupProps} from "./FormGroup"

interface Props extends FormGroupProps {
  children: any
}

export const Static = ({label, invalidFeedback, children}: Props) => (
  <FormGroup label={label} invalidFeedback={invalidFeedback}>
    <input type="text" className="form-control" value={children} disabled />
  </FormGroup>
)
