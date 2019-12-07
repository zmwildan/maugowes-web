const postModule = require('../modules/post')
const eventModule = require('../modules/events')
const DaysJs = require('dayjs')

module.exports.postsSitemap = (req, res) => {
  // get latest 200 posts
  req.query.limit = 200
  req.query.page = 1

  postModule.fetchPosts(req, res, json => {
    res.set('Content-Type', 'text/xml')
    let content = ``
    json.results.map(n => {
      content += `
            <url>
            <loc>
            https://maugowes.com${n.link}
            </loc>
            <lastmod>${DaysJs(n.created_on * 1000).format(
              'YYYY-MM-DD'
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
  })
}

module.exports.eventsSitemap = (req, res) => {
  // get latest 200 posts
  req.query.limit = 200
  req.query.page = 1

  eventModule.fetchEvents(req, res, json => {
    res.set('Content-Type', 'text/xml')
    let content = ``
    json.results.map(n => {
      content += `
            <url>
            <loc>
            https://maugowes.com${n.link}
            </loc>
            <lastmod>${DaysJs(n.created_on * 1000).format(
              'YYYY-MM-DD'
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
  })
}

module.exports.menusSitemap = (req, res) => {
  const Menus = ['/blog', '/videos', '/events']

  res.set('Content-Type', 'text/xml')
  let content = ``
  Menus.map(n => {
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
  res.send(sitemap)
}
