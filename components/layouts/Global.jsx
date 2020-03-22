import Head from "next/head"
import React from "react"
import Styled from "styled-components"
import { color_black_main, color_blue_main, color_gray_dark } from "../Const"

const GlobalLayoutStyled = Styled.div`
  font-family: 'Montserrat', sans-serif;
  color: ${color_black_main};

  a {
    text-decoration: none;
    color: ${color_blue_main};
  }

  .text-muted {
    color: ${color_gray_dark} !important;
  }

  // form components global style
  select {
    background: #FFF;
    border: none;
    outline: none
  }
  
  // global class
  .container {
    width: 1150px;
    margin: 0 auto;
  }

  // responsive container
  .align-center {
    text-align: center;
  }
  [class~=col] {
    padding: 0;
    margin: 0;
  }
  .m-t-50 {
    margin-top: 50px;
  }
  .p-t-b-30 {
    padding: 30px 0;
  }
  .p-t-30 {
    padding-top: 30px;
  }
  .p-b-50 {
    padding-bottom: 50px;
  }
  .text-black {
    color: ${color_black_main};
  }

  // responsive section
  // gridlex _xs
  @media (max-width: 36em) {
    .container {
      width: 100%;
    }
  }
  // gridlex _sm
  @media (max-width: 48em) {
    .container {
      width: 100%;
    }
  }
`

const defaultMetadata = {
  title: "Mau Gowes - Maaaauuu...",
  description: "Mau gowes yuk main disini dulu agar lebih termotivasi",
  image:
    "https://res.cloudinary.com/dhjkktmal/image/upload/v1555855650/maugowes/2019/mau_gowes.png",
  keywords:
    "mau gowes,bersepeda,cycling,bicycle,sepeda,roadbike,mtb,folding bike,bike to work",
  url: "https://maugowes.com",
  type: "blog"
}

export default class HomeLayout extends React.Component {
  render = () => {
    const { children, metadata = defaultMetadata, scripts = [] } = this.props

    return (
      <React.Fragment>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            href="/static/img/fav-icon.png"
            type="image/x-icon"
          />
          <link
            rel="stylesheet"
            href="/static/vendor/gridlex/gridlex.min.css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:300,500,700"
            rel="stylesheet"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/icons/icon-128x128.png"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/static/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />

          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={metadata.keywords} />

          {/* open graph */}
          <meta property="og:title" content={metadata.title} />
          <meta property="og:type" content={metadata.type} />
          <meta property="og:url" content={metadata.url} />
          <meta property="og:image" content={metadata.image} />
          <meta property="og:description" content={metadata.description} />

          {/* twitter card */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@maugowes" />
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.description} />
          <meta name="twitter:image" content={metadata.image} />

          {typeof metadata.jsonld == "object" ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(metadata.jsonld)
              }}
            />
          ) : null}

          {scripts.length > 0
            ? scripts.map((n, key) => {
                return <script src={n.src} key={key} />
              })
            : null}

          {process.env.NODE_ENV === "production" ? (
            <React.Fragment>
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
              />
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-138742898-1"
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-138742898-1');
            `
                }}
              />
            </React.Fragment>
          ) : null}
        </Head>

        <GlobalLayoutStyled>{children}</GlobalLayoutStyled>
      </React.Fragment>
    )
  }
}
