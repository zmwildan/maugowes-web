if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/static/scripts/service-worker/sw.js")
      .then(
        function (registration) {
          // Registration was successful
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          )
        },
        function (err) {
          // registration failed :(
          console.error("ServiceWorker registration failed: ", err)
        }
      )
  })
}
