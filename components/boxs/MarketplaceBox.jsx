import React from "react"
import Styled from "styled-components"
import CardProduct from "../cards/CardProduct"

const MarketplaceBoxStyled = Styled.div`
  margin-top: ${props => props.noMarginTop ? 0 : "50px"};
  h2 {
    font-size: 23px;
    margin-bottom: 30px;
  }
  .container-card-product {
    margin: 0 -1rem;
  }

`

export default props => {
  return (
    <MarketplaceBoxStyled noMarginTop={props.noMarginTop}>
      {props.title ? <div className="grid">
        <h2>{props.title}</h2>
      </div> : null}
      <div className="grid container-card-product">
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
    </MarketplaceBoxStyled>
  )
}
