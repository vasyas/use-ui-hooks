import {useRef, useState} from "react"
import {Constraint, enValidateMessages, message} from "./validate"
import {useAction} from "./useAction"

export function useForm<F>(initialFieldData?: F): Form<F> {
  const [errors, setErrors] = useState<Errors<F>>({})
  const [values, setValues] = useState<Values<F>>({})
  const fieldElements = useRef<Values<F>>({})

  const action = useAction()

  function valueToData(name, value: string): any {
    return value ? value : null
  }

  function dataToValue(name, data: any): string {
    return data ? data : ""
  }

  function getActionFields(): F {
    return Object.keys(fieldElements.current).reduce((r, name) => {
      let d

      if (typeof values[name] != undefined) {
        // TODO convert to value using data type (pass type)
        d = +values[name]
      } else {
        d = initialFieldData[name]
      }

      r[name] = d
      return r
    }, {} as F)
  }

  function formAction(impl: FormActionImpl<F>) {
    return action.action(async () => {
      if (revalidate()) {
        return
      }

      await impl(getActionFields())
    })
  }

  function getFieldValue(name) {
    if (values[name]) return values[name]

    if (initialFieldData) {
      return dataToValue(name, initialFieldData[name])
    }

    return ""
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

  function createData(): any {
    const r = {...initialFieldData}

    for (const name of Object.keys(values)) {
      r[name] = valueToData(name, values[name])
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

  // use ref for fields and data?
  const fields = createFields()
  const data = createData()

  return {
    fields,
    data,

    error: action.error,
    progress: action.progress,
    action: formAction,
  }
}

export interface Form<F> {
  fields: Fields<F>
  data: F

  error: string
  progress: boolean
  action(impl: FormActionImpl<F>): () => void
}

type Values<F> = Partial<{[P in keyof F]: string}>
type Errors<F> = Partial<{[P in keyof F]: string}>
type Fields<F> = Partial<{[P in keyof F]: Field}>

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
  focus(): void
  blur(): void
}

type FormActionImpl<F> = (fields: F) => Promise<void>

// To disable validation on special occasions (ie selecting item on custom selects)
let disableBlurValidation = false
