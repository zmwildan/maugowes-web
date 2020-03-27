import { GET_BIKE } from "./actions"
import { receiveDataByFilter } from "../modules/reducerHandler"

export default (state = {}, action) => {
  switch (action.type) {
    case GET_BIKE:
      return receiveDataByFilter(state, action)
    default:
      return state
  }
}
