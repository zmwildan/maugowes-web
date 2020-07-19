const STATIC_CACHE_NAME = "mg-static-v3"
const staticsToCache = [
  "/static/images/logos/maugowes-v2/icon-128x128.png",
  "/static/fonts/Manrope/Manrope-VariableFont_wght.ttf",
  "/static/images/cover/cover-videos.jpeg",
  "/static/images/cover/cover-bikes.jpeg",
  "/static/images/cover/cover-blog.jpeg",
  "/static/images/icons/white-play-button.png",
  "/static/images/youtube-48.png",
  "/static/images/instagram-48.png",
  "/static/images/facebook-48.png",
  "/static/images/twitter-48.png",
  "/static/images/logos/whatsapp-48.png",
]

self.addEventListener("activate", async (event) => {
  console.log(STATIC_CACHE_NAME, "now ready to handle fetches!")
})

self.addEventListener("beforeinstallprompt", function (event) {
  // Stash the event so it can be triggered later.
  deferredPrompt = event
  // Update UI notify the user they can add to home screen
  showInstallPromotion()
})

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(function (cache) {
      console.log("Opened cache", STATIC_CACHE_NAME)
      return cache.addAll(staticsToCache)
    })
  )
})

self.addEventListener("fetch", function (event) {
  const request = event.request

  // disabled service worker fetch on /api and /super
  if (
    request.url.indexOf("/api") === -1 &&
    request.url.indexOf("/super") === -1
  ) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        // Cache hit - return response
        if (response) {
          return response
        }

        return fetch(event.request).then(function (response) {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          var responseToCache = response.clone()

          caches.open(STATIC_CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache)
          })

          return response
        })
      })
    )
  }
})
