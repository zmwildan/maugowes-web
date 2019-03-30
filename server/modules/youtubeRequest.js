const axios = require("axios")
const baseUrl = "https://www.googleapis.com"

// initial axios for Youtube
const instance = axios.create({
  baseUrl,
  timeout: 6000
})

module.exports = function(
  method = "get",
  path = "",
  callback = () => {},
  params = {
    options: null,
    formdata: null
  }
) {
  console.log("[YOUTUBE REQUEST]", `${method}: ${baseUrl + path}`, params)
  method = method.toLowerCase()
  return instance[method](path)
    .then(response => {
      console.log("[YOUTUBE REQUEST SUCCESS]")
      callback(response)
    })
    .catch(err => {
      console.log("[YOUTUBE REQUEST ERROR]")
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers)
      } else if (err.request) {
        // The request was made but no response was received
        // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(err.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(err.message)
      }
      console.log(err.config)
      callback({
        status: err.response && err.response.status ? err.response.status : 500,
        message:
          err.response && err.response.statusText
            ? err.response.statusText
            : "Something wrong with Youtube request"
      })
    })
}
