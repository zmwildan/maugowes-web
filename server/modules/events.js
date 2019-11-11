const mongo = require("mongodb")
const { ObjectId } = require("mongodb")
const cloudinary = require("./cloudinary")
const file = require("./file")

module.exports = {
  /**
   * function to fetch events
   * @param {number} req.query.page page
   * @param {number} req.query.limit page
   */
  fetchEvets(req, res, callback) {

  },

  /**
   * function to add new event 
   * @param {string} req.body.email
   * @param {string} req.body.title
   * @param {string} req.body.link
   * @param {string} req.body.location_address
   * @param {string} req.body.location_coordinates
   * @param {string} req.body.note
   * @param {string} req.files.poster
   */
  addEvent(req, res, callback) {
    const { email, title, link, location_address, location_coordinates, note } = req.body
    const { poster } = req.files

    // params insert into db
    let params = {
      email,
      title,
      link,
      location_address,
      location_coordinates,
      note
    }

    // upload poster process
    if (typeof poster != "undefined") {
      const filename = file.encName(poster)
      const upload_path = `maugowes/${new Date().getFullYear()}/${filename}`

      // start upload to cloudinary
      return cloudinary.upload(image.path, upload_path, (err, result) => {
        if (err) {
          console.err("cloudinary upload error", err)
        } else {
          // insert into database
          console.log("cloudinary upload success")
          params.poster = result.secure_url
          return this.insertIntoEvent(params)
        }
      })
    } else {
      params.poster = {
        
      }
      return this.insertIntoEvent(params)
    }

  },

  insertIntoEvent(params = {}) {

  },

  /**
   * functino to edit event 
   */
  editEvent(req, res, callback) {

  }
}