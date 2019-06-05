import Document, { Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"
import FullLoader from "../components/FullPageLoader"
import Toast from "../components/Toast"

export default class MyDocument extends Document {
  // ref: https://github.com/zeit/next.js/issues/816
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet()

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement()

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <FullLoader />
          <NextScript />
          <Toast />
          {process.env.NODE_ENV === "production" ? (
            <React.Fragment>
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `(adsbygoogle = window.adsbygoogle || []).push({
                  "google_ad_client": "ca-pub-4468477322781117",
                  "enable_page_level_ads": true
            });`
                }}
              />
            </React.Fragment>
          ) : null}
        </body>
      </html>
    )
  }
}
