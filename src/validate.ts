export interface Constraint {
  required: boolean
  integer: boolean
  number: boolean
  nonNegative: boolean
}

export function message(constraint: Constraint, value: any, validateMessages: ValidateMessages) {
  if (!constraint) return

  if (value == null) value = ""

  if (constraint.required) {
    if (value == "") return validateMessages.required
  }

  if (value == "") return // by default field is not required

  if (constraint.integer && !integer(value)) return validateMessages.integer
  if (constraint.number && !number(value)) return validateMessages.number
  if (constraint.nonNegative && +value < 0) return validateMessages.nonNegative
}

export function integer(s) {
  return /^[0-9]*$/.test(s)
}

export function number(s) {
  return !isNaN(s)
}

export const enValidateMessages = {
  required: "Field required",
  integer: "Integers only",
  number: "Numbers only",
  nonNegative: "Numbers only",
}

export type ValidateMessages = typeof enValidateMessages
