const { createStore, applyMiddleware, combineReducers } = require("redux")

// reducer
const Video = require("../redux/videos/reducer")

const Reducers = combineReducers({
  Video
})

export default createStore(Reducers, {})