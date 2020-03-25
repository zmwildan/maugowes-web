const express = require("express")
const Router = express.Router()

// Routes
const BikesRoutes = require("./api/bikes")

// handlers
const VideoHandler = require("../handlers/video")
const PostHandler = require("../handlers/post")
const AuthHandler = require("../handlers/auth")
const EventHandler = require("../handlers/events")
const LocationHandler = require("../handlers/location")

// middlewares
const FormDataMiddleware = require("../middlewares/formDataMiddleware")
const AuthMiddleware = require("../middlewares/authMiddleware")
const SealMiddleware = require("../middlewares/sealMiddleware")

// api endpoints

// location
Router.get(
  "/location/search/:seal",
  SealMiddleware,
  LocationHandler.searchLocation
)

// events
Router.post(
  "/events/:seal",
  SealMiddleware,
  FormDataMiddleware,
  EventHandler.createEvent
)
Router.put(
  "/events/:event_id/:seal",
  SealMiddleware,
  FormDataMiddleware,
  EventHandler.updateEvent
)
Router.get("/events/:id/:seal", SealMiddleware, EventHandler.fetchEventDetail)
Router.get("/events/:seal", SealMiddleware, EventHandler.fetchEvents)
Router.post(
  "/events/action/:seal/:id",
  SealMiddleware,
  FormDataMiddleware,
  EventHandler.actionEvent
)

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

// endpoint of : /api/bikes/*
Router.use(BikesRoutes)

Router.use("*", (req, res, next) => {
  return res.json({
    status: 404,
    message: "request not available"
  })
})

module.exports = Router
