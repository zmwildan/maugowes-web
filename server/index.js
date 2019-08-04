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
const AuthMiddleware = require("./middlewares/authMiddleware")
const AuthMiddlewareFront = require("./middlewares/authMiddlewareFront")

// config
const PORT = process.env.PORT || 2019
const NODE_ENV = process.env.NODE_ENV || "development"
var SESSION_CONF = {
  name: "maugowes",
  keys: [process.env.APP_KEY || "maugowes", "maugowes.com"],
  maxAge: 12 * 30 * 24 * 60 * 60 * 1000
}

if(NODE_ENV === "production") {
  // ref: https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
  const compression = require("compression")
  app.use(compression())
}

// if (process.env.NODE_ENV === "production") {
//   app.set("trust proxy", 1) // trust first proxy
//   SESSION_CONF.cookie.secure = true // serve secure cookies
// }

// next app config
const nextApp = next({ dev: NODE_ENV !== "production" })
const nextRoutes = require("./routers/next")
const handle = nextRoutes.getRequestHandler(nextApp)

nextApp.prepare().then(() => {
  const app = express()

  // app config
  app.use(session(SESSION_CONF))
  // app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // api endpoints
  app.use("/api", ApiRoutes)

  // sitemap routes
  app.use("/sitemap", SitemapRoutes)

  // feed routes
  app.use("/feed", FeedRoutes)

  // static routes
  app.use("/media", express.static(`${__dirname}/${process.env.MEDIA_DIR}`))
  app.use("/ads.txt", express.static(`${__dirname}/../static/ads.txt`))

  // all next stuff
  app.get("/super", AuthMiddlewareFront, (req, res) => {
    return handle(req, res)
  })
  app.get("/super/*", AuthMiddlewareFront, (req, res) => {
    return handle(req, res)
  })
  app.get("*", (req, res) => {
    return handle(req, res) // for all the react stuff
  })

  app.listen(PORT, err => {
    if (err) throw err
    console.log(`APP runing on port ${PORT}`)
  })
})
