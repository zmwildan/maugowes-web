const postModule = require("../modules/post")
const DaysJs = require("dayjs")

module.exports.postsFeed = (req, res) => {
  postModule.fetchPosts(req, res, json => {
    res.set("Content-Type", "text/xml")
    let content = ``
    json.results.map(n => {
      content += `
            <item>
                <title>${n.title}</title>
                <description>${n.truncatedContent}</description>
                <link>https://maugowes.com${n.link}</link>
                <guid>https://maugowes.com${n.link}</guid>
                <category domain="https://maugowes.com">${n.tags.join(
                  ","
                )}</category>
                <pubDate>${DaysJs(n.created_on * 1000).format(
                  "ddd, DD MMM YYYY"
                )} 00:00:00 +0000</pubDate>
                <comments>https://maugowes.com${n.link}#comments</comments>
            </item>
            `
    })
    let sitemap = `
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
                <title>Mau Gowes - Maaaauuuu....</title>
                <description>Feed dari Mau Gowes - Bahagia Bersama Sepeda</description>
                <link>https://maugowes.com</link>
                <category domain="https://maugowes.com">gowes/sepeda/cycling/roadbike/mtb/folding bike</category>
                <copyright>Copyright 2019 Id More Team.</copyright>
                <lastBuildDate>${DaysJs().format(
                  "ddd, DD MMM YYYY"
                )} 00:00:00 +0000</lastBuildDate>
                <language>id-id</language>
                <image>
                    <url>https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_100/v1555855650/maugowes/2019/mau_gowes.png</url>
                    <title>Mau Gowes - Maaaauuuu....</title>
                    <link>https://maugowes.com</link>
                    <description>Feed dari Mau Gowes - Bahagia Bersama Sepeda</description>
                    <width>100</width>
                    <height>100</height>
                </image>
                <atom:link href="https://maugowes.com/feed/posts" rel="self" type="application/rss+xml"/>
                ${content}
            </channel>
        </rss>
        `
    res.send(sitemap)
  })
}
