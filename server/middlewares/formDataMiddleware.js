const formidable = require("formidable")

const form = new formidable.IncomingForm()

module.exports = (req, res, next) => {
  form.parse(req, function(err, fields, files) {
    req.body = fields
    req.files = files
    return next()
  });
}