const { truncate, stripTags, toSlug } = require("string-manager")
const { generateCustomUrl } = require("../modules/cloudinary")
const userTransformer = require("../transformers/user")

module.exports = {
  post: (n = []) => {
    const pureContent = stripTags(n.content)
    return {
      id: n._id,
      title: n.title,
      created_on: n.created_on,
      updated_on: n.updated_on,
      content: n.content,
      truncatedContent: truncate(pureContent, 200, "..."),
      views: n.views,
      tags: n.tags.split(","),
      video: n.video,
      link: `/blog/${toSlug(n.title)}-${n._id}`,
      image: {
        original: n.image,
        "600": generateCustomUrl(n.image, "w_600,c_scale")
      },
      author: userTransformer(n.author),
      draft: n.draft || false
    }
  }
}
