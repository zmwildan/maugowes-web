const express = require("express")
const Router = express.Router()

const SitemapHandler = require("../handlers/sitemap")

// route of : /sitemap/post
Router.get("/posts", SitemapHandler.postsSitemap)

// route of : /sitemap/menus
Router.get("/menus", SitemapHandler.menusSitemap)

module.exports = Router
