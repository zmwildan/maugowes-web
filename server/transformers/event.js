const { generateCustomUrl } = require("../modules/cloudinary")
const { toSlug } = require("string-manager")

module.exports = {
  event: (n = {}) => {
    return {
      id: n._id,
      email: n.email,
      title: n.title,
      event_link: n.link,
      link: `/events/${toSlug(n.title)}-${n._id}`,
      start_time: parseInt(n.start_time),
      created_on: n.created_on ? parseInt(n.created_on) : 0,
      updated_on: n.updated_on ? parseInt(n.updated_on) : 0,
      location: {
        address: n.location_address || null,
        coordinate: n.location_coordinate
          ? JSON.parse(
              n.location_coordinate.replace(
                /(['"])?([a-z0-9A-Z_]+)(['"])?:/g,
                '"$2": '
              )
            )
          : null,
      },
      note: n.note,
      sender_note: n.sender_note || "",
      event_status: n.status,
      poster: {
        original: n.poster,
        "600": generateCustomUrl(n.poster, "w_600,c_scale"),
      },
      views: n.views || 1,
      is_ended: new Date().getTime() > n.start_time,
      is_virtual: n.is_virtual,
      geoJSON: n.geoJSON || null,
    }
  },
}
