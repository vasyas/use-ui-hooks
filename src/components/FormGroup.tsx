import * as React from "react"

export interface FormGroupProps {
  label?: any
  invalidFeedback?: any
}

export const FormGroup = ({
  label = null,
  invalidFeedback = null,
  children,
}: FormGroupProps & {children: any}) => {
  if (label == null) {
    return children
  }

  return (
    <div className="form-group">
      {label && <label className={classNames.label}>{label}</label>}
      <div className={classNames.field}>
        {children}
        {invalidFeedback && <div className="invalid-feedback form-text">{invalidFeedback}</div>}
      </div>
    </div>
  )
}

const classNames = {
  label: "col-md-3",
  field: "col-md-9",
}

export function setFormGroupClassNames(p: Partial<typeof classNames>) {
  Object.assign(classNames, p)
}
