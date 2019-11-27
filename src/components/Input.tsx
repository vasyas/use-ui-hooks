import * as React from "react"
import {useRef} from "react"
import {Constraint} from "../validate"
import {FormGroup, FormGroupProps} from "./FormGroup"
import {Field} from "../useForm"

interface Props extends Partial<Constraint>, FormGroupProps {
  field: Field
  autoFocus?: boolean
  disabled?: boolean
  right?: any
}

export const Input = ({field, label, autoFocus, disabled, right, ...other}: Props) => {
  const ref = useRef<HTMLInputElement>()

  field.setFieldElement({
    constraint: other,
    focus: () => ref.current.focus(),
    blur: () => ref.current.blur(),
  })

  return (
    <FormGroup label={label} invalidFeedback={field.getError()}>
      <input
        type="text"
        className="form-control"
        value={field.getValue()}
        onChange={e => field.setValue(e.target.value)}
        onBlur={field.onBlur}
        onFocus={field.onFocus}
        ref={ref}
        autoFocus={autoFocus}
        disabled={disabled}
      />
      {right}
    </FormGroup>
  )
}
