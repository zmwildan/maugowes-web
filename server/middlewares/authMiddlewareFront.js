module.exports = (req, res, next) => {
  if (
    (!req.session.auth || !req.session.auth.id) &&
    req.originalUrl != "/super"
  ) {
    return res.redirect("/super")
  } else {
    return next()
  }
}
