// ref: https://googlechrome.github.io/samples/service-worker/basic/

const STATIC_CACHE_NAME = "mg-static-v6"
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

// The activate handler takes care of cleaning up old caches.
self.addEventListener("activate", async (event) => {
  const currentCaches = [STATIC_CACHE_NAME]
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        )
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete)
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

self.addEventListener("beforeinstallprompt", function (event) {
  // Stash the event so it can be triggered later.
  deferredPrompt = event
  // Update UI notify the user they can add to home screen
  showInstallPromotion()
})

// The install handler takes care of precaching the resources we always need.
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(staticsToCache))
      .then(self.skipWaiting())
  )
})

self.addEventListener("fetch", function (event) {
  const request = event.request

  // only cache /static
  if (request.url.indexOf("/static") !== -1) {
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
