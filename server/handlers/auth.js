const UserModule = require("../modules/user")

module.exports = {
  login: (req, res) => {
    return UserModule.login(req, res, json => {
      return res.json(json)
    })
  },
  logout: (req, res) => {
    delete req.session.auth
    return res.json({
      status: 200,
      message: "Sukses logout"
    })
  }
}