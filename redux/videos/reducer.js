import { GET_VIDEOS } from "./actions"

export default (state = { new: {} }, action) => {
  switch (action.type) {
    case GET_VIDEOS:
      if (action.data) {
        state[action.filter] = action.data
      } else {
        state[action.filter] = { is_loading: true }
      }
      return Object.assign({}, state)
    default:
      return state
  }
}
