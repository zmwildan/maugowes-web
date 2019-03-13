import GlobalLayout from "../components/layouts/Global"
import DefaultLayout from "../components/layouts/Default"
import Styled from "styled-components"

const MarketplaceStyled = Styled.div`
`

const MarketplacePage = props => {
  return (
    <GlobalLayout>
      <DefaultLayout>
        <MarketplaceStyled>
          <div>this is marketplace</div>
        </MarketplaceStyled>
      </DefaultLayout>
    </GlobalLayout>
  )
}

export default MarketplacePage
