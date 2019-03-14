import GlobalLayout from "../components/layouts/Global"
import DefaultLayout from "../components/layouts/Default"
import Styled from "styled-components"
import FullWidthHeader from "../components/boxs/FullWidthHeader"
import SidebarMarketplace from "../components/navigations/SidebarMarketplace"

const MarketplaceStyled = Styled.div`
  
`

class MarketplacePage extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <GlobalLayout>
        <DefaultLayout>
          <MarketplaceStyled>
            <FullWidthHeader 
              title="Mau Gowes Marketplace"
              text="Disini kamu bisa jual/beli berbagai part, aksesoris <br/> hal-hal lain yang berhubungan dengan sepeda"
              backgroundImage="/static/images/background/bg-bike-store.jpg"
            />
            <div style={{height: 50}} />
            <div className="grid">
              <div className="col-3">
                <SidebarMarketplace />
              </div>
              <div className="col-9">right</div>
            </div>
  
          </MarketplaceStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default MarketplacePage
