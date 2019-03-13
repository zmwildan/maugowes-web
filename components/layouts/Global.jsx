import Head from "next/head"
import React from "react"
import Styled from "styled-components"
import { color_black_main } from "../Const"

const GlobalLayoutStyled = Styled.div`
  font-family: 'Montserrat', sans-serif;
  color: ${color_black_main};
  
  // global class
  .container {
    width: 1000px;
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
  title: "Mau Gowes - Yuk Mari"
}

export default class HomeLayout extends React.Component {

  render = () => {
    const { children, metadata = defaultMetadata  } = this.props 

    return (
      <React.Fragment>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/static/img/fav-icon.png" type="image/x-icon" />
          <link rel="stylesheet" href="/static/vendor/gridlex/gridlex.min.css" />
          <link href="https://fonts.googleapis.com/css?family=Montserrat:300,500,700" rel="stylesheet" />
          <title>{metadata.title}</title>
        </Head>

        <GlobalLayoutStyled>
          {children}
        </GlobalLayoutStyled>

      </React.Fragment>
    )
  }
}