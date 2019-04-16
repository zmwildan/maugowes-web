const { truncate, stripTags } = require("string-manager")

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
      "image": n.image,
      "author": n.author
    }
  }
}