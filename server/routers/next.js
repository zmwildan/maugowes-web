const routes = require('next-routes')

module.exports = routes()
.add("product_detail", "/product/:id", "product")
.add("blog_detail", "/blog/:id", "blog/detail")
.add("blog_by_tag", "/blog/tag/:tag", "blog/index")
.add("author", "/author/:username", "blog/index")
.add("super", "/super", "super/index")