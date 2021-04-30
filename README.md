Collection of React hooks for building UI, including forms, validation and data fetching. 
Best used with [Push-RPC](https://github.com/vasyas/push-rpc) framework.

## Core concepts

## Typical use cases

### Simple form

### Initial data for the form from topic
### Initial data for the form from async effect 

### One-shot field

#### Case 1. Generic oneTimeField
#### Case 2. InlineEdit

### Loading data from server

### Performing some action

#### Case 1. Generic useAction
#### Case 2. Including form


### Extra cases

#### Trim input value after edit

## Main components

### useTopic

Load data from backend using [push-rpc](https://github.com/vasyas/push-rpc).

```
const {data} = useTopic(services.client, {
  pk: session.user.clientPk
})
```

In this example `useTopic` will subscribe to topic `services.client` on mount and 
will unsubscribe from it on unmount (much like useEffect works). 

In addition, `useTopic` will re-subscribe topic on changing topic parameters.
In example, when `session.user.clientPk` change topic will be resubscribed. 

Before the first load, `data` will be undefined. 

### useAction

`useAction` wraps async function invocation (ie remote method) in try/catch/finally, 
maintaining `progress` and `error` state.

```
const {error, progress, action} = useAction()

const create = action(async () => {
  await service.user.create()
})

return (
    <div>
        {error && <div>{error}</div>}
        <button onClick={create} disabled={progress}>Create</button>
    </div>
)
```

In addition, action calls preventDefault for its first parameter, which makes it handy to use in `a` elements:
```
<a href="#" onClick={create}>Create</a>
```

### useForm

Store various state related to form processing.
```
import {useForm} from "@use-ui/hooks"
import {ActionResult, Input} from "@use-ui/bootstrap3"

interface Fields {
  login: string
  password: string
}

const {fields, progress, action, error} = useForm<Fields>()

const login = action(async ({login, password}) => {
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

`useForm` returns hash of `fields` objects. Field objects are used to link Input to form data. Field object contains
field value, field error, validation errors, onChange handlers and other data required for Input to work.

Input are implemented in separate libraries, for example see @use-ui/bootstrap3.

Besides fields, useAction return `progress`, `action` and `error` which behaves almost the same as in `useAction`.
But in addition to `useAction`, action methods receive current field values on invocations.
  
`useForm` take a single optional parameter which is the default values for the form.
 