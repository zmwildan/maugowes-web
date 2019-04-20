module.exports = (req, res, next) => {
  if(!req.session.auth || !req.session.auth.id) {
    return res.json({
      status: 401,
      message: "Unaouthorized, login first!"
    })
  } else {
    return next()
  }
}