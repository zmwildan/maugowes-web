const express = require("express")
const Router = express.Router()

// handlers
const VideoHandler = require("../handlers/video")
const PostHandler = require("../handlers/post")

// api endpoints

// endpoint of [GET] /api/videos
Router.get("/videos", VideoHandler.getListYoutubeVideos)

// collection endpoint of blog
Router.get("/posts", PostHandler.getPosts)
Router.get("/post/:id", PostHandler.getPost)
Router.post("/posts", PostHandler.createPost)
Router.put("/posts/:id", PostHandler.updatePost)

Router.get("*", (req, res, next) => {
  return res.json({
    status: 404,
    message: "request not available"
  })
})

module.exports = Router