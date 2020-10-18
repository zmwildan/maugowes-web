// models
const BikesModel = require("../../models/posts")

// transformers
const postTransformer = require("../../transformers/posts")

const SearchModule = {
  /**
   * function to fetch search result
   * @param {Object} req
   * @param {Object} res
   */
  async fetchSearch(req, res) {
    // const { page = 1, limit = 10, showDraft, keyword = "" } = req.query

    const posts = await BikesModel.searchPosts(req)
    posts.map((n, key) => {
      n.author = n.author[0]
      posts[key] = postTransformer.post(n)
    })

    return new Promise((resolve) => {
      const response = {
        status: 200,
        message: "Success",
        data: {
          posts,
        },
      }
      resolve(response)
    })
  },
}

module.exports = SearchModule
