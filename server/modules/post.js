const mongo = require("./mongodb")
const postTransformer = require("../transformers/posts")

module.exports = {
  fetchPosts(req, res, callback) {
    const { lastId, page, limit } = req.query

    let aggregate = [
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "author"
        }
      }
    ]

    // execute mongodb
    return mongo().then(db => {
      db.collection("posts")
        .aggregate(aggregate)
        .skip(parseInt(page) || 0)
        .limit(parseInt(limit) || 6)
        .toArray((err, result) => {
          // error from database
          if (err) {
            console.log(err)
            return callback({
              status: 500,
              messages: "something wrong with mongo"
            })
          }

          if (result.length > 0) {
            // transform data
            result.map((n, key) => {
              n.author = n.author[0]
              result[key] = postTransformer.post(n)
            })

            // success
            callback({ status: 200, messages: "success", result })
          } else {
            callback({ status: 204, message: "no post available" })
          }
        })
    })
  }
}
