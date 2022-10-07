import {useEffect, useRef, useState} from "react"
import {FieldType, FieldTypeName, getFieldType} from "./fieldTypes"
import {ActionFunction, useActions} from "./useActions"
import {Constraint, enValidateMessages, message} from "./validate"

/**
 * Store various state related to form processing.
 *
 * Use it in a form component that can edit data in one or more input fields:
 *
 * ```typescript
 * import {useForm} from "@use-ui/hooks"
 * import {Input} from "@use-ui/bootstrap3"
 *
 * interface LoginData {
 *   login: string
 *   password: string
 * }
 *
 * const {fields, progress, action, error} = useForm<LoginData>()
 *
 * const login = action(async ({login, password}: LoginData) => {
 *   await services.auth.login({login, password})
 * })

 * return (
 *   <div>
 *     <Input label="Login" field={fields.login} required autoFocus disabled={progress} />
 *     <Input label="Password" field={fields.password} required autoFocus disabled={progress} />

 *     <Button onClick={login} progress={progress}>
 *       Sign In
 *     </Button>
 *   </div>
 * )
 * ```
 *
 * Form consists of multiple {@link Field}s. Each field has a value and a validation error. Each field is linked to a
 * {@link FieldElement}. {@link FieldElement} is implemented by input component (Input in an example above), and contains information about field's {@link FieldType}
 * and validation {@link Constraint}s.
 *
 * Field value is a string. Form data can be of different types, and {@link FieldType} defines how to convert form data to a field value and back.
 * There are four predefined {@link FieldTypeName}s. Custom field types can also be used.
 *
 * Input components are implemented in a separate libraries, for example [@use-ui/bootstrap3](https://github.com/vasyas/use-ui-bootstrap3).
 *
 * In addition, form creates a set of action, see {@link useActions}. Form action behaves in the same way as in `useActions`, except:
 * 1) Action implementation receives current form data as the first param
 * 2) Actions are not launched if form is invalid.
 *
 * To set initial data for the form fields, pass data as object:
 * ```
 * const form = useForm<LoginData>({login: "my-login"})
 * ```
 *
 * or use async loader function:
 * ```
 * const form = useForm<LoginData>(async () => await fetchInitialData(params))
 * ```
 *
 * @typeParam Data Type of form's data. Form data items can be of any type. Type should be convertible to a string using {@link FieldType} specified via input component.
 * @param dataInitializer  initial data for field values. Either object or async loader functions
 */
