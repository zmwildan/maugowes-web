const mongo = require("./mongodb")
const { ObjectId } = require("mongodb")
const cloudinary = require("./cloudinary")
const file = require("./file")
const eventTransformer = require("../transformers/event")
const { sendEmail } = require("../modules/email")
const toGeoJson = require("togeojson")
const path = require("path")
const XMLDomParser = require("xmldom").DOMParser
const fs = require("fs")

module.exports = {
  /**
   * function to fetch events
   * @param {number} req.query.page page
   * @param {number} req.query.limit page
   */
  fetchEventDetail(req, res, callback) {
    const { id } = req.params

    if (id && id.length != 24) {
      return callback({ status: 204, messages: "Event tidak ditemukan" })
    }

    let aggregate = [
      {
        $match: { _id: ObjectId(id) },
      },
    ]

    // open new connection
    mongo(({ err, db, client }) => {
      if (err) {
        // error on mongo db connection
        return callback({
          status: 500,
          message: "Something wrong, please try again",
        })
      }

      db.collection("events")
        .aggregate(aggregate)
        .toArray((err, results) => {
          // error from database
          if (err) {
            console.err(err)
            return callback({
              status: 500,
              messages: "something wrong with mongo",
            })
          }

          if (results.length < 1) {
            return callback({
              status: 204,
              messages: "Event tidak tersedia",
            })
          }

          const result = eventTransformer.event(results[0])

          // increase total views
          db.collection("events").updateOne(
            { _id: ObjectId(result.id) },
            { $set: { views: result.views + 1 } }
          )

          // close connection to mongo server
          // client.close()

          result.status = 200
          result.message = "success"

          // success
          return callback(result)
        })
    })
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
   * @param {string} req.files.gpx
   */
  addEvent(req, res, callback) {
    const {
      email,
      title,
      link,
      location_address,
      location_coordinate = {},
      note,
      start_time,
    } = req.body
    const { poster, gpx } = req.files
    const currentTime = Math.round(new Date().getTime() / 1000)

    // params insert into db
    let params = {
      email,
      title,
      link,
      start_time,
      location_address,
      location_coordinate,
      note,
      status: "waiting",
      created_on: currentTime,
      views: 0,
    }

    // if send gpx , generate geojson
    if (typeof gpx != "undefined") {
      // ref: https://stackoverflow.com/a/48809708
      console.log("gpx", gpx)
      const gpxAbsolutePath = path.resolve(gpx.path)
      const gpxXML = new XMLDomParser().parseFromString(
        fs.readFileSync(gpxAbsolutePath, "utf8")
      )
      params.geoJSON = toGeoJson.gpx(gpxXML)
    }

    // thanks email to sender
    const thanksHTML = `
     <tr>
       <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
         <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
           <tr>
             <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
               <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Terimakasih telah mengirim event gowes di Mau Gowes,</p>
               <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Saat ini permintaan kamu sedang di cek oleh moderator, kami akan segera mengirimkan status terbaru memlalui email ini.</p>
             </td>
           </tr>
         </table>
       </td>
     </tr>
   `

    // report email to admin
    const reportHTML = `
   <tr>
       <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
         <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
           <tr>
             <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
               <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Ada kiriman event gowes baru dari ${params.email}, lihat <a href="https://maugowes.com/super/events">daftar event</a> di Mau Gowes</p>
             </td>
           </tr>
         </table>
       </td>
     </tr>`

    // send email
    sendEmail(
      [params.email],
      "Terimakasih Telah Mengirim Event Gowes - Mau Gowes",
      thanksHTML
    )
    sendEmail(
      ["maugowes@gmail.com"],
      "Ada Kiriman Event Gowes Baru - Mau Gowes",
      reportHTML
    )

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
      params.poster =
        "https://res.cloudinary.com/dhjkktmal/image/upload/v1574004879/maugowes/2019/61836828_294185834796563_491780751893725184_o.png"
      return this.insertIntoEvent(params, callback)
    }
  },

  /**
   * function to update event
   * @param {string} req.body.email
   * @param {string} req.body.title
   * @param {string} req.body.link
   * @param {string} req.body.location_address
   * @param {string} req.body.location_coordinates
   * @param {string} req.body.note
   * @param {string} req.files.poster
   * @param {string} req.files.gpx
   */
  updateEvent(req, res, callback) {
    let id = req.params.event_id
    if (id && id.length != 24) {
      if (req.no_count) return callback()
      return callback({ status: 204, messages: "Event tidak ditemukan" })
    }

    id = ObjectId(id)

    const {
      email,
      title,
      link,
      location_address,
      location_coordinate = {},
      note,
      start_time,
    } = req.body
    const { poster, gpx } = req.files
    const currentTime = Math.round(new Date().getTime() / 1000)

    // params insert into db
    const params = {
      email,
      title,
      link,
      start_time,
      location_address,
      location_coordinate,
      note,
      update_on: currentTime,
    }

    // if send gpx , generate geojson
    if (typeof gpx != "undefined") {
      // ref: https://stackoverflow.com/a/48809708
      console.log("gpx", gpx)
      const gpxAbsolutePath = path.resolve(gpx.path)
      const gpxXML = new XMLDomParser().parseFromString(
        fs.readFileSync(gpxAbsolutePath, "utf8")
      )
      params.geoJSON = toGeoJson.gpx(gpxXML)
    }

    mongo(({ err, db, client }) => {
      if (err) {
        // error on mongo db connection
        return callback({
          status: 500,
          message: "Something wrong, please try again",
        })
      }

      // db execution
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
            db.collection("events").update({ _id: id }, { $set: params })
            return callback({
              status: 200,
              message: "Update event success",
            })
          }
        })
      } else {
        // default poster
        db.collection("events").update({ _id: id }, { $set: params })
        return callback({
          status: 200,
          message: "Update event success",
        })
      }
    })
  },

  /**
   * function to get event
   * @param {string} req.query.status one if waiting, accept (default), reject, all
   * @param {number} req.query.page , default 1
   * @param {number} req.query.limit , default 7
   * @param {function} callback
   */
  fetchEvents(req, res, callback) {
    const { page = 1, limit = 7, status = "accept", show_all = 1 } = req.query

    let aggregate = [
      {
        // ref: https://docs.mongodb.com/manual/reference/operator/aggregation/sort/
        $sort: {
          // order by created_on desc
          created_on: -1,
        },
      },
    ]

    if (status && status !== "all") {
      aggregate.push({
        $match: { status },
      })
    }

    if (show_all && show_all * 1 === 0) {
      const now = new Date().getTime() * 1000
      // ref: https://docs.mongodb.com/manual/reference/operator/aggregation/gte/
      aggregate.push({
        $match: {
          // get start time greater than or equal than current time
          start_time: { $gte: now.toString() },
        },
      })
    }

    mongo(({ err, db, client }) => {
      if (err) {
        // error on mongo db connection
        return callback({
          status: 500,
          message: "Something wrong, please try again",
        })
      }

      let countAggregate = Object.assign([], aggregate)
      // get events total count
      countAggregate.push({
        $count: "total",
      })

      db.collection("events")
        .aggregate(countAggregate)
        .toArray((err, count) => {
          if (err) {
            // error on mongo db connection
            console.error("[mongodb error] to connect mongo", err)
            return callback({
              status: 500,
              message: "Something wrong, please try again",
            })
          }

          // close mongo db connection
          client.close()

          // open new connection
          mongo(({ err, db, client }) => {
            if (err) {
              // error on mongo db connection
              return callback({
                status: 500,
                message: "Something wrong, please try again",
              })
            }

            db.collection("events")
              .aggregate(aggregate)
              .skip(parseInt((page - 1) * limit))
              .limit(parseInt(limit))
              .toArray((err, results) => {
                // error from database
                if (err) {
                  // error on mongo db connection
                  console.error("[mongodb error] to connect mongo", err)
                  return callback({
                    status: 500,
                    message: "Something wrong, please try again",
                  })
                }

                // close connection to mongo server
                client.close()

                if (results && results.length > 0) {
                  // transform to standart response
                  results.map((n, key) => {
                    results[key] = eventTransformer.event(n)
                  })

                  // success
                  return callback({
                    status: 200,
                    messages: "success",
                    results,
                    total: count && count[0] ? count[0].total : 0,
                  })
                } else {
                  return callback({
                    status: 204,
                    message: "Event tidak tersedia",
                    total: count && count[0] ? count[0].total : 0,
                  })
                }
              })
          })
        })
    })
  },

  /**
   * function to set status events
   * @param {number} req.params.id id of event
   * @param {string} req.body.note note send to event creator, default is "no reason"
   * @param {status} req.body.status one of "accept" or "reject" , default is "reject"
   * @param {function} callback
   */
  actionEvent(req, res, callback) {
    let { id } = req.params
    const { status, note } = req.body

    if (id && id.length != 24) {
      return callback({ status: 204, messages: "Event tidak ditemukan" })
    }

    id = ObjectId(id)

    let aggregate = [
      {
        $match: { _id: id },
      },
    ]

    // check is available data on database
    mongo(({ err, db, client }) => {
      if (err) {
        // error on mongo db connection
        return callback({
          status: 500,
          message: "Something wrong, please try again",
        })
      }

      db.collection("events")
        .aggregate(aggregate)
        .toArray((err, results) => {
          // error from database
          if (err) {
            // error on mongo db connection
            console.error("[mongodb error] to connect mongo", err)
            return callback({
              status: 500,
              message: "Something wrong, please try again",
            })
          }

          if (results && results.length > 0) {
            // update data
            const postdata = {
              updated_on: Math.round(new Date().getTime() / 1000),
              status,
              sender_note: note || "",
            }
            // update data on db
            db.collection("events").update({ _id: id }, { $set: postdata })

            // email report to sender
            const reportHTML = `
              <tr>
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                    <tr>
                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Event gowes kamu telah diupdate dengan status "${status}". ${
              note ? `Berikut catatan dari admin "${note}"` : ""
            }</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            `

            // send email
            sendEmail(
              [results[0].email],
              "Status Event Gowes Kamu - Mau Gowes",
              reportHTML
            )

            // success
            return callback({
              status: 200,
              message: "Update status success",
            })
          } else {
            return callback({
              status: 204,
              message: "Event tidak tersedia",
            })
          }
        })
    })
  },

  insertIntoEvent(params = {}, callback = () => {}) {
    return mongo(({ err, db, client }) => {
      if (err) {
        // error on mongo db connection
        return callback({
          status: 500,
          message: "Something wrong, please try again",
        })
      }

      // check is same title available
      db.collection("events")
        .aggregate([
          {
            $match: { title: params.title },
          },
          {
            // select from specific key: https://stackoverflow.com/a/45738049/2780875
            $project: {
              _id: 1,
            },
          },
        ])
        .toArray((err, results) => {
          if (err) {
            // error on mongo db connection
            console.error("[mongodb error] to connect mongo", err)
            return callback({
              status: 500,
              message: "Something wrong, please try again",
            })
          }

          if (results.length > 0) {
            // post available
            return callback({
              status: 400,
              message: "Gagal kirim, event judul yang sama telah ada",
            })
          } else {
            // insert to mongodb
            db.collection("events").insert(params)

            return callback({
              status: 201,
              message:
                "Terimakasih, event telah terkirim dan segera diproses oleh moderator.",
            })
          }
        })
    })
  },
}
