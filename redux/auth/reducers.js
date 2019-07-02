import { LOGIN } from "./actions"

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      if (action.json) {
        state = action.json
        state.is_loading = false
      } else {
        state.is_loading = true
      }
      return Object.assign({}, state)
    default:
      return state
  }
}
