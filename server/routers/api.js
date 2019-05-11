const express = require("express")
const Router = express.Router()

// handlers
const VideoHandler = require("../handlers/video")
const PostHandler = require("../handlers/post")
const AuthHandler = require("../handlers/auth")

// middlewares
const FormDataMiddleware = require("../middlewares/formDataMiddleware")
const AuthMiddleware = require("../middlewares/authMiddleware")

// api endpoints

// endpoint of [GET] /api/videos
Router.get("/videos", VideoHandler.getListYoutubeVideos)
Router.get("/videos-db", VideoHandler.getListFromDb)
Router.post("/videos-db", FormDataMiddleware, VideoHandler.addToDB)

// collection endpoint of blog
Router.get("/posts", PostHandler.getPosts)
Router.get("/post/:id", PostHandler.getPost)
Router.post(
  "/posts",
  AuthMiddleware,
  FormDataMiddleware,
  PostHandler.createPost
)
Router.put(
  "/posts/:id",
  AuthMiddleware,
  FormDataMiddleware,
  PostHandler.updatePost
)

// collection endpoint of auth
Router.post("/login", FormDataMiddleware, AuthHandler.login)

Router.get("*", (req, res, next) => {
  return res.json({
    status: 404,
    message: "request not available"
  })
})

module.exports = Router
