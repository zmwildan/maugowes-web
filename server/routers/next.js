const routes = require("next-routes")

module.exports = routes()
  // super routes
  // .add("super_video_edit", "/super/videos/edit/:id", "/super/videos/form")
  .add("super_video_create", "/super/videos/create", "/super/videos/form")
  .add("super_post_create", "/super/blog/create", "/super/blog/form")
  .add("super_post_edit", "/super/blog/edit/:id", "/super/blog/form")
  .add("super_event_detail", "/super/events/detail/:id", "/super/events/detail")
  .add("super_event_edit", "/super/events/edit/:id", "/super/events/edit")

  // products routes
  .add("product_detail", "/product/:id", "product")

  // videos routes
  .add("video_detail", "/videos/:id", "videos/detail")

  // blog routes
  .add("blog_detail", "/blog/:id", "blog/detail")
  .add("blog_by_tag", "/blog/tag/:tag", "blog/index")

  // author routes
  .add("author", "/author/:username", "blog/index")

  // events reoutes
  .add("create_event", "/events/send", "events/send")
  .add("event_detail", "/events/:id", "events/detail")

  // bikes routes
  .add("bike_compare", "/bikes/compare/:id", "bikes/compare")
  .add("bike_detail", "/bikes/:id", "bikes/detail")
