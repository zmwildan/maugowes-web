const postModule = require("../modules/post")
const LogWritter = require("../modules/log")

module.exports = {
  getPosts: (req, res, next) => {
    return postModule.fetchPosts(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },
  getPost: (req, res, next) => {
    return postModule.fetchPost(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },
  createPost: (req, res, next) => {
    return postModule.createPost(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },
  updatePost: (req, res, next) => {
    return postModule.updatePost(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },
}
