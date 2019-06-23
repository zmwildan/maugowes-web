const mongo = require("./mongodb")
const youtubeReq = require("../modules/youtubeRequest")
const videoTransformer = require("../transformers/youtube")

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
        messages: "id video wajib diisi"
      })
    }

    // request is validator
    if (video_type === "youtube") {
      // get video Youtube by id
      youtubeReq(
        "get",
        `/youtube/v3/videos?id=${video_id}&part=snippet&key=${
          process.env.GOOGLE_TOKEN
        }`,
        response => {
          // return callback(response.items.length)
          if(response.items && response.items.length > 0) {
            const videodata = videoTransformer.transformer(response.items[0])
            // insert to the database
            mongo(({db, client}) => {
              const currentTime = Math.round(new Date().getTime() / 1000)
              videodata.created_on = currentTime
              videodata.updated_on = currentTime
              db.collection("videos").insert(videodata)
              client.close()
              return callback({
                status: 201,
                messages: "video berhasil ditambahkan"
              })
            })
          } else {
            return callback({
              status: 204,
              messages: "video tidak ditemukan"
            })
          } 
        }
      )
    } else {
      return callback({
        status: 203,
        messages: "tipe video tidak disupport"
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
          created_on: -1
        }
      }
    ]

    const countAggregate = [
      {
        $count: "total"
      }
    ]

    return mongo(({ db, client }) => {
      // get count of videos
      db.collection("videos")
        .aggregate(countAggregate)
        .toArray((err, count) => {
          // get video list by aggregate
          db.collection("videos")
            .aggregate(aggregate)
            .skip(page ? parseInt((page - 1) * limit) : 0)
            .limit(limit ? parseInt(limit) : 6)
            .toArray((err, results) => {
              // error from database
              if (err) {
                console.log(err)
                return callback({
                  status: 500,
                  messages: "something wrong with mongo"
                })
              }

              // close connection to mongo server
              client.close()

              // return results as json response
              if (results && results.length > 0) {
                return callback({
                  status: 200,
                  messages: "success",
                  results,
                  total: count && count[0] ? count[0].total : 0
                })
              } else {
                // no video found
                return callback({
                  status: 204,
                  message: "no videos available",
                  total: count && count[0] ? count[0].total : 0
                })
              }
            })
        })
    })
  }
}
