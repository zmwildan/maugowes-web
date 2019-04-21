const { truncate, stripTags,  } = require("string-manager")
const { generateCustomUrl } = require("../modules/cloudinary")
const userTransformer = require("../transformers/user")

module.exports = {
  post: (n = []) => {
    const pureContent = stripTags(n.content)
    return {
      "id": n._id,
      "title": n.title,
      "created_on": n.created_on,
      "updated_on": n.updated_on,
      "content": n.content,
      "truncatedContent": truncate(pureContent, 100, "..."),
      "views": n.views,
      "tags": n.tags.split(","),
      "link": `/blog`,
      "image": {
        "original": n.image,
        "600": generateCustomUrl(n.image, 'w_600,c_scale')
      },
      "author": userTransformer(n.author)
    }
  }
}