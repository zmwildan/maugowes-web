const videoModule = require("../modules/videos")
const LogWritter = require("../modules/log")

module.exports = {
  addToDB: function (req, res) {
    return videoModule.addVideo(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },

  getDetailFromDb: function (req, res) {
    return videoModule.fetchVideoDetail(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },

  getListFromDb: function (req, res) {
    return videoModule.fetchVideos(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },
}
