export interface Constraint {
  required: boolean
  integer?: boolean
}

export function message(constraint: Constraint, value: any, validateMessages: ValidateMessages) {
  if (!constraint) return

  if (value == null) value = ""

  if (constraint.required) {
    if (value == "") return validateMessages.required
  }

  if (value == "") return // by default field is not required

  if (constraint.integer) if (!integer(value)) return validateMessages.integer
}

export function integer(s) {
  return /^[0-9]*$/.test(s)
}

export const enValidateMessages = {
  required: "Field required",
  integer: "Numbers only",
}

export type ValidateMessages = typeof enValidateMessages
