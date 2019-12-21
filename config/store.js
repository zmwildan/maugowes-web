import {
  createStore,
  applyMiddleware,
  combineReducers
} from "redux"

// reducer
import Videos from "../redux/videos/reducer"
import Blog from "../redux/blog/reducer"
import Events from "../redux/events/reducer"
import Auth from "../redux/auth/reducers"
import Location from "../redux/location/reducer"

// middlewares
import apiMiddleware from "../redux/middlewares/requestApi"

const Reducers = combineReducers({
  Videos,
  Blog,
  Auth,
  Events,
  Location
})

let Middlewares = applyMiddleware(apiMiddleware)

if (process.env.NODE_ENV != "production" && typeof window != "undefined") {
  const {
    createLogger
  } = require("redux-logger")
  const logger = createLogger({})
  Middlewares = applyMiddleware(apiMiddleware, logger)
}

export function initializeStore(initialState = {}) {
  return createStore(Reducers, initialState, Middlewares)
}