import React from "react"
import Styled from "styled-components"
import CardProduct from "../cards/CardProduct"

const MarketplaceBoxStyled = Styled.div`
  margin-top: 30px;
  h2 {
    font-size: 30px;
  }
`

export default props => {
  return (
    <MarketplaceBoxStyled>
      <div className="grid">
        <h2>Marketplace</h2>
      </div>
      <div className="grid">
        <CardProduct />
      </div>
    </MarketplaceBoxStyled>
  )
}