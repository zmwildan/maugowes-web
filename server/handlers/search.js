const searchModule = require("../modules/search")

const SearchHandlers = {
  getSearch: async (req, res) => {
    const result = await searchModule.fetchSearch(req, res)
    return res.json(result)
  },
}

module.exports = SearchHandlers
