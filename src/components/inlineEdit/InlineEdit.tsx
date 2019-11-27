import * as React from "react"
import {CSSProperties, useEffect, useRef, useState} from "react"
import {Field, FieldElement} from "../../useForm"
import {FormGroupProps} from "../FormGroup"

interface Props extends FormGroupProps {
  value: string
  save(value): Promise<void>
  component: (props: FieldComponentProps) => React.ReactElement
  label?: any
  cancel?: boolean
  style?: CSSProperties
}

interface FieldComponentProps {
  field: Field
  right?: any
  label?: any
}

export const InlineEdit = (p: Props) => {
  const props: Props = {
    style: {},
    ...p,
  }

  const fieldElement = useRef<FieldElement>()

  const [edited, setEdited] = useState("")

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function startEditing(e?) {
    e && e.preventDefault()
    setEditing(true)
  }

  async function save(e?) {
    e && e.preventDefault()
    setSaving(true)

    try {
      await props.save(edited)
      stopEditing()
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  function cancel(e?) {
    e && e.preventDefault()
    setEdited(props.value)
    stopEditing()
  }

  function stopEditing() {
    setError(null)
    setEditing(false)
  }

  function onBlur() {
    if (saving || !editing) return
    save()
  }

  function onKeyDown(e) {
    if (e.key == "Enter") return void save(e)
    if (e.key == "Escape") return void cancel(e)
  }

  useEffect(() => {
    setEdited(props.value)
  }, [props.value])

  useEffect(() => {
    if (!editing) {
      fieldElement.current.blur()
    } else {
      fieldElement.current.focus()
    }
  }, [editing])

  function renderControls() {
    if (editing) {
      return (
        <>
          <a href="#" onClick={e => e.preventDefault()} tabIndex={-1}>
            <i className="fa fa-check save" />
          </a>

          {props.cancel && (
            <>
              <div className="delim" />

              <a href="#" onMouseDown={cancel} tabIndex={-1}>
                <i className="fa fa-times cancel" />
              </a>
            </>
          )}
        </>
      )
    }

    return (
      <a href="#" onClick={startEditing} tabIndex={-1}>
        <i className="fa fa-pencil" />
      </a>
    )
  }

  const FieldComponent = props.component

  const field: Field = {
    setFieldElement: fe => (fieldElement.current = fe),
    getValue: () => edited,
    setValue: s => setEdited(s),
    onBlur: onBlur,
    onFocus: startEditing,
    getError: () => error,

    onChange: () => {},
  }

  return (
    <div className="inline-edit" style={props.style}>
      <FieldComponent
        field={field}
        label={props.label}
        right={
          saving ? <Spinner /> : <div className="inline-edit-controls">{renderControls()}</div>
        }
      />
    </div>
  )
}

const Spinner = () => (
  <div className="inline-edit-spinner">
    <div className="lds-spinner" style={{width: "100%", height: "100%"}}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)
