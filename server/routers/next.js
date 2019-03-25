const routes = require('next-routes')

module.exports = routes()
.add("product_detail", "/product/:id", "product")