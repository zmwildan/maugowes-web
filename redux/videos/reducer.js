import { GET_VIDEOS, GET_MORE_VIDEOS } from "./actions"

export default (state = { new: {} }, action) => {

  if(!state[action.filter]) state[action.filter] = {}

  switch (action.type) {
    case GET_VIDEOS:
      if (action.data && action.data.status) {
        state[action.filter] = action.data
      } else {
        state[action.filter].is_loading = true
      }
      return Object.assign({}, state)

    case GET_MORE_VIDEOS:
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
