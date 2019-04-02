import { GET_BLOG } from "./actions"

export default (state = { new: {} }, action) => {
  switch (action.type) {
    case GET_BLOG:
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
