import { GET_BIKE, SUBMIT_BIKE } from "./actions"
import { receiveDataByFilter } from "../modules/reducerHandler"

export default (state = {}, action) => {
  switch (action.type) {
    case GET_BIKE:
    case SUBMIT_BIKE:
      return receiveDataByFilter(state, action)
    default:
      return state
  }
}
