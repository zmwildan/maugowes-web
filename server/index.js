// next app inside express
// https://dev.to/aurelkurtula/introduction-to-nextjs---adding-express-and-mongo-to-the-project-2d38

// modules
const express = require("express")
const next = require("next")
const bodyParser = require("body-parser")

// config
const PORT = process.env.PORT || 2019
const NODE_ENV = process.env.NODE_ENV || "development"

// next app config
const nextApp = next({ dev: NODE_ENV !== "production" })
// const handle = nextApp.getRequestHandler()
const nextRoutes = require("./routers/next")
const handle = nextRoutes.getRequestHandler(nextApp)

nextApp.prepare().then(() => {
  const app = express()

  // app config
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // all next stuff

  

  app.get("*", (req, res) => {
    return handle(req, res) // for all the react stuff
  })

  app.listen(PORT, err => {
    if (err) throw err
    console.log(`APP runing on port ${PORT}`)
  })
})
