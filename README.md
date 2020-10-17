# Mau Gowes Web

## Development

- Replace .env.example to .env
- install (only for first time)
  ```
  npm install
  ```
- start app with
  ```
  npm run local
  ```

## Tests

### Unit Testing

We are using https://jestjs.io/ , just run

```
npm run test
```

## Documentations

- API Docs : https://documenter.getpostman.com/view/100843/TVRrV4Qg

## Architecture

### FE Architecture

- **Flow**

  Page (Connect Redux / or Not) -> Component

### BE Architecture

- **Flow**

  Endpoint -> Handler -> ( (module a -> model a), (module b -> model a / model b / etc) )

**References :**

- https://redux.js.org/recipes/writing-tests

## Colaborator

- yussan
- zmwildan
