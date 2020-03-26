const express = require("express")
const Router = express.Router()

// handlers
const BikeHandler = require("../../handlers/bikes")

// middlewares

Router.get("/bikes/:seal", BikeHandler.getBikes)
Router.get("/bike/:id/:seal", BikeHandler.getBike)

module.exports = Router
