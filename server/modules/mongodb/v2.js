const mongoClient = require("mongodb").MongoClient

const {
  MONGO_USER,
  MONGO_DB,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_HOST_ONLY,
} = process.env

if (MONGO_USER && MONGO_PASSWORD) {
  url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`
} else {
  url = MONGO_HOST_ONLY ? MONGO_HOST : `mongodb://${MONGO_HOST}`
}

/**
 * @see http://mongodb.github.io/node-mongodb-native/2.2/reference/connecting/connection-settings/
 */
module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoClient.connect(
      url,
      {
        // retry to connect for 60 times
        reconnectTries: 60,
        // wait 1 second before retrying
        reconnectInterval: 1000,
        useNewUrlParser: true,
      },
      (err, client) => {
        if (err) {
          console.error("[Error MongoDB] to connect mongo", err)
          resolve({ err })
        } else {
          const db = client.db(MONGO_DB)
          resolve({ db, client })
        }
      }
    )
  })
}
