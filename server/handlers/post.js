const postModule = require("../modules/post")

module.exports = {
  getPosts: (req, res, next) => {
    postModule.fetchPosts(req, res, result => {
      res.json(result)
    })
  },
  getPost: (req, res, next) => {
    postModule.fetchPost(req, res, result => {
      res.json(result)
    })
  },
  createPost: (req, res, next) => {
    res.json({})
  },
  updatePost: (req, res, next) => {
    res.json({})
  }
}
