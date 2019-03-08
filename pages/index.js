import Styled from "styled-components"

import HomeLayout from "../components/layouts/Home"
import Header from "../components/navigations/Header"
import Footer from "../components/navigations/Footer"
import Slider from "../components/slider/index"
import SliderItem from "../components/cards/CardHomeSlider"
import MarketplaceBox from "../components/boxs/MarketplaceBox"
import Button from "../components/buttons/index"

const HomePage = Styled.div`

`

function home() {
  return (
    <HomeLayout>
      <HomePage>
        <div className="container">
          <Header />

          {/* slider of featured */}
          <Slider speed={10000} className="grid">
            <SliderItem />
          </Slider>
          {/* slider of featured */}


          {/* newest products */}
          <MarketplaceBox title="Produk Baru Siap COD" />
          <div className="grid-center p-t-30 p-b-50">
            <Button text="Ke Marketplace" />
          </div>
          {/* end of newest products */}

          <Footer />
        </div>
      </HomePage>
    </HomeLayout>
  )
}

export default home
