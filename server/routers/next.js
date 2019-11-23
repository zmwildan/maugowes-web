const routes = require('next-routes')

module.exports = routes()
  // super routes
  // .add("super_video_edit", "/super/videos/edit/:id", "/super/videos/form")
  .add('super_video_create', '/super/videos/create', '/super/videos/form')
  .add('super_post_create', '/super/blog/create', '/super/blog/form')
  .add('super_post_edit', '/super/blog/edit/:id', '/super/blog/form')
  .add('super_event_detail', '/super/events/detail/:id', '/super/events/detail')
  // public routes
  .add('product_detail', '/product/:id', 'product')
  .add('blog_detail', '/blog/:id', 'blog/detail')
  .add('video_detail', '/videos/:id', 'videos/detail')
  .add('blog_by_tag', '/blog/tag/:tag', 'blog/index')
  .add('author', '/author/:username', 'blog/index')
  .add('event_detail', '/events/:id', 'events/detail')
