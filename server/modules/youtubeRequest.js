const request = require("request")
const baseUrl = "https://www.googleapis.com"
const timeout = 6000

const requestOptions = {
  timeout
}

// ref: https://www.npmjs.com/package/request

module.exports = function(
  method = "get",
  path = "",
  callback = () => {},
  params = {
    options: null,
    formdata: null
  }
) {
  method = method.toLowerCase()
  const startRequest = request[method]

  return startRequest(baseUrl + path, requestOptions, (err, response, body) => {
    if (err) {
      console.err("[YOUTUBE REQUEST ERROR]", err)
      callback({
        status: 500,
        message: "Ada masalah di Youtube Api"
      })
    } else {
      callback(JSON.parse(body))
    }
  })
}
