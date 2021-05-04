Collection of React hooks for building UI, including forms, validation and data fetching. 
Best used with [Push-RPC](https://github.com/vasyas/push-rpc) framework.

## Main hooks

[useTopic](./api-docs/README.md#usetopic) - Async load data from backend.

[useActions](./api-docs/README.md#useactions) - Create async actions, with error handling & progress tracking. 

[useForm](./api-docs/README.md#useform) - Create async actions, with error handling & progress tracking.

## Additional hooks/utils

[useCachingTopic](./api-docs/README.md#usecachingtopic) - Cache topic data for multiple subscribers.

[usePrevious](./api-docs/README.md#useprevious) - Hook to use data from the previous render.

[oneTimeField](./api-docs/README.md#onetimefield) - Create a one-time field to be used with input components instead of useForm. 

[useResult](./api-docs/README.md#useresult) - Access to global results, installed via ResultContext component.  

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

# API Reference

[/api-docs/README.md](/api-docs/README.md)