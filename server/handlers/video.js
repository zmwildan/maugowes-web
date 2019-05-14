// const youtubeReq = require("../modules/youtubeRequest")
const videoModules = require("../modules/videos")
// const youtubeTransformer = require("../transformers/youtube")
// const StringManager = require("string-manager")

module.exports = {

  addToDB: function(req, res, next) {
    videoModules.addVideo(req, res, result => {
      res.json(result)
    })
  },

  getListFromDb: function(req, res, next) {
    videoModules.fetchVideos(req, res, result => {
      res.json(result)
    })
  },

  /**
   * function to request youtube video list
   */
  // getListYoutubeVideos: function(req, res, next) {
  //   const defaultQuery = {
  //     order: "date",
  //     part: "snippet",
  //     channelId: "UCc0sgRlqAJCWejiiSIDJjdg",
  //     maxResults: req.query.maxResults || 6,
  //     key: process.env.GOOGLE_TOKEN,
  //     type: "video"
  //   }

  //   if(req.query.nextPageToken) defaultQuery.pageToken = req.query.nextPageToken || 0

  //   const query = StringManager.objToQuery(defaultQuery)

  //   youtubeReq(
  //     "get",
  //     `/youtube/v3/search?${query}`,
  //     response => {
  //       // return res.json(response)
  //       response = youtubeTransformer.videosList(response)
  //       return res.json(response)
  //     }
  //   )
  // }
}
