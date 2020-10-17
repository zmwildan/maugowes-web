const express = require("express")
const Router = express.Router()

// handlers
const SearchHandlers = require("../../../handlers/search")

// routes
Router.get("/search/:seal", SearchHandlers.getSearch)

module.exports = Router
