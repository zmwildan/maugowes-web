const mongo = require("./mongodb")
const { hashPassword } = require("./crypto")

module.exports = {
  login: (req, res, callback) => {
    const { email, password } = req.body
    const passHash = hashPassword(password)
    mongo(({ err, db, client }) => {
      if (err) {
        // error on mongo db connection
        return callback({
          status: 500,
          message: "Something wrong, please try again",
        })
      }

      db.collection("users")
        .find({ email, password: passHash })
        .toArray((err, result) => {
          // error from database
          if (err) {
            console.err(err)
            return callback({
              status: 500,
              message: "something wrong with mongo",
            })
          }
          if (result.length < 1) {
            return callback({
              status: 204,
              message: "email dan password tidak cocok",
            })
          } else {
            // login success and save userdata to session
            console.log("logged in success, save userdata to session")
            result[0].id = result[0]._id
            delete result[0]._id
            req.session.auth = result[0]

            let response = result[0]

            response.status = 200
            response.message = `Login sukses, selamat datang kembali ${result[0].fullname}`

            return callback(response)
          }
        })
    })
  },
}
