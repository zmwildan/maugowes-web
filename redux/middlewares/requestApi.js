import config from "../../config/index"
import superagent from "superagent"

export const CALL_API = "CALL_API"

export default store => next => async action => {
  //action no requset data from server
  if (!action[CALL_API]) {
    return next(action)
  } else {
    let { formdata = {} } = action[CALL_API]
    const { method = "GET", endpoint, options = {}, filter, type } = action[
      CALL_API
    ]

    // set to loading in state, only on client side
    next({
      type,
      filter,
      options
    })

    // start to request to api and store response to state
    const requestUrl = `${config[process.env.NODE_ENV].host}${endpoint}`
    const methodNormalize = method.toLowerCase()

    if (typeof formdata != "undefined") formdata = formdataGenerator(formdata)

    return await superagent[methodNormalize](requestUrl)
      .set("Accept", "application/json")
      .send(formdata)
      .then(response => {
        return next({
          type,
          filter,
          options,
          data: response.body
        })
      })
      .catch(err => console.error("redux error : ", err))
  }
}

// formdata generator
function formdataGenerator(params) {
  let formdata = new FormData()
  // return params
  Object.keys(params).map(n => {
    formdata.append(n, params[n])
  })

  return formdata
}
