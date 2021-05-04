[@use-ui/hooks](../README.md) / Form

# Interface: Form<F\>

## Type parameters

| Name |
| :------ |
| `F` |

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

• **data**: F

Defined in: [useForm.tsx:210](https://github.com/vasyas/use-ui-hooks/blob/6d6625b/src/useForm.tsx#L210)

___

### error

• **error**: *string*

Defined in: [useForm.tsx:213](https://github.com/vasyas/use-ui-hooks/blob/6d6625b/src/useForm.tsx#L213)

___

### fields

• **fields**: *Partial*<{ [P in string \| number \| symbol]: Field}\>

Defined in: [useForm.tsx:209](https://github.com/vasyas/use-ui-hooks/blob/6d6625b/src/useForm.tsx#L209)

___

### progress

• **progress**: *boolean*

Defined in: [useForm.tsx:214](https://github.com/vasyas/use-ui-hooks/blob/6d6625b/src/useForm.tsx#L214)

## Methods

### action

▸ **action**<P\>(`impl`: *FormActionImpl*<F, P\>, `options?`: { `validate`: *boolean*  }): [*ActionFunction*](actionfunction.md)<P\>

#### Type parameters:

| Name |
| :------ |
| `P` |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `impl` | *FormActionImpl*<F, P\> |
| `options?` | *object* |
| `options.validate` | *boolean* |

**Returns:** [*ActionFunction*](actionfunction.md)<P\>

Defined in: [useForm.tsx:215](https://github.com/vasyas/use-ui-hooks/blob/6d6625b/src/useForm.tsx#L215)

___

### updateValues

▸ **updateValues**(`update`: *Partial*<Partial<{ [P in string \| number \| symbol]: string}\>\>): *any*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `update` | *Partial*<Partial<{ [P in string \| number \| symbol]: string}\>\> |

**Returns:** *any*

Defined in: [useForm.tsx:211](https://github.com/vasyas/use-ui-hooks/blob/6d6625b/src/useForm.tsx#L211)
