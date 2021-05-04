@use-ui/hooks

# @use-ui/hooks

## Table of contents

### Interfaces

- [ActionFunction](interfaces/actionfunction.md)
- [Actions](interfaces/actions.md)
- [Constraint](interfaces/constraint.md)
- [Field](interfaces/field.md)
- [FieldElement](interfaces/fieldelement.md)
- [FieldType](interfaces/fieldtype.md)
- [Form](interfaces/form.md)
- [Result](interfaces/result.md)

### Type aliases

- [ActionImpl](README.md#actionimpl)
- [FieldTypeName](README.md#fieldtypename)
- [ValidateMessages](README.md#validatemessages)

### Functions

- [ResultContext](README.md#resultcontext)
- [getFieldType](README.md#getfieldtype)
- [oneTimeField](README.md#onetimefield)
- [useActions](README.md#useactions)
- [useCachingTopic](README.md#usecachingtopic)
- [useForm](README.md#useform)
- [usePrevious](README.md#useprevious)
- [useResult](README.md#useresult)
- [useTopic](README.md#usetopic)

## Type aliases

### ActionImpl

Ƭ **ActionImpl**<Params\>: (`p?`: Params) => *Promise*<void\>

Action implementations should be async and accept at most one parameter

#### Type parameters:

| Name |
| :------ |
| `Params` |

#### Type declaration:

▸ (`p?`: Params): *Promise*<void\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `p?` | Params |

**Returns:** *Promise*<void\>

Defined in: [useActions.ts:76](https://github.com/vasyas/use-ui-hooks/blob/a3efc87/src/useActions.ts#L76)

___

### FieldTypeName

Ƭ **FieldTypeName**: keyof *typeof* fieldTypes & *string*

Names of pre-defined [FieldType](interfaces/fieldtype.md)s

Defined in: [fieldTypes.ts:8](https://github.com/vasyas/use-ui-hooks/blob/a3efc87/src/fieldTypes.ts#L8)

___

### ValidateMessages

Ƭ **ValidateMessages**: *typeof* enValidateMessages

Defined in: [validate.ts:43](https://github.com/vasyas/use-ui-hooks/blob/a3efc87/src/validate.ts#L43)

## Functions

### ResultContext

▸ **ResultContext**(`props`: ResultContextProps): *Element*

Install [Result](interfaces/result.md), used to track action results

#### Parameters:

| Name | Type |
| :------ | :------ |
| `props` | ResultContextProps |

**Returns:** *Element*

Defined in: [result.tsx:24](https://github.com/vasyas/use-ui-hooks/blob/a3efc87/src/result.tsx#L24)

___

### getFieldType

▸ **getFieldType**(`typeName`: [*FieldTypeName*](README.md#fieldtypename)): [*FieldType*](interfaces/fieldtype.md)<unknown\>

Return FieldType from its name

#### Parameters:

| Name | Type |
| :------ | :------ |
| `typeName` | [*FieldTypeName*](README.md#fieldtypename) |

**Returns:** [*FieldType*](interfaces/fieldtype.md)<unknown\>

Defined in: [fieldTypes.ts:33](https://github.com/vasyas/use-ui-hooks/blob/a3efc87/src/fieldTypes.ts#L33)

___

### oneTimeField

▸ **oneTimeField**(`accept`: (`value`: *string*) => *void*, `value?`: *string*): [*Field*](interfaces/field.md)

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

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `accept` | (`value`: *string*) => *void* | - | callback to called when value changes |
| `value` | *string* | "" | current value |

**Returns:** [*Field*](interfaces/field.md)

Defined in: [utils.tsx:32](https://github.com/vasyas/use-ui-hooks/blob/a3efc87/src/utils.tsx#L32)

___

### useActions

▸ **useActions**(): [*Actions*](interfaces/actions.md)

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

**Returns:** [*Actions*](interfaces/actions.md)

Defined in: [useActions.ts:27](https://github.com/vasyas/use-ui-hooks/blob/a3efc87/src/useActions.ts#L27)

___

### useCachingTopic

▸ **useCachingTopic**<Data, Params, TriggerData\>(`original`: *Topic*<Data, Params, TriggerData\>): *Topic*<Data, Params, TriggerData\>

Create a new {@link push-rpc/core.Topic} that will cache invocations to Topic.get.

To be used when multiple consumers use the same data from server:
```
const {fields} = useForm()
const folders = useCachingTopic(services.folders)
..
<div>Move files</div>
<Select label="From" field={fields.from} topic={folders}/>
<Select label="To" field={fields.to} topic={folders}/>
```

#### Type parameters:

| Name | Default |
| :------ | :------ |
| `Data` | - |
| `Params` | {} |
| `TriggerData` | Data |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `original` | *Topic*<Data, Params, TriggerData\> |

**Returns:** *Topic*<Data, Params, TriggerData\>

Defined in: [useCachingTopic.ts:19](https://github.com/vasyas/use-ui-hooks/blob/a3efc87/src/useCachingTopic.ts#L19)

___

### useForm

▸ **useForm**<Data\>(`initialData?`: Data): [*Form*](interfaces/form.md)<Data\>

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

Form consists of multiple [Field](interfaces/field.md)s. Each field has a value and a validation error. Each field is linked to a
[FieldElement](interfaces/fieldelement.md). [FieldElement](interfaces/fieldelement.md) is implemented by input component (Input in an example above), and contains information about field's [FieldType](interfaces/fieldtype.md)
and validation [Constraint](interfaces/constraint.md)s.

Field value is a string. Form data can be of different types, and [FieldType](interfaces/fieldtype.md) defines how to convert form data to a field value and back.
There are four predefined [FieldTypeName](README.md#fieldtypename)s. Custom field types can also be used.

Input components are implemented in a separate libraries, for example [@use-ui/bootstrap3](https://github.com/vasyas/use-ui-bootstrap3).

In addition, form creates a set of action, see [useActions](README.md#useactions). Form action behaves in the same way as in `useActions`, except:
1) Action implementation receives current form data as the first param
2) Actions are not launched if form is invalid.

#### Type parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `Data` | *Record*<string, unknown\> | Type of form's data. Form data items can be of any type. Type should be convertible to a string using [FieldType](interfaces/fieldtype.md) specified via input component. |

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialData?` | Data | initial data for field values. useForm supports updating it after initial mount, so it can be loaded async. |

**Returns:** [*Form*](interfaces/form.md)<Data\>

Defined in: [useForm.tsx:54](https://github.com/vasyas/use-ui-hooks/blob/a3efc87/src/useForm.tsx#L54)

___

### usePrevious

▸ **usePrevious**<T\>(`value`: T): T

Return value from previous render.

#### Type parameters:

| Name |
| :------ |
| `T` |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `value` | T |

**Returns:** T

Defined in: [utils.tsx:6](https://github.com/vasyas/use-ui-hooks/blob/a3efc87/src/utils.tsx#L6)

___

### useResult

▸ **useResult**(): [*Result*](interfaces/result.md)

Return global [Result](interfaces/result.md), installed via ResultContext.

Result is used to set/clear operation results.

Result is auto-cleared on history change.

**Returns:** [*Result*](interfaces/result.md)

Defined in: [result.tsx:13](https://github.com/vasyas/use-ui-hooks/blob/a3efc87/src/result.tsx#L13)

___

### useTopic

▸ **useTopic**<Data, Params\>(`topic`: *Topic*<Data, Params\>, `params`: Params, `def?`: Data): *object*

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

Defined in: [useTopic.tsx:30](https://github.com/vasyas/use-ui-hooks/blob/a3efc87/src/useTopic.tsx#L30)
