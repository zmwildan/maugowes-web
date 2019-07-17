const { toSlug } = require("string-manager")

module.exports = {
  video: (n = {}) => {
    n.link = `/videos/${toSlug(n.title)}-${n._id}`
    return n
  }
}
