const mongo = require("../modules/mongodb")

module.exports.getHealth = (req, res, next) => {
  return mongo(({ err, db, client }) => {
    if (err) {
      // website not error
      res.statusCode = 500
      return res.end()
    } else {
      // website.normal
      client.close()
      res.statusCode = 200
      return res.end("Normal :)")
    }
  })
}