export function useForm<Data extends Record<string, unknown>>(
  dataInitializer?: Data | (() => Promise<Data>)
): Form<Data> {
  type FieldName = keyof Data

  const [initialData, setInitialData] = useState<Data | undefined>(
    typeof dataInitializer == "function" ? undefined : dataInitializer
  )

  const [errors, setErrors] = useState<Errors<Data>>({})
  const [values, setValues] = useState<Values<Data>>({})
  const fieldElements = useRef<FieldElements<Data>>({})

  const action = useActions()

  useEffect(() => {
    if (typeof dataInitializer == "function") {
      if (initialData === undefined) {
        dataInitializer().then(setInitialData)
      }
    } else {
      setInitialData(dataInitializer)
    }
  }, [JSON.stringify(dataInitializer)])

  function getActionData(): Data {
    return (Object.keys(fieldElements.current) as Array<FieldName>).reduce((r, name) => {
      let d

      if (typeof values[name] != "undefined") {
        d = getConfiguredFieldType(name).valueToData(values[name])
      } else {
        d = initialData?.[name]
      }

      r[name] = d as any
      return r
    }, {} as Data)
  }

  function formAction<Params>(
    impl: FormActionImpl<Data, Params>,
    options = {validate: true}
  ): ActionFunction<Params> {
    return action.action<Params>(async (p) => {
      if (options.validate && revalidate()) {
        return
      }

      try {
        await impl(getActionData(), p)
      } catch (e: any) {
        if (e.fieldErrors) {
          setErrors({
            ...errors,
            ...e.fieldErrors,
          })
        }

        throw e
      }
    })
  }

  function getFieldValue(name: FieldName, currentValues: Values<Data> = values): string {
    const currentValue = currentValues[name]

    if (currentValue !== undefined) {
      return currentValue
    }

    if (initialData) {
      return getConfiguredFieldType(name).dataToValue(initialData[name])
    }

    return ""
  }

  function getConfiguredFieldType(fieldName: FieldName): FieldType<unknown> {
    const type = fieldElements.current[fieldName]?.type ?? "string"
    return typeof type == "string" ? getFieldType(type) : type
  }

  function createField(name: keyof Data): Field {
    return {
      setFieldElement(fieldElement: FieldElement) {
        fieldElements.current[name] = fieldElement
      },
      getValue() {
        return getFieldValue(name)
      },
      setValue(s: string) {
        setValues((values) => ({...values, [name]: s}))

        // TODO useEffect instead of this, b/c values maybe old?
        const newValues = {
          ...values,
          [name]: s,
        }

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

  function autofixValue(name: keyof Data): boolean {
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

  function updateValidationError(name: keyof Data, currentValues = values) {
    const error = validate(name, currentValues)
    setErrors({
      ...errors,
      [name]: error,
    })
  }

  function validate(name: keyof Data, currentValues = values) {
    const fieldElement = fieldElements.current[name]
    if (!fieldElement) return

    const value = getFieldValue(name, currentValues)
    return message(fieldElement.constraint, value, enValidateMessages)
  }

  function createFields() {
    return new Proxy(
      {},
      {
        get(target: any, name: symbol | string) {
          // skip internal props
          if (typeof name != "string") return target[name]

          return createField(name)
        },
      }
    )
  }

  function createData(): Data {
    const r = initialData ? {...initialData} : ({} as Data)

    for (const name of Object.keys(values) as FieldName[]) {
      r[name] = getConfiguredFieldType(name).valueToData(values[name]) as any
    }

    return r
  }

  function revalidate() {
    const errors: Errors<Data> = {}

    let focused = false

    Object.keys(fieldElements.current).forEach((name: keyof Data) => {
      errors[name] = validate(name)

      if (!focused && errors[name]) {
        fieldElements.current[name]?.focus()
        focused = true
      }
    })

    setErrors(errors)
    return focused
  }

  function updateValues(update: Partial<Values<Data>>) {
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

/** Form state + form actions (see {@link Actions}, @link {@link useActions}) */
export interface Form<Data> {
  /** Hash of form fields */
  fields: Fields<Data>
  /** Current data (derived from initial data + overriden in the input fields) */
  data: Data
  /** Programmatically change form field values. Triggers validation for updated fields */
  updateValues(update: Partial<Values<Data>>): void

  /** Form action error */
  error: string | undefined
  /** True if any of the form actions are in progress now */
  progress: boolean
  /** Create form action */
  action<Params>(
    impl: FormActionImpl<Data, Params>,
    options?: {validate: boolean}
  ): ActionFunction<Params>
}

type Fields<Data> = {[FieldName in keyof Data]: Field}
type Values<Data> = Partial<{[FieldName in keyof Data]: string}>
type Errors<Data> = Partial<{[FieldName in keyof Data]: string}>
type FieldElements<Data> = Partial<{[FieldName in keyof Data]: FieldElement}>

/**
 * Information about field state
 *
 * This object is passed into input components
 */
export interface Field {
  setFieldElement(fieldElement: FieldElement): void
  getValue(): string
  setValue(s: string): void
  onBlur(): void
  onFocus(): void
  getError(): string | undefined
}

/** Input components register themselves in the form using this adapter */
export interface FieldElement {
  constraint: Partial<Constraint>
  type?: FieldTypeName | FieldType<unknown>
  focus(): void
  blur(): void
}

/**
 * Form actions implementation should be of this type
 */
export type FormActionImpl<Fields, Params = void> = (
  fields: Fields,
  params?: Params
) => Promise<unknown>

// To disable validation on special occasions (ie selecting item on custom selects)
let disableBlurValidation = false
