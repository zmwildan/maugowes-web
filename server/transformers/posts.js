module.exports = {
  post: (n = []) => {
    return {
      "_id": n._id,
      "title": n.title,
      "created_on": n.created_on,
      "updated_on": n.updated_on,
      "content": n.content,
      "views": n.views,
      "tags": n.tags.split(","),
      "image": n.image,
      "author": n.author
    }
  }
}