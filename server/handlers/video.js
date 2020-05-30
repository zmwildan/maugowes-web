const videoModule = require("../modules/videos")

module.exports = {
  addToDB: function (req, res, next) {
    return videoModule.addVideo(req, res, (result) => {
      return res.json(result)
    })
  },

  getDetailFromDb: function (req, res, next) {
    return videoModule.fetchVideoDetail(req, res, (result) => {
      return res.json(result)
    })
  },

  getListFromDb: function (req, res, next) {
    return videoModule.fetchVideos(req, res, (result) => {
      return res.json(result)
    })
  },
}
