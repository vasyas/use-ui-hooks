[@use-ui/hooks](../README.md) / Form

# Interface: Form<Data\>

Form state + form actions (see [Actions](actions.md), @link [useActions](../README.md#useactions))

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

Current data (derived from initial data + overriden in the input fields)

Defined in: [useForm.tsx:263](https://github.com/vasyas/use-ui-hooks/blob/79a3bd9/src/useForm.tsx#L263)

___

### error

• **error**: *string*

Form action error

Defined in: [useForm.tsx:268](https://github.com/vasyas/use-ui-hooks/blob/79a3bd9/src/useForm.tsx#L268)

___

### fields

• **fields**: *Partial*<{ [FieldName in string \| number \| symbol]: Field}\>

Hash of form fields

Defined in: [useForm.tsx:261](https://github.com/vasyas/use-ui-hooks/blob/79a3bd9/src/useForm.tsx#L261)

___

### progress

• **progress**: *boolean*

True if any of the form actions are in progress now

Defined in: [useForm.tsx:270](https://github.com/vasyas/use-ui-hooks/blob/79a3bd9/src/useForm.tsx#L270)

## Methods

### action

▸ **action**<Params\>(`impl`: *FormActionImpl*<Data, Params\>, `options?`: { `validate`: *boolean*  }): [*ActionFunction*](actionfunction.md)<Params\>

Create form action

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

Defined in: [useForm.tsx:272](https://github.com/vasyas/use-ui-hooks/blob/79a3bd9/src/useForm.tsx#L272)

___

### updateValues

▸ **updateValues**(`update`: *Partial*<Partial<{ [FieldName in string \| number \| symbol]: string}\>\>): *any*

Programmatically change form field values. Triggers validation for updated fields

#### Parameters:

| Name | Type |
| :------ | :------ |
| `update` | *Partial*<Partial<{ [FieldName in string \| number \| symbol]: string}\>\> |

**Returns:** *any*

Defined in: [useForm.tsx:265](https://github.com/vasyas/use-ui-hooks/blob/79a3bd9/src/useForm.tsx#L265)
