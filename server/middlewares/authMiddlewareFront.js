module.exports = (req, res, next) => {
  if (!req.session.auth || !req.session.auth.id) {
    if(req.originalUrl == "/super") {
      return next()
    } else {
      return res.redirect("/super")
    }
  } else {
    if (req.originalUrl == "/super") {
      return res.redirect("/super/blog")
    } else {
      return next()
    }
  }
}
