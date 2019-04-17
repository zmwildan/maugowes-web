const routes = require('next-routes')

module.exports = routes()
.add("product_detail", "/product/:id", "product")
.add("blog_detail", "/blog/:id", "blog/detail")
.add("super", "/super", "super/index")