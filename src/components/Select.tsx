import * as React from "react"
import {useEffect, useRef, useState} from "react"
import AsyncSelect from "react-select/async"
import "react-bootstrap-typeahead/css/Typeahead.css"
import {Topic} from "push-rpc"
import {components} from "react-select"
import {highlight} from "../utils"
import {Constraint} from "../validate"
import {Field} from "../useForm"
import {FormGroup, FormGroupProps} from "./FormGroup"

interface Option {
  value: string
  label: string
}

interface Props<D, P> extends Partial<Constraint>, FormGroupProps {
  field: Field

  topic?: Topic<D[], P>
  params?: P
  map?: (D) => Option

  options?: Option[] | object
  right?: any
}

export function Select<D, P>({
  label,
  field,

  topic,
  params,
  map = i => i as any,

  options,
  right,

  ...other
}: Props<D, P>) {
  if (!options && !topic) {
    throw new Error("Either options or topic is required for Select")
  }

  const optionsArray = getOptionsArray(options, map)

  const ref = useRef<HTMLInputElement>()
  const [loading, setLoading] = useState<boolean>(false)
  const [cachedOptions, setCachedOptions] = useState<Option[]>([])
  const [selected, setSelected] = useState<Option[]>([])
  const [inputValue, setInputValue] = useState<string>("")

  async function loadOptions(inputValue) {
    let options = optionsArray

    if (!options) {
      setLoading(true)

      try {
        const items = await topic.get(params)
        options = items.map(map)
      } finally {
        setLoading(false)
      }
    }

    setCachedOptions(options)
    return options
  }

  // set selected option
  useEffect(() => {
    const value = field.getValue()
    const selected = cachedOptions.filter(o => o.value == value)

    setSelected(selected)
  }, [cachedOptions, field.getValue()])

  function onChange(val) {
    if (Array.isArray(val) && !val.length) {
      // https://github.com/JedWatson/react-select/issues/2682
      val = ""
    }

    field.setValue(val ? val.value : "")
  }

  field.setFieldElement({
    constraint: other,
    focus: () => ref.current && ref.current.focus(),
    blur: () => ref.current.blur && ref.current.blur(),
  })

  return (
    <FormGroup label={label} invalidFeedback={field.getError()}>
      <AsyncSelect
        className="select"
        key={JSON.stringify(params) + "-" + JSON.stringify(options)}
        ref={ref}
        styles={styles}
        menuPortalTarget={document.getElementById("popupTarget")}
        menuShouldBlockScroll={true}
        classNamePrefix="select"
        menuPlacement="auto"
        defaultOptions
        components={{
          Option: props => <HighlightingOption {...props} inputValue={inputValue} />,
        }}
        isLoading={loading}
        value={selected}
        loadOptions={loadOptions}
        onInputChange={val => setInputValue(val)}
        onBlur={field.onBlur}
        onFocus={field.onFocus}
        onChange={onChange}
      />
      {right}
    </FormGroup>
  )
}

const styles = {
  control: ({isDisabled, isFocused}) => ({}),
  valueContainer: () => ({
    display: "flex",
    flex: 1,
    overflow: "hidden",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  input: () => ({}),
}

const HighlightingOption = props => {
  const {label, inputValue, value, ...other} = props

  return (
    <components.Option label={label} {...other}>
      {highlight(label, inputValue)}
    </components.Option>
  )
}

function getOptionsArray(options, map): Option[] {
  if (!options) return options

  // const {allOption, allOptionLabel} = props

  if (!Array.isArray(options)) {
    options = Object.keys(options || {}).map(value => ({
      value,
      label: options[value],
    }))
  }

  options = (options as any[]).map(o =>
    typeof o == "string"
      ? {
          value: o,
          label: o,
        }
      : o
  )

  options = options.map(map)

  /*
  if (allOption) {
    options = [
      {
        value: "",
        label: allOptionLabel,
      },
      ...options,
    ]
  }
   */

  return options
}
