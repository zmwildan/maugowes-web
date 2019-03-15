import GlobalLayout from "../components/layouts/Global"
import DefaultLayout from "../components/layouts/Default"
import Styled from "styled-components"
import Header from "../components/boxs/FullWidthHeader"
import Sidebar from "../components/navigations/SidebarMarketplace"
import Filter from "../components/filter/FilterMartketplace"
import Product from "../components/cards/RowProduct"
import Pagination from "../components/navigations/Pagination"

const MarketplaceStyled = Styled.div`
  
`

class MarketplacePage extends React.Component {

  render() {
    return (
      <GlobalLayout>
        <DefaultLayout>
          <MarketplaceStyled>
            <Header 
              title="Mau Gowes Marketplace"
              text="Disini kamu bisa jual/beli berbagai part, aksesoris <br/> hal-hal lain yang berhubungan dengan sepeda"
              backgroundImage="/static/images/background/bg-bike-store.jpg"
            />
            <div style={{height: 50}} />
            <div className="grid">
              <div className="col-3">
                <Sidebar />
              </div>
              <div className="col-9">
                {/* product filter */}
                <Filter />
                {/* end of product filter */}

                {/* product literation */}
                {(() => {
                  let El = []
                  for(let n = 0; n < 20;n++) {
                    El.push(<Product key={n} />)
                  }
                  return El
                })()}
                {/* end of product literation */}
                <Pagination />
                {/* pagination */}
                {/* end of pagination */}
              </div>
            </div>
          </MarketplaceStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default MarketplacePage
