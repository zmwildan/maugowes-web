const mongoClient = require("mongodb").MongoClient
const debug = require("debug")

const debugMongo = debug("maugowes:mongo")
const { MONGO_USER, MONGO_DB, MONGO_PASSWORD, MONGO_HOST } = process.env

if (MONGO_USER && MONGO_PASSWORD) {
  url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`
} else {
  url = `mongodb://${MONGO_HOST}`
}

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoClient.connect(url, (err, client) => {
      if (err) {
        debugMongo("[error] to connect mongo")
        debugMongo(err, "mongo")
      } else {
        debugMongo("[success] connected mongo server")
        const db = client.db(MONGO_DB)
        resolve(db)
      }
    })
  }).catch(e => {
    debugMongo(e)
  })
}
