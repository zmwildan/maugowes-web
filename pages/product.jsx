import React from "react"

import GlobalLayout from "../components/layouts/Global"
import DefaultLayout from "../components/layouts/Default"
import Styled from "styled-components"

const MarketplaceStyled = Styled.div`
`

class ProductPage extends React.Component {
  static async getInitialProps({query}) {
    return {id: query.id}
  }
  render(){
    return (
      <GlobalLayout>
        <DefaultLayout>
          <MarketplaceStyled>
            <div>this is product with id {this.props.id}</div>
          </MarketplaceStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default ProductPage
