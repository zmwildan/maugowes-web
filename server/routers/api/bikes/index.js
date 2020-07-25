const express = require("express")
const Router = express.Router()
const FormDataMiddleware = require("../../../middlewares/formDataMiddleware")

// handlers
const BikeHandler = require("../../../handlers/bikes")

// routes
Router.get("/bikes/:seal", BikeHandler.getBikes)
Router.post("/bikes/:seal", FormDataMiddleware, BikeHandler.createBike)

Router.get("/bike/:id/:seal", BikeHandler.getBike)
Router.put("/bike/:id/:seal", FormDataMiddleware, BikeHandler.updateBike)

Router.get("/bike-brands/:seal", BikeHandler.getBikeBrands)

Router.get("/bike-types/:seal", BikeHandler.getBikeTypes)

Router.get("/bike-group-specs/:seal", BikeHandler.getBikeGroupSpecs)

// bike specs relation
Router.put(
  "/bike-specs-relation/:seal",
  FormDataMiddleware,
  BikeHandler.updateSpecRelation
)
Router.delete(
  "/bike-specs-relation/:seal",
  FormDataMiddleware,
  BikeHandler.deleteSpecRelation
)

module.exports = Router
