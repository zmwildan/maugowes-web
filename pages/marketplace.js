import GlobalLayout from "../components/layouts/Global"
import Styled from "styled-components"

const MarketplaceStyled = Styled.div`
`

const MarketplacePage = props => {
  return (
    <GlobalLayout>
      <MarketplaceStyled>
        <div>this is marketplace</div>
      </MarketplaceStyled>
    </GlobalLayout>
  )
}

export default MarketplacePage
