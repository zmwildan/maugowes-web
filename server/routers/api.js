const express = require("express")
const Router = express.Router()

// handlers
const VideoHandler = require("../handlers/video")

// api endpoints

// endpoint of /api/videos
Router.get("/videos", VideoHandler.getListYoutubeVideos)
Router.get("*", (req, res, next) => {
  return res.json({
    status: 404,
    message: "request not available"
  })
})

module.exports = Router