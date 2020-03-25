const express = require("express")
const Router = express.Router()

// handlers
const BikeHandler = require("../../handlers/bikes")

// middlewares

Router.get("/bikes/:seal", BikeHandler.getBikes)

module.exports = Router
