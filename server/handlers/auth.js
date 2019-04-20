const UserModule = require("../modules/user")

module.exports = {
  login: (req, res) => {
    return UserModule.login(req, res, json => {
      return res.json(json)
    })
  }
}