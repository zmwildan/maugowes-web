import { GET_BLOG, GET_MORE_BLOG } from "./actions"

export default (state = { new: {} }, action) => {
  switch (action.type) {
    case GET_BLOG:
      if (action.data) {
        state[action.filter] = action.data
      } else {
        state[action.filter] = { is_loading: true }
      }
      return Object.assign({}, state)

    case GET_MORE_BLOG:
      if(action.data && action.data.status) {
        state[action.filter].is_loading = false
        state[action.filter].message = action.data.message
        state[action.filter].nextPageToken = action.data.nextPageToken
        if(typeof action.data.results !== "undefined" ) {
          state[action.filter].results = state[action.filter].results.concat(action.data.results)
        } 
      } else {
        state[action.filter].is_loading = true
      }
      return Object.assign({}, state)

    default:
      return state
  }
}
