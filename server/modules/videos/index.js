const mongo = require("../mongodb")
const mongoV2 = require("../mongodb/v2")
const Redis = require("../redis")
const youtubeReq = require("../youtubeRequest")
const videoTransformer = require("../../transformers/youtube")
const videoDbTransformer = require("../../transformers/videos")
const { ObjectId } = require("mongodb")

module.exports = {
  /**
   * add video to the database
   * @param {string} req.body.video_id required
   * @param {string} req.body.video_type required, one of "youtube"
   * @param {function} callback
   */
  addVideo(req, res, callback) {
    const { video_id, video_type } = req.body

    if (!video_type || !video_id) {
      return callback({
        status: 203,
        messages: "id video wajib diisi",
      })
    }

    // request is validator
    if (video_type === "youtube") {
      // get video Youtube by id
      return youtubeReq(
        "get",
        `/youtube/v3/videos?id=${video_id}&part=snippet&key=${process.env.GOOGLE_TOKEN}`,
        (response) => {
          // return callback(response.items.length)
          if (response.items && response.items.length > 0) {
            const videodata = videoTransformer.transformer(response.items[0])
            // insert to the database
            return mongo(({ err, db, client }) => {
              if (err) {
                // error on mongo db connection
                return callback({
                  status: 500,
                  message: "Something wrong, please try again",
                })
              }

              const currentTime = Math.round(new Date().getTime() / 1000)
              videodata.created_on = currentTime
              videodata.updated_on = currentTime
              db.collection("videos").insert(videodata)
              client.close()
              return callback({
                status: 201,
                messages: "video berhasil ditambahkan",
              })
            })
          } else {
            return callback({
              status: 204,
              messages: "video tidak ditemukan",
            })
          }
        }
      )
    } else {
      return callback({
        status: 203,
        messages: "tipe video tidak disupport",
      })
    }
  },

  /**
   * fetch video list by some paramter
   * @param {number} req.query.page page
   * @param {number} req.query.limit page
   */
  fetchVideos(req, res, callback) {
    const { page, limit } = req.query

    let aggregate = [
      {
        // ref: https://docs.mongodb.com/manual/reference/operator/aggregation/sort/
        $sort: {
          // order by created_on desc
          updated_on: -1,
        },
      },
    ]

    const countAggregate = [
      {
        $count: "total",
      },
    ]

    return mongo(({ err, db, client }) => {
      if (err) {
        // error on mongo db connection
        return callback({
          status: 500,
          message: "Something wrong, please try again",
        })
      }

      // get count of videos
      db.collection("videos")
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

          // get video list by aggregate
          db.collection("videos")
            .aggregate(aggregate)
            .skip(page ? parseInt((page - 1) * limit) : 0)
            .limit(limit ? parseInt(limit) : 6)
            .toArray((err, results) => {
              // error from database
              if (err) {
                console.err(err)
                return callback({
                  status: 500,
                  messages: "something wrong with mongo",
                })
              }

              // close connection to mongo server
              client.close()

              // return results as json response
              if (results && results.length > 0) {
                // transform data
                results.map((n, key) => {
                  n = videoDbTransformer.video(n)
                })

                return callback({
                  status: 200,
                  messages: "success",
                  results,
                  total: count && count[0] ? count[0].total : 0,
                })
              } else {
                // no video found
                return callback({
                  status: 204,
                  message: "no videos available",
                  total: count && count[0] ? count[0].total : 0,
                })
              }
            })
        })
    })
  },

  /**
   * fetch video detail by video id
   * @param {number} req.params.id id of video in db
   */
  async fetchVideoDetail(req, res, callback) {
    const { id } = req.params
    if (id && id.length != 24) {
      return callback({ status: 204, messages: "Video tidak ditemukan" })
    }

    const redis_key = `maugowes/video/${id}`
    const { reply } = await Redis.get(redis_key)

    if (reply) {
      return callback(reply)
    } else {
      // start mongo
      const { err, db, client } = await mongoV2(callback)

      if (err) {
        // error on mongo db connection
        return callback({
          status: 500,
          message: "Something wrong, please try again",
        })
      }

      db.collection("videos")
        .aggregate([
          {
            $match: { _id: ObjectId(id) },
          },
        ])
        .toArray((err, result) => {
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

          if (result.length < 1) {
            if (req.no_count) return callback()
            const response = {
              status: 204,
              messages: "Video tidak ditemukan",
            }
            Redis.set(redis_key, response)
            return callback(response)
          }

          client.close()
          result = result[0]
          result.status = 200
          result.message = "success"
          Redis.set(redis_key, result)
          return callback(result)
        })
      // end of mongo
    }
  },
}
