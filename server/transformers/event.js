const { generateCustomUrl } = require("../modules/cloudinary")

module.exports = {

  event: (n = {}) => {


    return {
      id: n._id,
      email: n.email,
      title: n.title,
      link: n.link,
      start_time: n.start_time,
      location: {
        address: n.location_address || null,
        coordinate: n.location_coordinate
          ? JSON.parse(n.location_coordinate.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '))
          : null
      },
      note: n.note,
      status: n.status,
      poster: {
        original: n.poster,
        "600": generateCustomUrl(n.poster, "w_600,c_scale")
      }
    }
  }
}
