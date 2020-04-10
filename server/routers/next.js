const routes = require("next-routes")

module.exports = routes()
  // super videos
  .add("super_video_create", "/super/videos/create", "/super/videos/form")

  // super blog
  .add("super_post_create", "/super/blog/create", "/super/blog/form")
  .add("super_post_edit", "/super/blog/edit/:id", "/super/blog/form")

  // super event
  .add("super_event_detail", "/super/events/detail/:id", "/super/events/detail")
  .add("super_event_edit", "/super/events/edit/:id", "/super/events/edit")

  // super bikes
  .add("super_bike_create", "/super/bikes/create", "/super/bikes/form")
  .add("super_bike_edit", "/super/bikes/edit/:id", "/super/bikes/form")

  // products routes
  .add("product_detail", "/product/:id", "product")

  // blog routes
  .add("blog_by_tag", "/blog/tag/:tag", "blog/index")

  // author routes
  .add("author", "/author/:username", "blog/index")
