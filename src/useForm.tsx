import {useRef, useState} from "react"
import {FieldType, FieldTypeName, getFieldType} from "./fieldTypes"
import {TrackedAction, useAction} from "./useAction"
import {Constraint, enValidateMessages, message} from "./validate"

export function useForm<F>(initialFieldData?: F): Form<F> {
  const [errors, setErrors] = useState<Errors<F>>({})
  const [values, setValues] = useState<Values<F>>({})
  const fieldElements = useRef<FieldElements<F>>({})

  const action = useAction()

  function getActionFields(): F {
    return Object.keys(fieldElements.current).reduce((r, name) => {
      let d

      // is it really good, that undefined means "take from initial" ?
      // there is at least one UC it is bad, so it there would be one more - remove
      if (typeof values[name] != undefined) {
        d = getConfiguredFieldType(name).valueToData(values[name])
      } else {
        d = initialFieldData[name]
      }

      r[name] = d
      return r
    }, {} as F)
  }

  function formAction<P>(impl: FormActionImpl<F, P>, options = {validate: true}): TrackedAction<P> {
    return action.action<P>(async p => {
      if (options.validate && revalidate()) {
        return
      }

      await impl(getActionFields(), p)
    })
  }

  function getFieldValue(name) {
    if (values[name] !== undefined) return values[name]

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
        setValues({
          ...values,
          [name]: s,
        })

        if (errors[name]) updateValidationError(name)
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

  function updateValidationError(name) {
    const error = validate(name)
    setErrors({
      ...errors,
      [name]: error,
    })
  }

  function validate(name) {
    const value = getFieldValue(name)
    return message(fieldElements.current[name].constraint, value, enValidateMessages)
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

    Object.keys(fieldElements.current).forEach(name => {
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
    setValues({
      ...values,
      ...update,
    })

    const updatedErrors = Object.keys(update).reduce((r, name) => {
      return {
        ...r,
        [name]: validate(name),
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
  action<P>(impl: FormActionImpl<F, P>, options?: {validate: boolean}): TrackedAction<P>
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
