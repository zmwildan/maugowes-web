import { createStore, applyMiddleware, combineReducers } from "redux"

// reducer
import Videos from "../redux/videos/reducer"
import Blog from "../redux/blog/reducer"

const Reducers = combineReducers({
  Videos,
  Blog
})

let Middlewares = applyMiddleware()

if (process.env.NODE_ENV != 'production' && typeof window != 'undefined') { 
  const {createLogger} = require('redux-logger')
  const logger = createLogger({})
  Middlewares = applyMiddleware(logger)
}

export function initializeStore(initialState = {}) {
  return createStore(
    Reducers,
    initialState,
    Middlewares
  )
}