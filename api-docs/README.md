@use-ui/hooks

# @use-ui/hooks

## Table of contents

### Interfaces

- [Constraint](interfaces/constraint.md)
- [Field](interfaces/field.md)
- [FieldElement](interfaces/fieldelement.md)
- [FieldType](interfaces/fieldtype.md)
- [Form](interfaces/form.md)

### Type aliases

- [FieldTypeName](README.md#fieldtypename)
- [ValidateMessages](README.md#validatemessages)

### Functions

- [ResultContext](README.md#resultcontext)
- [getFieldType](README.md#getfieldtype)
- [oneTimeField](README.md#onetimefield)
- [useAction](README.md#useaction)
- [useCachingTopic](README.md#usecachingtopic)
- [useForm](README.md#useform)
- [usePrevious](README.md#useprevious)
- [useResult](README.md#useresult)
- [useTopic](README.md#usetopic)

## Type aliases

### FieldTypeName

Ƭ **FieldTypeName**: keyof *typeof* fieldTypes

Defined in: [fieldTypes.ts:6](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/fieldTypes.ts#L6)

___

### ValidateMessages

Ƭ **ValidateMessages**: *typeof* enValidateMessages

Defined in: [validate.ts:43](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/validate.ts#L43)

## Functions

### ResultContext

▸ **ResultContext**(`props`: ResultContextProps): *Element*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `props` | ResultContextProps |

**Returns:** *Element*

Defined in: [result.tsx:16](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/result.tsx#L16)

___

### getFieldType

▸ **getFieldType**(`typeName`: *any*): [*FieldType*](interfaces/fieldtype.md)<any\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `typeName` | *any* |

**Returns:** [*FieldType*](interfaces/fieldtype.md)<any\>

Defined in: [fieldTypes.ts:30](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/fieldTypes.ts#L30)

___

### oneTimeField

▸ **oneTimeField**(`accept`: (`value`: *string*) => *void*, `value?`: *string*): [*Field*](interfaces/field.md)

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `accept` | (`value`: *string*) => *void* | - |
| `value` | *string* | "" |

**Returns:** [*Field*](interfaces/field.md)

Defined in: [utils.tsx:13](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/utils.tsx#L13)

___

### useAction

▸ **useAction**(): Action

**Returns:** Action

Defined in: [useAction.ts:3](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/useAction.ts#L3)

___

### useCachingTopic

▸ **useCachingTopic**<D, P, TD\>(`original`: *Topic*<D, P, TD\>): *Topic*<D, P, TD\>

#### Type parameters:

| Name | Default |
| :------ | :------ |
| `D` | - |
| `P` | {} |
| `TD` | D |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `original` | *Topic*<D, P, TD\> |

**Returns:** *Topic*<D, P, TD\>

Defined in: [useCachingTopic.ts:4](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/useCachingTopic.ts#L4)

___

### useForm

▸ **useForm**<F\>(`initialFieldData?`: F): [*Form*](interfaces/form.md)<F\>

#### Type parameters:

| Name |
| :------ |
| `F` |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `initialFieldData?` | F |

**Returns:** [*Form*](interfaces/form.md)<F\>

Defined in: [useForm.tsx:6](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/useForm.tsx#L6)

___

### usePrevious

▸ **usePrevious**<T\>(`value`: T): T

#### Type parameters:

| Name |
| :------ |
| `T` |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `value` | T |

**Returns:** T

Defined in: [utils.tsx:5](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/utils.tsx#L5)

___

### useResult

▸ **useResult**(): Result

**Returns:** Result

Defined in: [result.tsx:6](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/result.tsx#L6)

___

### useTopic

▸ **useTopic**<Data, Params\>(`topic`: *Topic*<Data, Params\>, `params`: Params, `def?`: Data): *object*

Load data from backend using [push-rpc](https://github.com/vasyas/push-rpc).

```typescript
const {data} = useTopic(services.client, {
  pk: session.user.clientPk
})
```

In this example `useTopic` will subscribe to topic `services.client` on mount and
will unsubscribe from it on unmount (much like useEffect works).

If `params` are falsy, no subscription will be performed. This is useful to skip subscription until "parent" data is loaded.

`useTopic` will re-subscribe topic on changing topic parameters. In example above, when `session.user.clientPk`
change topic will be resubscribed. When re-subscribing, `useTopic` will convert params to JSON strings, so it is ok
to use inline objects as params.

#### Type parameters:

| Name | Description |
| :------ | :------ |
| `Data` | Data type that topic should return |
| `Params` | Type of parameters that topic should accept |

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic` | *Topic*<Data, Params\> | Push-RPC Topic to load data |
| `params` | Params | params to send to topic |
| `def?` | Data | default value to use until data is loaded, undefined by default |

**Returns:** *object*

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | Data | Loaded data or default value |
| `loading` | *boolean* | True if loading request is in progress |

Defined in: [useTopic.tsx:30](https://github.com/vasyas/use-ui-hooks/blob/b88f130/src/useTopic.tsx#L30)
