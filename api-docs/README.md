@use-ui/hooks

# @use-ui/hooks

## Table of contents

### Interfaces

- [ActionFunction](interfaces/ActionFunction.md)
- [Actions](interfaces/Actions.md)
- [Constraint](interfaces/Constraint.md)
- [Field](interfaces/Field.md)
- [FieldElement](interfaces/FieldElement.md)
- [FieldType](interfaces/FieldType.md)
- [Result](interfaces/Result.md)

### Type Aliases

- [ActionImpl](README.md#actionimpl)
- [FieldTypeName](README.md#fieldtypename)
- [Form](README.md#form)
- [ValidateMessages](README.md#validatemessages)
- [Validator](README.md#validator)

### Functions

- [ResultContext](README.md#resultcontext)
- [addValidator](README.md#addvalidator)
- [getFieldType](README.md#getfieldtype)
- [oneTimeField](README.md#onetimefield)
- [setGlobalErrorListener](README.md#setglobalerrorlistener)
- [useActions](README.md#useactions)
- [useCachingTopic](README.md#usecachingtopic)
- [useForm](README.md#useform)
- [usePrevious](README.md#useprevious)
- [useResult](README.md#useresult)
- [useTopic](README.md#usetopic)

## Type Aliases

### ActionImpl

Ƭ **ActionImpl**<`Params`\>: (`p?`: `Params`) => `Promise`<`unknown`\>

#### Type parameters

| Name |
| :------ |
| `Params` |

#### Type declaration

▸ (`p?`): `Promise`<`unknown`\>

Action implementations should be async and accept at most one parameter

##### Parameters

| Name | Type |
| :------ | :------ |
| `p?` | `Params` |

##### Returns

`Promise`<`unknown`\>

#### Defined in

[useActions.ts:77](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/useActions.ts#L77)

___

### FieldTypeName

Ƭ **FieldTypeName**: keyof typeof `fieldTypes` & `string`

Names of pre-defined [FieldType](interfaces/FieldType.md)s

#### Defined in

[fieldTypes.ts:8](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/fieldTypes.ts#L8)

___

### Form

Ƭ **Form**<`Data`\>: `Object`

Form state + form actions (see [Actions](interfaces/Actions.md),

**`Link`**

[useActions](README.md#useactions))

#### Type parameters

| Name |
| :------ |
| `Data` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | <Params\>(`impl`: `FormActionImpl`<`Data`, `Params`\>, `options?`: { `validate`: `boolean`  }) => [`ActionFunction`](interfaces/ActionFunction.md)<`Params`\> | Create form action |
| `data` | `Data` | Current data (derived from initial data + overriden in the input fields) |
| `error` | `string` \| `undefined` | Form action error |
| `fields` | `Fields`<`Data`\> | Hash of form fields |
| `progress` | `boolean` | True if any of the form actions are in progress now |
| `updateValues` | (`update`: `Partial`<`Values`<`Data`\>\>) => `void` | Programmatically change form field values. Triggers validation for updated fields |

#### Defined in

[useForm.tsx:307](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/useForm.tsx#L307)

___

### ValidateMessages

Ƭ **ValidateMessages**: typeof `enValidateMessages`

#### Defined in

[validate.ts:54](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/validate.ts#L54)

___

### Validator

Ƭ **Validator**: (`value`: `string`, `constraint`: `any`) => `string`

#### Type declaration

▸ (`value`, `constraint`): `string`

Function that could be called to validate form values.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | form field value |
| `constraint` | `any` | value of the field component property |

##### Returns

`string`

null if not errors or error message is validator fails

#### Defined in

[validate.ts:63](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/validate.ts#L63)

## Functions

### ResultContext

▸ **ResultContext**(`props`): `Element`

Install [Result](interfaces/Result.md), used to track action results

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ResultContextProps` |

#### Returns

`Element`

#### Defined in

[result.tsx:24](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/result.tsx#L24)

___

### addValidator

▸ **addValidator**(`propertyKey`, `validator`): `void`

Register new custom validator.
Registered validators could be used by referencing propertyKeys
Be careful not to use propertyKeys that could mess with other propeties, ie `children`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `propertyKey` | `string` | property name to request vaidation, ie `amount`: `<Input required amount field={form.amount}/>` |
| `validator` | [`Validator`](README.md#validator) | function that will run validation |

#### Returns

`void`

#### Defined in

[validate.ts:73](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/validate.ts#L73)

___

### getFieldType

▸ **getFieldType**(`typeName`): [`FieldType`](interfaces/FieldType.md)<`unknown`\>

Return FieldType from its name

#### Parameters

| Name | Type |
| :------ | :------ |
| `typeName` | `string` |

#### Returns

[`FieldType`](interfaces/FieldType.md)<`unknown`\>

#### Defined in

[fieldTypes.ts:38](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/fieldTypes.ts#L38)

___

### oneTimeField

▸ **oneTimeField**(`accept`, `value?`): [`Field`](interfaces/Field.md)

Create one-time field to be used with input components instead of `useForm`.
Typical use case - inline edit:
```
<span>Number of rows</span>
<Select
  field={oneTimeField(
      (v) => props.setPageRequest({...props.pageRequest, size: +v}),
      "" + props.pageRequest.size
  )}
  options={["1", "10", "20", "100", "200", "500"]}
  required
/>
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `accept` | (`value`: `string`) => `void` | `undefined` | callback to called when value changes |
| `value` | `string` | `""` | current value |

#### Returns

[`Field`](interfaces/Field.md)

#### Defined in

[utils.tsx:32](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/utils.tsx#L32)

___

### setGlobalErrorListener

▸ **setGlobalErrorListener**(`listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | (`e`: `any`) => `void` |

#### Returns

`void`

#### Defined in

[useActions.ts:90](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/useActions.ts#L90)

___

### useActions

▸ **useActions**(): [`Actions`](interfaces/Actions.md)

Wraps async functions invocation (ie remote method) in try/catch/finally,
maintaining `progress` and `error` state.

```typescript
const {error, action} = useActions()

const create = action(async () => {
  await service.user.create()
})

return (
  <div>
    {error && <div>{error}</div>}
    <button onClick={create} disabled={create.progress}>Create</button>
  </div>
)
```

In addition, action functions calls preventDefault for its first parameter, which makes it handy to use in `a` elements:
```
<a href="#" onClick={create}>Create</a>
```

#### Returns

[`Actions`](interfaces/Actions.md)

#### Defined in

[useActions.ts:27](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/useActions.ts#L27)

___

### useCachingTopic

▸ **useCachingTopic**<`Data`, `Params`, `TriggerData`\>(`original`): `Topic`<`Data`, `Params`, `TriggerData`\>

Create a new push-rpc/core.Topic that will cache invocations to Topic.get.

To be used when multiple consumers use the same data from server:
```
const {fields} = useForm()
const folders = useCachingTopic(services.folders)
..
<div>Move files</div>
<Select label="From" field={fields.from} topic={folders}/>
<Select label="To" field={fields.to} topic={folders}/>
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | `Data` |
| `Params` | {} |
| `TriggerData` | `Data` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `original` | `Topic`<`Data`, `Params`, `TriggerData`\> |

#### Returns

`Topic`<`Data`, `Params`, `TriggerData`\>

#### Defined in

[useCachingTopic.ts:19](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/useCachingTopic.ts#L19)

___

### useForm

▸ **useForm**<`Data`\>(`dataInitializer?`): [`Form`](README.md#form)<`Data`\>

Store various state related to form processing.

Use it in a form component that can edit data in one or more input fields:

```typescript
import {useForm} from "@use-ui/hooks"
import {Input} from "@use-ui/bootstrap3"

interface LoginData {
  login: string
  password: string
}

const {fields, progress, action, error} = useForm<LoginData>()

const login = action(async ({login, password}: LoginData) => {
  await services.auth.login({login, password})
})

return (
  <div>
    <Input label="Login" field={fields.login} required autoFocus disabled={progress} />
    <Input label="Password" field={fields.password} required autoFocus disabled={progress} />

    <Button onClick={login} progress={progress}>
      Sign In
    </Button>
  </div>
)
```

Form consists of multiple [Field](interfaces/Field.md)s. Each field has a value and a validation error. Each field is linked to a
[FieldElement](interfaces/FieldElement.md). [FieldElement](interfaces/FieldElement.md) is implemented by input component (Input in an example above), and contains information about field's [FieldType](interfaces/FieldType.md)
and validation [Constraint](interfaces/Constraint.md)s.

Field value is a string. Form data can be of different types, and [FieldType](interfaces/FieldType.md) defines how to convert form data to a field value and back.
There are four predefined [FieldTypeName](README.md#fieldtypename)s. Custom field types can also be used.

Input components are implemented in a separate libraries, for example [@use-ui/bootstrap3](https://github.com/vasyas/use-ui-bootstrap3).

In addition, form creates a set of action, see [useActions](README.md#useactions). Form action behaves in the same way as in `useActions`, except:
1) Action implementation receives current form data as the first param
2) Actions are not launched if form is invalid.

To set initial data for the form fields, pass data as object:
```
const form = useForm<LoginData>({login: "my-login"})
```

or use async loader function:
```
const form = useForm<LoginData>(async () => await fetchInitialData(params))
```

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Data` | extends `Record`<`string`, `unknown`\> | Type of form's data. Form data items can be of any type. Type should be convertible to a string using [FieldType](interfaces/FieldType.md) specified via input component. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataInitializer?` | `Data` \| () => `Promise`<`Data`\> | initial data for field values. Either object or async loader functions |

#### Returns

[`Form`](README.md#form)<`Data`\>

#### Defined in

[useForm.tsx:64](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/useForm.tsx#L64)

___

### usePrevious

▸ **usePrevious**<`T`\>(`value`): `undefined` \| `T`

Return value from previous render.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`undefined` \| `T`

#### Defined in

[utils.tsx:6](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/utils.tsx#L6)

___

### useResult

▸ **useResult**(): [`Result`](interfaces/Result.md) \| `undefined`

Return global [Result](interfaces/Result.md), installed via ResultContext.

Result is used to set/clear operation results.

Result is auto-cleared on history change.

#### Returns

[`Result`](interfaces/Result.md) \| `undefined`

#### Defined in

[result.tsx:13](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/result.tsx#L13)

___

### useTopic

▸ **useTopic**<`Data`, `Params`\>(`topic`, `params`, `def?`, `opts?`): `Object`

Async load data from backend using [push-rpc](https://github.com/vasyas/push-rpc).

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

#### Type parameters

| Name | Description |
| :------ | :------ |
| `Data` | Data type that topic should return |
| `Params` | Type of parameters that topic should accept |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `topic` | `Topic`<`Data`, `Params`, `Data`\> | Push-RPC Topic to load data |
| `params` | `undefined` \| ``null`` \| ``false`` \| `Params` | params to send to topic |
| `def?` | `Data` | default value to use until data is loaded, undefined by default |
| `opts?` | `Options` | Invocation options |

#### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Data` | Loaded data or default value |
| `loading` | `boolean` | True if loading request is in progress |

#### Defined in

[useTopic.tsx:32](https://github.com/vasyas/use-ui-hooks/blob/228e17b/src/useTopic.tsx#L32)
