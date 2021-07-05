export interface Constraint {
  required: boolean
  integer: boolean
  number: boolean
  nonNegative: boolean
}

export function message(
  constraint: Partial<Constraint>,
  value: string,
  validateMessages: ValidateMessages
) {
  if (!constraint) return

  const {required, integer, number, nonNegative, ...otherConstraints} = constraint

  if (value == null) value = ""

  if (required) {
    if (value == "") return validateMessages.required
  }

  if (value == "") return // by default field is not required

  if (integer && !validInteger(value)) return validateMessages.integer
  if (number && !validNumber(value)) return validateMessages.number
  if (nonNegative && +value < 0) return validateMessages.nonNegative

  for (const key of Object.keys(otherConstraints)) {
    if (customValidators[key]) {
      const message = customValidators[key](value, otherConstraints[key])

      if (message) return message
    }
  }
}

export function validInteger(s) {
  return /^[0-9]*$/.test(s)
}

export function validNumber(s) {
  return !isNaN(s)
}

export const enValidateMessages = {
  required: "Field required",
  integer: "Integers only",
  number: "Numbers only",
  nonNegative: "Numbers only",
}

export type ValidateMessages = typeof enValidateMessages

/**
 * Function that could be called to validate form values.
 *
 * @param value form field value
 * @param propertyValue value of the field component property
 * @return null if not errors or error message is validator fails
 */
export type Validator = (value: string, propertyValue: any) => string

/**
 * Register new custom validator.
 * Registered validators could be used by referencing propertyKeys
 * Be careful not to use propertyKeys that could mess with other propeties, ie `children`.
 *
 * @param propertyKey property name to request vaidation, ie `amount`: `<Input required amount field={form.amount}/>`
 * @param validator function that will run validation
 */
export function addValidator(propertyKey: string, validator: Validator) {
  customValidators[propertyKey] = validator
}

const customValidators: {[key: string]: Validator} = {}
