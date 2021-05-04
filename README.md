Collection of React hooks for building UI, including forms, validation and data fetching. 
Best used with [Push-RPC](https://github.com/vasyas/push-rpc) framework.

## Main hooks

[useTopic](./api-docs/README.md#usetopic) - Async load data from backend

[useActions](./api-docs/README.md#useactions) - Create async actions, with error handling & progress tracking 

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
 

# API Docs

[/api-docs/README.md](/api-docs/README.md)