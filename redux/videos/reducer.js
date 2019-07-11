import { GET_VIDEOS, GET_MORE_VIDEOS } from "./actions"
import { receiveDataByFilter } from "../modules/reducerHandler"

export default (state = { new: {} }, action) => {
  if (!state[action.filter]) state[action.filter] = {}

  switch (action.type) {
    case GET_VIDEOS:
      return receiveDataByFilter(state, action)

    case GET_MORE_VIDEOS:
      if (action.data && action.data.status) {
        state[action.filter].is_loading = false
        state[action.filter].message = action.data.message
        state[action.filter].status = action.data.status
        if (typeof action.data.results !== "undefined") {
          state[action.filter].results = state[action.filter].results.concat(
            action.data.results
          )
        }
      } else {
        state[action.filter].is_loading = true
      }
      return Object.assign({}, state)

    default:
      return state
  }
}
