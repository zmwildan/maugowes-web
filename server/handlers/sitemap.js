const postModule = require("../modules/post")
const eventModule = require("../modules/events")
const videoModule = require("../modules/videos")
const bikeModule = require("../modules/bikes")
const DaysJs = require("dayjs")

/**
 * @see https://support.google.com/webmasters/answer/75712?hl=en
 */
module.exports.indexSitemap = (req, res) => {
  res.set("Content-Type", "text/xml")

  const sitemap = `
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>https://maugowes.com/sitemap/posts</loc>
      </sitemap>
      <sitemap>
        <loc>https://maugowes.com/sitemap/videos</loc>
      </sitemap>
      <sitemap>
        <loc>https://maugowes.com/sitemap/events</loc>
      </sitemap>
      <sitemap>
        <loc>https://maugowes.com/sitemap/bikes</loc>
      </sitemap>
      <sitemap>
        <loc>https://maugowes.com/sitemap/menus</loc>
      </sitemap>
      <sitemap>
        <loc>https://maugowes.com/sitemap/bike-menus</loc>
      </sitemap>
      <sitemap>
        <loc>https://maugowes.com/sitemap/bike-brands</loc>
      </sitemap>
    </sitemapindex>
  `

  res.send(sitemap)
}

module.exports.postsSitemap = (req, res) => {
  req.query.limit = 1000
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
      const sitemap = `
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
  req.query.limit = 1000
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
  req.query.limit = 1000
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
  req.query.limit = 1000
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

module.exports.bikeBrands = (req, res) => {
  bikeModule.getBikeBrands(req, res, (json) => {
    if (json.status === 200) {
      res.set("Content-Type", "text/xml")
      let content = ``
      json.results.map((n) => {
        content += `
          <url>
            <loc>
              https://maugowes.com/bikes?brand=${n.id}
            </loc>
            <lastmod>2020-06-01</lastmod>
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

module.exports.bikeTypes = (req, res) => {
  bikeModule.getBikeTypes(req, res, (json) => {
    if (json.status === 200) {
      res.set("Content-Type", "text/xml")
      let content = ``
      json.results.map((n) => {
        content += `
          <url>
            <loc>
              https://maugowes.com/bikes?type=${n.id}
            </loc>
            <lastmod>2020-06-01</lastmod>
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
