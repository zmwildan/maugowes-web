import Document, { Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"
import FullLoader from "../components/loaders/FullPageLoader"
import Toast from "../components/Toast"

export default class MyDocument extends Document {
  // ref: https://github.com/zeit/next.js/issues/816
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet()

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    )

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement()

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="id">
        <Head>
          <meta property="fb:pages" content="250248599190287" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/static/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />
          <link
            rel="stylesheet"
            href="/static/vendor/gridlex/gridlex.min.css"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/icons/icon-128x128.png"
          />
          <link rel="apple-touch-icon" href="/static/icons/icon-128x128.png" />
          <link rel="manifest" href="/manifest.json" />
          <style
            dangerouslySetInnerHTML={{
              __html: `
              @font-face {
                font-family: 'Manrope',
                src: url('/static/fonts/Manrope/Manrope-VariableFont_wght.ttf')
              }
              body,
              [class~="grid"],
              [class*="grid-"] {
                margin: 0 !important;
              }
              body {
                font-family: "Manrope", sans-serif;
                font-size: 17px;
                letter-spacing: 0.9px;
              }
              p {
                font-size: 17px;
              }
            `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K5V4SXT');`,
            }}
          />
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe title="load google tag manager" src="https://www.googletagmanager.com/ns.html?id=GTM-K5V4SXT"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
          {/* End Google Tag Manager (noscript) */}

          {/* The core Firebase JS SDK is always required and must be listed first */}
          <script
            async
            defer
            src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>

          {/* TODO: Add SDKs for Firebase products that you want to use https://firebase.google.com/docs/web/setup#available-libraries */}
          <script
            async
            defer
            src="https://www.gstatic.com/firebasejs/7.14.2/firebase-analytics.js"></script>

          <Main />
          <FullLoader />
          <NextScript />
          <Toast />

          {/* service worker initial */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if ("serviceWorker" in navigator) {
                window.addEventListener("load", function () {
                  navigator.serviceWorker
                    .register("/service-worker.js", {
                      scope: '/static'
                    })
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
            
            `,
            }}></script>
          {/* end of service worker initial */}
        </body>
      </html>
    )
  }
}
