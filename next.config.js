const withCSS = require("@zeit/next-css")

const publicRuntimeConfig = {
  API_KEY: process.env.API_KEY || "maugowes",
}

module.exports = withCSS({
  publicRuntimeConfig,
})
