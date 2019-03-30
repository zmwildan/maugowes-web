const youtubeReq = require("../modules/youtubeRequest")
const youtubeTransformer = require("../transformers/youtube")

module.exports = {
  getList: function(req, res, next) {
    return res.json({
      status: 200
    })
  },
  /**
   * function to request youtube video list
   */
  getListYoutubeVideos: function(req, res, next) {
    youtubeReq(
      "get",
      `/youtube/v3/search?order=date&part=snippet&channelId=UCc0sgRlqAJCWejiiSIDJjdg&maxResults=6&key=${
        process.env.GOOGLE_TOKEN
      }&type=video`,
      response => {
        // return res.json(response)
        response = youtubeTransformer.videosList(response)
        return res.json(response)
      }
    )
  }
}
