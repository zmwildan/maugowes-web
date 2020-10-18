import { FETCH_SEARCH } from "./types"

import { receiveDataByFilter } from "../modules/reducerHandler"

const SearchReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case FETCH_SEARCH:
      return receiveDataByFilter(state, action)
    default:
      return state
  }
}

export default SearchReducer
