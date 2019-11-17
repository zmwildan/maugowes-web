const mongo = require("./mongodb")
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
    const { email, title, link, location_address, location_coordinate = {}, note, start_time } = req.body
    const { poster } = req.files

    // params insert into db
    let params = {
      email,
      title,
      link,
      start_time,
      location_address,
      location_coordinate,
      note,
      status: "waiting"
    }

    // upload poster process
    if (typeof poster != "undefined") {
      const filename = file.encName(poster)
      const upload_path = `maugowes/${new Date().getFullYear()}/${filename}`

      // start upload to cloudinary
      return cloudinary.upload(poster.path, upload_path, (err, result) => {
        if (err) {
          console.err("cloudinary upload error", err)
        } else {
          // insert into database
          params.poster = result.secure_url
          return this.insertIntoEvent(params, callback)
        }
      })
    } else {
      // default poster
      params.poster = "https://res.cloudinary.com/dhjkktmal/image/upload/v1574004879/maugowes/2019/61836828_294185834796563_491780751893725184_o.png"
      return this.insertIntoEvent(params, callback)
    }
  },

  insertIntoEvent(params = {}, callback = () => {}) {
    return mongo(({ db, client }) => {
      // check is same title available
      db.collection("events")
        .aggregate([
          {
            $match: { title: params.title }
          },
          {
            // select from specific key: https://stackoverflow.com/a/45738049/2780875
            $project: {
              _id: 1
            }
          }
        ])
        .toArray((err, results) => {
          if (err) {
            console.err(err)
            return callback({
              status: 500,
              message: "something wrong with mongo"
            })
          }

          if (results.length > 0) {
            // post available
            return callback({
              status: 400,
              message: "Gagal kirim, event judul yang sama telah ada"
            })
          } else {
            // insert to mongodb
            db.collection("events").insert(params)

            return callback({
              status: 201,
              message: "Terimakasih, event telah terkirim dan segera diproses oleh moderator."
            })
          }
        })
    })
  },

}