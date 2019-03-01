import Head from "next/head"

const defaultMetadata = {
  title: "Mau Gowes - Yuk Mari"
}

export default ({ children, metadata = defaultMetadata  }) => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="img/fav-icon.png" type="image/x-icon" />
      {/* The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags */}
      <title>{metadata.title}</title>
    </Head>

    {children}

  </div>
)
