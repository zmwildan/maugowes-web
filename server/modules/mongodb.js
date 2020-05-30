const mongoClient = require("mongodb").MongoClient

const { MONGO_USER, MONGO_DB, MONGO_PASSWORD, MONGO_HOST } = process.env

if (MONGO_USER && MONGO_PASSWORD) {
  url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`
} else {
  url = `mongodb://${MONGO_HOST}`
}

module.exports = (callback = () => {}) => {
  mongoClient.connect(url, (err, client) => {
    if (err) {
      console.error("[mongodb error] to connect mongo", err)
      callback({ err })
    } else {
      const db = client.db(MONGO_DB)
      callback({ db, client })
    }
  })
}
