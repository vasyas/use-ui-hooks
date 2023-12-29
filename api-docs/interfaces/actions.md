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

[useActions.ts:69](https://github.com/vasyas/use-ui-hooks/blob/1e890cd/src/useActions.ts#L69)

___

### progress

• **progress**: `boolean`

True if any of the created actions are in progress

#### Defined in

[useActions.ts:73](https://github.com/vasyas/use-ui-hooks/blob/1e890cd/src/useActions.ts#L73)

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

[useActions.ts:71](https://github.com/vasyas/use-ui-hooks/blob/1e890cd/src/useActions.ts#L71)
