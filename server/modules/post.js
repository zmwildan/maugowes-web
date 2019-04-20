const mongo = require("./mongodb")
const { ObjectId } = require("mongodb")
const postTransformer = require("../transformers/posts")
const cloudinary = require("./cloudinary")
const file = require("./file")

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
        .toArray((err, results) => {
          // error from database
          if (err) {
            console.log(err)
            return callback({
              status: 500,
              messages: "something wrong with mongo"
            })
          }

          if (results.length > 0) {
            // transform data
            results.map((n, key) => {
              console.log("n", n)
              n.author = n.author[0]
              results[key] = postTransformer.post(n)
            })

            // success
            callback({ status: 200, messages: "success", results })
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
    const { id } = req.params
    if (id.length != 24) {
      if (req.no_count) return callback()
      return callback({ status: 204, messages: "something wrong with mongo" })
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
            return callback({
              status: 500,
              messages: "something wrong with mongo"
            })
          }

          if (result.length < 1) {
            if (req.no_count) return callback()
            return callback({
              status: 204,
              messages: "postingan tidak ditemukan"
            })
          }

          // transform result
          const author = result[0].author[0]
          result[0].author = author
          result = postTransformer.post(result[0])

          // update: increment views
          if (!req.no_count)
            db.collection("posts").update(
              { _id: ObjectId(result._id) },
              { $set: { views: result.views + 1 } }
            )
          result.status = 200
          result.message = "success"
          console.log("result", result)
          return callback(result)
        })
    })
  },

  /**
   * create post
   */
  createPost(req, res, callback) {
    const { title, content, tags = "", draft = false, video = "" } = req.body
    const { image } = req.files || {}
    const currentTime = Math.round(new Date().getTime() / 1000)
    const user_id = req.session.auth.id

    // not upload main image
    if (!image) {
      return callback({
        status: 203,
        messages: "image is required, please upload"
      })
    }

    // upload image
    const filename = file.encName(image)
    const upload_path = `maugowes/${new Date().getFullYear()}/${filename}`

    cloudinary.upload(image.path, upload_path, (err, result) => {
      if (err) {
        console.log("cloudinary error", err)
        return callback({
          status: 203,
          message: "Terjadi Masalah Ketika Upload di Cloudinary"
        })
      } else {
        // normalize tags
        let postdata = {
          title,
          content,
          image: result.secure_url,
          // ref: https://stackoverflow.com/a/39704153/2780875
          tags: tags.replace(/\s*,\s*/g, ","),
          comments: 0,
          views: 0,
          created_on: currentTime,
          updated_on: currentTime,
          draft: Boolean(draft == "true" || draft == true),
          user_id: ObjectId(user_id),
          video
        }

        console.log("create new post", postdata)

        mongo().then(db => {
          // check is same title available
          db.collection("posts")
            .aggregate([
              {
                $match: { title }
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
                console.log(err)
                return callback({
                  status: 500,
                  message: "something wrong with mongo"
                })
              }

              if (results.length > 0) {
                // post available
                return callback({
                  status: 400,
                  message: "Failed to post, duplicated title"
                })
              } else {
                // insert to mongodb
                db.collection("posts").insert(postdata)
                return callback({
                  status: 201,
                  message: "Post Created"
                })
              }
            })
        })
      }
    })
  }
}
