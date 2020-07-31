const RedisClient = require("redis").createClient

const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } = process.env

const RedisCon = RedisClient(REDIS_PORT || 6379, REDIS_HOST || "localhost", {
  auth_pass: REDIS_PASSWORD || "",
  return_buffers: true,
})

/**
 * function to get redis cache from key
 * @param {string} redis_key
 * @see https://www.sitepoint.com/caching-a-mongodb-database-with-redis/ redis caching
 */
const RedisGet = (redis_key) => {
  return new Promise((resolve, reject) => {
    RedisCon.get(redis_key, (err, reply) => {
      if (err) {
        // redis error
        console.error("[Error Redis Connection]", err)
        resolve({
          err,
        })
      } else if (reply) {
        // cache found
        console.log("[Success Get Redis]", redis_key)
        reply = JSON.parse(reply)
        resolve({ err: null, reply })
      } else {
        // cache not found
        resolve({ err: null, reply: null })
      }
    })
  })
}

/**
 * function to set redis cache from key and value
 * @param {string} redis_key
 * @param {value} redis_value
 */
const RedisSet = (redis_key, redis_value) => {
  console.log("[Success Set Redis]", redis_key)
  return RedisCon.set(redis_key, JSON.stringify(redis_value))
}

/**
 * function to delete redis cache from key
 * @param {string} redis_key
 */
const RedisDel = (redis_key) => {
  console.log("[Success Del Redis]", redis_key)
  return RedisCon.del(redis_key)
}

module.exports.get = RedisGet
module.exports.set = RedisSet
module.exports.del = RedisDel
