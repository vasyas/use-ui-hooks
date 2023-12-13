[@use-ui/hooks](../README.md) / FieldType

# Interface: FieldType<T\>

Convert form data value to a string and back

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Methods

- [dataToValue](FieldType.md#datatovalue)
- [valueToData](FieldType.md#valuetodata)

## Methods

### dataToValue

▸ **dataToValue**(`data`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `T` |

#### Returns

`string`

#### Defined in

[fieldTypes.ts:3](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/fieldTypes.ts#L3)

___

### valueToData

▸ **valueToData**(`value`): ``null`` \| `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `undefined` \| `string` |

#### Returns

``null`` \| `T`

#### Defined in

[fieldTypes.ts:4](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/fieldTypes.ts#L4)
