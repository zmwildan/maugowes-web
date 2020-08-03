// next app inside express
// https://dev.to/aurelkurtula/introduction-to-nextjs---adding-express-and-mongo-to-the-project-2d38

// modules
const express = require("express")
const session = require("cookie-session")
const next = require("next")
const bodyParser = require("body-parser")
const ApiRoutes = require("./routers/api")
const FeedRoutes = require("./routers/feed")
const SitemapRoutes = require("./routers/sitemap")
const HealthRoutes = require("./routers/health")
const AuthMiddlewareFront = require("./middlewares/authMiddlewareFront")

// config
const PORT = process.env.PORT || 2019
const NODE_ENV = process.env.NODE_ENV || "development"
var SESSION_CONF = {
  name: "maugowes",
  keys: [process.env.APP_KEY || "maugowes", "maugowes.com"],
  maxAge: 12 * 30 * 24 * 60 * 60 * 1000,
}

// next app config
const nextApp = next({ dev: NODE_ENV !== "production" })
const nextRoutes = require("./routers/next")
const nextHandler = nextRoutes.getRequestHandler(nextApp)

nextApp.prepare().then(() => {
  const app = express()

  if (NODE_ENV === "production") {
    // ref: https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
    const compression = require("compression")
    app.use(compression())
  }

  // app config
  app.use(session(SESSION_CONF))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // cache config
  app.use((req, res, next) => {
    const urlArr = req.originalUrl.split("/")
    if (urlArr[1] && urlArr[1] === "static") {
      // max age cache
      res.set("Cache-Control", "public, max-age=86400") //1 days
    } else {
      // non static / unversioned url
      res.set("Cache-Control", "no-cache")
    }

    next()
  })

  // api endpoints
  app.use("/api", ApiRoutes)

  // sitemap routes
  app.use("/sitemap", SitemapRoutes)

  // feed routes
  app.use("/feed", FeedRoutes)

  // static routes
  app.use("/media", express.static(`${__dirname}/${process.env.MEDIA_DIR}`))

  // health check
  app.use("/health", HealthRoutes)

  // all next stuff
  app.get("/super", AuthMiddlewareFront, (req, res) => {
    return nextHandler(req, res)
  })
  app.get("/super/*", AuthMiddlewareFront, (req, res) => {
    return nextHandler(req, res)
  })

  // next js routes
  app.get("*", (req, res) => {
    return nextHandler(req, res) // for all the react stuff
  })

  app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`APP runing on port ${PORT}`)
  })
})
