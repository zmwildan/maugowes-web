import { GET_LOCATION, RESET_LOCATION } from './actions'
import { receiveDataByFilter, resetByFilter } from '../modules/reducerHandler'

module.exports = (state = {}, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return receiveDataByFilter(state, action)
    case RESET_LOCATION:
      return resetByFilter(state, action.filter)
    default:
      return state
  }
}
