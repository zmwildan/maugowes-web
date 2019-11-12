export function receiveDataByFilter(state, action) {
  if (action.data) {
    state[action.filter] = action.data
    state[action.filter].is_loading = false
  } else {
    state[action.filter] = {
      is_loading: true
    }
  }
  return Object.assign({}, state)
}

export function receiveMoreDataByFilter(state, action) {
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
}