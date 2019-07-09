export function receiveDataByFilter(state, action) {
  if (action.data) {
    state[action.filter] = action.data
    state[action.filter].is_loading = false
  } else {
    state[action.filter] = { is_loading: true }
  }
  return Object.assign({}, state)
}
