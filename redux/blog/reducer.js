import { GET_BLOG, GET_MORE_BLOG, SUBMIT_FORM } from "./actions"
import { receiveDataByFilter } from "../modules/reducerHandler"

export default (state = { new: {} }, action) => {
  switch (action.type) {
    case GET_BLOG:
    case SUBMIT_FORM:
      return receiveDataByFilter(state, action)

    case GET_MORE_BLOG:
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
