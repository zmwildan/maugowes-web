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

/**
 * function to receive data by filter
 * @param {string} filter
 * @param {object} state for reducer 
 * @param {object} action for reducer
 */
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

/**
 * @desc function to reset state by filter
 * @param {string} filter
 */
export function resetByFilter(state, filter) {
  delete state[filter]
  return Object.assign({}, state)
}