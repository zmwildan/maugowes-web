const mongo = require("./mongodb")
const { ObjectId } = require("mongodb")
const postTransformer = require("../transformers/posts")

module.exports = {
  /**
   * fetch posts list by some parameters
   * @param {*} req 
   * @param {*} res 
   * @param {*} callback 
   */
  fetchPosts(req, res, callback) {
    const { page, limit, tag } = req.query

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

    // custom aggregate
    if (tag) {
      aggregate.push({
        $match: { tags: { $regex: ".*" + tag + ".*" } }
      })
    }

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
  },

  /**
   * fetch post detail by post id
   * @param {*} req 
   * @param {*} res 
   * @param {*} callback 
   */
  fetchPost(req, res, callback) {
    const {id} = req.params
    if (id.length != 24) {
      if(req.no_count) return callback()
      return callback({ status: 204, messages: "something wrong with mongo"})
    }

    mongo().then(db => {
      db.collection("posts")
        .aggregate([
          {
            $match: { _id: ObjectId(id) }
          },
          {
            $lookup: {
              from: "users",
              localField: "user_id",
              foreignField: "_id",
              as: "author"
            }
          },
          {
            $lookup: {
              from: "apps",
              localField: "app_id",
              foreignField: "_id",
              as: "app"
            }
          }
        ])
        .toArray((err, result) => {
          // error from database
          if (err) {
            console.log(err)
            return callback({ status: 500, messages: "something wrong with mongo"})
          }
  
          if (result.length < 1) {
            if(req.no_count) return callback()
            return callback({ status: 204, messages: "postingan tidak ditemukan"})
          }
  
          // transform result
          const author = result[0].author[0]
          result[0].author = author
          result =  postTransformer.post(result[0])
  
          // update: increment views
          if(!req.no_count)
            db.collection("posts").update(
              { _id: ObjectId(result._id) },
              { $set: { views: result.views + 1 } }
            )
          return callback({ status: 200, messages: "success", result })
        })
    })
  }
}
