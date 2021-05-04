import {useRef, useState, useEffect} from "react"
import {FieldType, FieldTypeName, getFieldType} from "./fieldTypes"
import {ActionFunction, useActions} from "./useActions"
import {Constraint, enValidateMessages, message} from "./validate"

export function useForm<F>(initialFieldData?: F): Form<F> {
  const [errors, setErrors] = useState<Errors<F>>({})
  const [values, setValues] = useState<Values<F>>({})
  const fieldElements = useRef<FieldElements<F>>({})

  const action = useActions()

  function getActionFields(): F {
    return Object.keys(fieldElements.current).reduce((r, name) => {
      let d

      if (typeof values[name] != "undefined") {
        d = getConfiguredFieldType(name).valueToData(values[name])
      } else {
        d = initialFieldData[name]
      }

      r[name] = d
      return r
    }, {} as F)
  }

  function formAction<P>(
    impl: FormActionImpl<F, P>,
    options = {validate: true}
  ): ActionFunction<P> {
    return action.action<P>(async (p) => {
      if (options.validate && revalidate()) {
        return
      }

      await impl(getActionFields(), p)
    })
  }

  function getFieldValue(name, currentValues = values) {
    if (currentValues[name] !== undefined) return currentValues[name]

    if (initialFieldData) {
      return getConfiguredFieldType(name).dataToValue(initialFieldData[name])
    }

    return ""
  }

  function getConfiguredFieldType(name): FieldType<any> {
    const type = fieldElements.current[name]?.type ?? "string"
    return typeof type == "string" ? getFieldType(type) : type
  }

  function createField(name): Field {
    return {
      setFieldElement(fieldElement: FieldElement) {
        fieldElements.current[name] = fieldElement
      },
      getValue() {
        return getFieldValue(name)
      },
      setValue(s: string) {
        const newValues = {
          ...values,
          [name]: s,
        }

        setValues(newValues)

        if (errors[name]) updateValidationError(name, newValues)
      },
      getError() {
        return errors[name]
      },
      onBlur() {
        const fixed = autofixValue(name)

        const revalidate = () => {
          if (!disableBlurValidation) updateValidationError(name)
        }

        if (fixed) {
          setTimeout(revalidate)
        } else {
          revalidate()
        }
      },
      onFocus() {},
    }
  }

  function autofixValue(name) {
    /*
    const value = this.getValue()
    const {name} = this.props

    if (typeof value == "string") {
      const trimmed = value.trim()

      if (trimmed != value) {
        const data = this.getDataType().toData(trimmed)
        this.context.form.updateInput(name, trimmed, data)
        return true
      }
    }
     */
    return false
  }

  function updateValidationError(name, currentValues = values) {
    const error = validate(name, currentValues)
    setErrors({
      ...errors,
      [name]: error,
    })
  }

  function validate(name, currentValues = values) {
    const fieldElement = fieldElements.current[name]
    if (!fieldElement) return

    const value = getFieldValue(name, currentValues)
    return message(fieldElement.constraint, value, enValidateMessages)
  }

  function createFields() {
    return new Proxy(
      {},
      {
        get(target, name) {
          // skip internal props
          if (typeof name != "string") return target[name]

          return createField(name)
        },
      }
    )
  }

  function createData(): F {
    const r = {...initialFieldData}

    for (const name of Object.keys(values)) {
      r[name] = getConfiguredFieldType(name).valueToData(values[name])
    }

    return r
  }

  function revalidate() {
    const errors = {}

    let focused = false

    Object.keys(fieldElements.current).forEach((name) => {
      errors[name] = validate(name)

      if (!focused && errors[name]) {
        fieldElements.current[name].focus()
        focused = true
      }
    })

    setErrors(errors)
    return focused
  }

  function updateValues(update: Partial<Values<F>>) {
    const newValues = {
      ...values,
      ...update,
    }

    setValues(newValues)

    const updatedErrors = Object.keys(update).reduce((r, name) => {
      return {
        ...r,
        [name]: validate(name, newValues),
      }
    }, {})

    setErrors({
      ...errors,
      ...updatedErrors,
    })
  }

  // use ref for fields and data?
  const fields = createFields()
  const data = createData()

  // console.log("Form render", JSON.parse(JSON.stringify({data, values, errors})))

  return {
    fields,
    data,
    updateValues,

    error: action.error,
    progress: action.progress,
    action: formAction,
  }
}

export interface Form<F> {
  fields: Fields<F>
  data: F
  updateValues(update: Partial<Values<F>>)

  error: string
  progress: boolean
  action<P>(impl: FormActionImpl<F, P>, options?: {validate: boolean}): ActionFunction<P>
}

type Values<F> = Partial<{[P in keyof F]: string}>
type Errors<F> = Partial<{[P in keyof F]: string}>
type Fields<F> = Partial<{[P in keyof F]: Field}>
type FieldElements<F> = Partial<{[P in keyof F]: FieldElement}>

export interface Field {
  setFieldElement(fieldElement: FieldElement): void
  getValue(): string
  setValue(s: string)
  onBlur(): void
  onFocus(): void
  getError(): string
}

export interface FieldElement {
  constraint: Partial<Constraint>
  type?: FieldTypeName | FieldType<unknown>
  focus(): void
  blur(): void
}

export type FormActionImpl<F, P = void> = (fields: F, p?: P) => Promise<void>

// To disable validation on special occasions (ie selecting item on custom selects)
let disableBlurValidation = false
