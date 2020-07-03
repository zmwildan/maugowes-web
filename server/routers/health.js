const express = require("express")
const Router = express.Router()
const handler = require("../handlers/health")

// router handle of GET: /health
Router.get("/", handler.getHealth)

module.exports = Router
