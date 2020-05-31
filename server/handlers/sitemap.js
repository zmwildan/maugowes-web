const postModule = require("../modules/post")
const eventModule = require("../modules/events")
const videoModule = require("../modules/videos")
const bikeModule = require("../modules/bikes")
const DaysJs = require("dayjs")

module.exports.postsSitemap = (req, res) => {
  // get latest 200 posts
  req.query.limit = 200
  req.query.page = 1

  postModule.fetchPosts(req, res, (json) => {
    if (json.status === 200) {
      res.set("Content-Type", "text/xml")
      let content = ``
      json.results.map((n) => {
        content += `
            <url>
            <loc>
            https://maugowes.com${n.link}
            </loc>
            <lastmod>${DaysJs(n.created_on * 1000).format(
              "YYYY-MM-DD"
            )}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
            </url>
        `
      })
      let sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${content}
    </urlset>
    `
      return res.send(sitemap)
    } else {
      return res.json(json)
    }
  })
}

module.exports.videosSitemap = (req, res) => {
  // get latest 200 posts
  req.query.limit = 200
  req.query.page = 1

  videoModule.fetchVideos(req, res, (json) => {
    if (json.status === 200) {
      res.set("Content-Type", "text/xml")
      let content = ``
      json.results.map((n) => {
        content += `
            <url>
            <loc>
            https://maugowes.com${n.link}
            </loc>
            <lastmod>${DaysJs(n.created_on * 1000).format(
              "YYYY-MM-DD"
            )}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
            </url>
        `
      })
      let sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${content}
    </urlset>
    `
      res.send(sitemap)
    } else {
      return res.json(json)
    }
  })
}

module.exports.eventsSitemap = (req, res) => {
  // get latest 200 posts
  req.query.limit = 200
  req.query.page = 1

  eventModule.fetchEvents(req, res, (json) => {
    if (json.status === 200) {
      res.set("Content-Type", "text/xml")
      let content = ``
      json.results.map((n) => {
        content += `
            <url>
            <loc>
            https://maugowes.com${n.link}
            </loc>
            <lastmod>${DaysJs(n.created_on * 1000).format(
              "YYYY-MM-DD"
            )}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
            </url>
        `
      })
      let sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${content}
    </urlset>
    `
      res.send(sitemap)
    } else {
      return res.json(json)
    }
  })
}

module.exports.menusSitemap = (req, res) => {
  const Menus = ["/blog", "/videos", "/events", "/bikes"]

  res.set("Content-Type", "text/xml")
  let content = ``
  Menus.map((n) => {
    content += `
            <url>
            <loc>
            https://maugowes.com${n}
            </loc>
            <lastmod>2019-04-23</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
            </url>
        `
  })
  let sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${content}
    </urlset>
    `
  return res.send(sitemap)
}

module.exports.bikesSitemap = (req, res) => {
  req.query.limit = 200
  req.query.page = 1

  bikeModule.getBikes(req, res, (json) => {
    if (json.status === 200) {
      res.set("Content-Type", "text/xml")
      let content = ``
      json.results.map((n) => {
        content += `
            <url>
            <loc>
            https://maugowes.com${n.link}
            </loc>
            <lastmod>${DaysJs(n.created_on).format("YYYY-MM-DD")}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.9</priority>
            </url>
        `
      })
      let sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${content}
    </urlset>
    `
      return res.send(sitemap)
    } else {
      return res.json(json)
    }
  })
}
