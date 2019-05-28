const videoModules = require("../modules/videos")

module.exports = {

  addToDB: function(req, res, next) {
    videoModules.addVideo(req, res, result => {
      // get lattest data of video
      
      res.json(result)
    })
  },

  getListFromDb: function(req, res, next) {
    videoModules.fetchVideos(req, res, result => {
      res.json(result)
    })
  },
}
