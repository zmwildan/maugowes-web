const express = require("express")
const Router = express.Router()

// handlers
const BikeHandler = require("../../handlers/bikes")

// routes
Router.get("/bikes/:seal", BikeHandler.getBikes)
Router.get("/bike/:id/:seal", BikeHandler.getBike)
Router.get("/bike-brands/:seal", BikeHandler.getBikeBrands)
Router.get("/bike-types/:seal", BikeHandler.getBikeTypes)

module.exports = Router
