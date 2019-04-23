const express = require("express")
const Router = express.Router()

const FeedHandler = require("../handlers/feed")

// route of: /feed/posts
Router.get("/posts", FeedHandler.postsFeed)

module.exports = Router