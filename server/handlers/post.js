const postModule = require("../modules/post")
const sebangsaModule = require("../modules/sebangsa")

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
    postModule.createPost(req, res, result => {
      return res.json(result)

      // get latest created post
      // return postModule.fetchPosts(
      //   { query: { page: 1, limit: 1 }, params: {} },
      //   res,
      //   posts => {
      //     const { title, link, truncatedContent } = posts.results[0]
      //     const post = `${title} https://maugowes.com${link} ${truncatedContent}`

      //     // post to sebangsa
      //     return sebangsaModule.postToSebangsa(
      //       {
      //         post
      //       },
      //       () => {
      //         res.json(result)
      //       }
      //     )
      //   }
      // )
    })
  },
  updatePost: (req, res, next) => {
    postModule.updatePost(req, res, result => {
      res.json(result)
    })
  }
  // sebangsaPostTest: (req, res, next) => {
  //   sebangsaModule.postToSebangsa({
  //     post: "ready to go.."
  //   }, () => {
  //     res.end("posted.")
  //   })
  // }
}
