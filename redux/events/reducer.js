import {
  GET_EVENTS,
  GET_MORE_EVENTS,
} from "./actions"
import {
  receiveDataByFilter,
  receiveMoreDataByFilter
} from "../modules/reducerHandler"

export default (state = {
  new: {}
}, action) => {
  if (!state[action.filter]) state[action.filter] = {}

  switch (action.type) {
    case GET_EVENTS:
      return receiveDataByFilter(state, action)

    case GET_MORE_EVENTS:
      return receiveMoreDataByFilter(state, action)

    default:
      return state
  }
}