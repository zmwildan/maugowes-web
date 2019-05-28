const request = require("request")
const crypto = require("crypto")
const debug = require("debug")("maugowes:sebangsa")

const SBS_USERNAME = "maugowes"
const SBS_PASSWORD = "Rahasia20"
const SBS_API_HOST = "https://sebangsa.net/v5"
const SBS_COMMUNITY_ROOM = 0
const SBS_COMMUNITY_ID = 11330

/**
 * function to exports to Sebangsa
 * @param {Object} params
 */
module.exports.postToSebangsa = function(params = {}, callback = () => {}) {
  const loginSeal = generateSeal("user")
  const postSeal = generateSeal("post")

  // get userkey on login
  request.post(
    `${SBS_API_HOST}/user/${loginSeal.timestamp}/${loginSeal.seal}/login`,
    {
      form: {
        username: SBS_USERNAME,
        password: crypto
          .createHash("md5")
          .update(SBS_PASSWORD)
          .digest("hex")
      }
    },
    (err, response, body) => {
      if(err) {
        debug("request error", err)
      }

      // get userkey of login
      const { user_key } = JSON.parse(body)
      
      // ready to post new message
      return request.post(
        `${SBS_API_HOST}/post/create/${postSeal.timestamp}/${
          postSeal.seal
        }/${user_key}`,
        {
          form: {
            room_id: SBS_COMMUNITY_ROOM,
            group_id: SBS_COMMUNITY_ID,
            post: params.post
          }
        },
        (err, response, body) => {
          if(err) {
            debug("request error", err)
          }
          debug("posted to sebangsa", params.post)
          return callback()
        }
      )
    }
  )
}

function generateSeal(endpoint) {
  const timestamp = Date.now()
  let seal = `${timestamp}saltnyaapa${endpoint}`
  seal = crypto
    .createHash("md5")
    .update(seal)
    .digest("hex")
  return {
    timestamp,
    seal
  }
}
