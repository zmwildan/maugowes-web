const postModule = require("../modules/post")

module.exports = {
  getPosts: (req, res, next) => {
    return postModule.fetchPosts(req, res, (result) => {
      return res.json(result)
    })
  },
  getPost: (req, res, next) => {
    return postModule.fetchPost(req, res, (result) => {
      return res.json(result)
    })
  },
  createPost: (req, res, next) => {
    return postModule.createPost(req, res, (result) => {
      return res.json(result)
    })
  },
  updatePost: (req, res, next) => {
    return postModule.updatePost(req, res, (result) => {
      return res.json(result)
    })
  },
}
