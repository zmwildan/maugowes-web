// models
const BikesModel = require("../../models/posts")

const SearchModule = {
  /**
   * function to fetch search result
   * @param {Object} req
   * @param {Object} res
   */
  async fetchSearch(req, res) {
    // const { page = 1, limit = 10, showDraft, keyword = "" } = req.query

    const posts = await BikesModel.searchPosts(req)

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
