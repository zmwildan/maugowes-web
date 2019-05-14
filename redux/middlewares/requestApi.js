import config from "../../config/index"
import superagent from "superagent"

export const CALL_API = "CALL_API"

export default store => next => async action => {
  //action no requset data from server
  if (!action[CALL_API]) {
    return next(action)
  } else {
    const {
      method = "GET",
      endpoint,
      formdata = {},
      options = {},
      filter,
      type
    } = action[CALL_API]

    // set to loading in state, only on client side
    next({
      type,
      filter
    })

    // start to request to api and store response to state
    const requestUrl = `${config[process.env.NODE_ENV].host}${endpoint}`
    console.log("API REQUEST :", method, requestUrl)
    const methodNormalize = method.toLowerCase()

    return await superagent[methodNormalize](requestUrl)
      .then(response => {
        console.log("api called...")
        // console.log("API RESPONSE : ", response.body)
        return next({
          type,
          filter,
          data: response.body
        })
      })
      .catch(err => console.log("redux error : ", err))
  }
}
