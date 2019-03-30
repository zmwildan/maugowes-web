const youtubeReq = require("../modules/youtubeRequest")

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
      "/youtube/v3/search?order=date&part=snippet&channelId=UCc0sgRlqAJCWejiiSIDJjdg&maxResults=5&key=AIzaSyCOSUioWiwVw0X_e7smJFJBwhg8tghdSN0&type=video",
      response => {
        return res.json(response)
      }
    )
  }
}
