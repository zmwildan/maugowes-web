const videoModule = require("../modules/videos")
// const sebangsaModule = require("../modules/sebangsa")

module.exports = {
  addToDB: function(req, res, next) {
    videoModule.addVideo(req, res, result => {

      return res.json(result)

      // get lattest data of video
      // return videoModule.fetchVideos(
      //   {
      //     query: {
      //       limit: 1,
      //       page: 1
      //     }
      //   },
      //   res,
      //   videos => {
      //     const video = videos.results[0]
      //     const post = `video baru di @maugowes ${
      //       video.title
      //     } https://youtube.com/watch?v=${
      //       video.id
      //     } #maugowes #sepeda #roadbike #mtb #foldingbike #gowes #bicycle #cycling`
          
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

  getListFromDb: function(req, res, next) {
    videoModule.fetchVideos(req, res, result => {
      res.json(result)
    })
  }
}
