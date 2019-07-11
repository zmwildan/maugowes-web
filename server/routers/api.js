const express = require("express")
const Router = express.Router()

// handlers
const VideoHandler = require("../handlers/video")
const PostHandler = require("../handlers/post")
const AuthHandler = require("../handlers/auth")

// middlewares
const FormDataMiddleware = require("../middlewares/formDataMiddleware")
const AuthMiddleware = require("../middlewares/authMiddleware")
const SealMiddleware = require("../middlewares/sealMiddleware")

// api endpoints

// endpoint of [GET] /api/videos
// Router.get("/videos/:seal", SealMiddleware, VideoHandler.getListYoutubeVideos)
Router.get("/videos-db/:id/:seal", SealMiddleware, VideoHandler.getDetailFromDb)
Router.get("/videos-db/:seal", SealMiddleware, VideoHandler.getListFromDb)
Router.post("/videos-db", FormDataMiddleware, VideoHandler.addToDB)

// collection endpoint of blog
Router.get("/posts/:seal", SealMiddleware, PostHandler.getPosts)
Router.get("/post/:id/:seal", SealMiddleware, PostHandler.getPost)
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
Router.post("/logout", AuthHandler.logout)

// testers
// Router.post("/test/sebangsa-post", PostHandler.sebangsaPostTest)

Router.get("*", (req, res, next) => {
  return res.json({
    status: 404,
    message: "request not available"
  })
})

module.exports = Router
