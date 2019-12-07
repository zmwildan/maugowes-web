const express = require('express')
const Router = express.Router()

const FeedHandler = require('../handlers/feed')

// route of: /feed
Router.get('/posts', FeedHandler.postsFeed)
Router.get('/videos', FeedHandler.videosFeed)
Router.get('/events', FeedHandler.eventsFeed)

module.exports = Router
