[@use-ui/hooks](../README.md) / Form

# Interface: Form<Data\>

## Type parameters

| Name |
| :------ |
| `Data` |

## Table of contents

### Properties

- [data](form.md#data)
- [error](form.md#error)
- [fields](form.md#fields)
- [progress](form.md#progress)

### Methods

- [action](form.md#action)
- [updateValues](form.md#updatevalues)

## Properties

### data

• **data**: Data

Defined in: [useForm.tsx:256](https://github.com/vasyas/use-ui-hooks/blob/cca03e8/src/useForm.tsx#L256)

___

### error

• **error**: *string*

Defined in: [useForm.tsx:259](https://github.com/vasyas/use-ui-hooks/blob/cca03e8/src/useForm.tsx#L259)

___

### fields

• **fields**: *Partial*<{ [FieldName in string \| number \| symbol]: Field}\>

Defined in: [useForm.tsx:255](https://github.com/vasyas/use-ui-hooks/blob/cca03e8/src/useForm.tsx#L255)

___

### progress

• **progress**: *boolean*

Defined in: [useForm.tsx:260](https://github.com/vasyas/use-ui-hooks/blob/cca03e8/src/useForm.tsx#L260)

## Methods

### action

▸ **action**<Params\>(`impl`: *FormActionImpl*<Data, Params\>, `options?`: { `validate`: *boolean*  }): [*ActionFunction*](actionfunction.md)<Params\>

#### Type parameters:

| Name |
| :------ |
| `Params` |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `impl` | *FormActionImpl*<Data, Params\> |
| `options?` | *object* |
| `options.validate` | *boolean* |

**Returns:** [*ActionFunction*](actionfunction.md)<Params\>

Defined in: [useForm.tsx:261](https://github.com/vasyas/use-ui-hooks/blob/cca03e8/src/useForm.tsx#L261)

___

### updateValues

▸ **updateValues**(`update`: *Partial*<Partial<{ [FieldName in string \| number \| symbol]: string}\>\>): *any*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `update` | *Partial*<Partial<{ [FieldName in string \| number \| symbol]: string}\>\> |

**Returns:** *any*

Defined in: [useForm.tsx:257](https://github.com/vasyas/use-ui-hooks/blob/cca03e8/src/useForm.tsx#L257)
