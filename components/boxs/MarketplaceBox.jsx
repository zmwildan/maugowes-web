import React from "react"
import Styled from "styled-components"
import CardProduct from "../cards/CardProduct"

const MarketplaceBoxStyled = Styled.div`
  margin-top: 30px;
  h2 {
    font-size: 30px;
  }
  .container-card-product {
    margin: 0 -1rem;
  }

`

export default props => {
  return (
    <MarketplaceBoxStyled>
      <div className="grid">
        <h2>{props.title || "Marketplace"}</h2>
      </div>
      <div className="grid container-card-product">
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
    </MarketplaceBoxStyled>
  )
}
