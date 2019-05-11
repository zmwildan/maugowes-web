const mongo = require("./mongodb")
const { ObjectId } = require("mongodb")
const youtubeReq = require("../modules/youtubeRequest")

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
        `/youtube/v3/videos?id=${video_id}&part=snippet`,
        response => {
          return callback(response)
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

    return mongo().then(({ db, client }) => {
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
