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

Defined in: [useForm.tsx:207](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/useForm.tsx#L207)

___

### error

• **error**: *string*

Defined in: [useForm.tsx:210](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/useForm.tsx#L210)

___

### fields

• **fields**: *Partial*<{ [P in string \| number \| symbol]: Field}\>

Defined in: [useForm.tsx:206](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/useForm.tsx#L206)

___

### progress

• **progress**: *boolean*

Defined in: [useForm.tsx:211](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/useForm.tsx#L211)

## Methods

### action

▸ **action**<P\>(`impl`: *FormActionImpl*<F, P\>, `options?`: { `validate`: *boolean*  }): *TrackedAction*<P\>

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

**Returns:** *TrackedAction*<P\>

Defined in: [useForm.tsx:212](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/useForm.tsx#L212)

___

### updateValues

▸ **updateValues**(`update`: *Partial*<Partial<{ [P in string \| number \| symbol]: string}\>\>): *any*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `update` | *Partial*<Partial<{ [P in string \| number \| symbol]: string}\>\> |

**Returns:** *any*

Defined in: [useForm.tsx:208](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/useForm.tsx#L208)
