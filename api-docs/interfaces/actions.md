[@use-ui/hooks](../README.md) / Actions

# Interface: Actions

Factory for creating actions and information about last error

## Table of contents

### Properties

- [error](Actions.md#error)
- [progress](Actions.md#progress)

### Methods

- [action](Actions.md#action)

## Properties

### error

• **error**: `undefined` \| `string`

Last action error

#### Defined in

[useActions.ts:68](https://github.com/vasyas/use-ui-hooks/blob/9c0eb7b/src/useActions.ts#L68)

___

### progress

• **progress**: `boolean`

True if any of the created actions are in progress

#### Defined in

[useActions.ts:72](https://github.com/vasyas/use-ui-hooks/blob/9c0eb7b/src/useActions.ts#L72)

## Methods

### action

▸ **action**<`Params`\>(`impl`): [`ActionFunction`](ActionFunction.md)<`Params`\>

Create action function from implementation

#### Type parameters

| Name |
| :------ |
| `Params` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `impl` | [`ActionImpl`](../README.md#actionimpl)<`Params`\> |

#### Returns

[`ActionFunction`](ActionFunction.md)<`Params`\>

#### Defined in

[useActions.ts:70](https://github.com/vasyas/use-ui-hooks/blob/9c0eb7b/src/useActions.ts#L70)
