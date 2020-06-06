const withCSS = require("@zeit/next-css")
module.exports = withCSS({
  publicRuntimeConfig: {
    API_KEY: process.env.API_KEY || "maugowes",
  },
})
