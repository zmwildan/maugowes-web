import Head from "next/head"
import React from "react"
import Styled from "styled-components"
import { color_black_main } from "../Const"

const GlobalLayoutStyled = Styled.div`
  font-family: 'Montserrat', sans-serif;
  color: ${color_black_main};

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
  .align-center {
    text-align: center;
  }
  [class~=col] {
    padding: 0;
    margin: 0;
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
`


const defaultMetadata = {
  title: "Mau Gowes - Maaaauuu..."
}

export default class HomeLayout extends React.Component {

  render = () => {
    const { children, metadata = defaultMetadata, script = []  } = this.props 

    return (
      <React.Fragment>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/static/img/fav-icon.png" type="image/x-icon" />
          <link rel="stylesheet" href="/static/vendor/gridlex/gridlex.min.css" />
          <link href="https://fonts.googleapis.com/css?family=Montserrat:300,500,700" rel="stylesheet" />
          <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/static/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/static/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

          <title>{metadata.title}</title>
          {
            script.length > 0 ?
              script.map((n, key) => {
                  return <script src={n.src} key={key}></script>
                })
            : null
          }
        </Head>

        <GlobalLayoutStyled>
          {children}
        </GlobalLayoutStyled>

      </React.Fragment>
    )
  }
}