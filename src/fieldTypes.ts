/** Convert form data value to a string and back */
export interface FieldType<T> {
  dataToValue(data: T)
  valueToData(value: string): T
}

/** Names of pre-defined {@link FieldType}s */
export type FieldTypeName = keyof typeof fieldTypes & string

const fieldTypes: {[name: string]: FieldType<any>} = {
  string: {
    dataToValue: (data: string): string => (data ? data : ""),
    valueToData: (value: string): string => (value ? value : null),
  },

  number: {
    dataToValue: (data: number): string => (data != null ? "" + data : ""),
    valueToData: (value: string): number => (value ? +value : null),
  },

  boolean: {
    dataToValue: (data: boolean): string => (data != null ? "" + data : ""),
    valueToData: (value: string): boolean => (value ? "true" == value : null),
  },

  stringList: {
    dataToValue: (data: string[]): string => (data != null ? data.join(",") : ""),
    valueToData: (value: string): string[] => (value ? value.split(",") : null),
  },

  numberList: {
    dataToValue: (data: number[]): string => (data != null ? data.join(",") : ""),
    valueToData: (value: string): number[] => (value ? value.split(",").map((s) => +s) : null),
  },
}

/** Return FieldType from its name */
export function getFieldType(typeName: FieldTypeName): FieldType<unknown> {
  const type = fieldTypes[typeName]

  if (!type) {
    throw new Error(`Unsupported field type ${typeName} for field ${name}`)
  }

  return type
}
