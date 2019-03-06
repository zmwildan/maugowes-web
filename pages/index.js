import Styled from "styled-components"

import HomeLayout from "../components/layouts/Home"
import Header from "../components/navigations/Header"
import Slider from "../components/slider/index"
import SliderItem from "../components/cards/CardHomeSlider"
import MarketplaceBox from "../components/boxs/MarketplaceBox"

const HomePage = Styled.div`

`

function home() {
  return (
    <HomeLayout>
      <HomePage>
        <div className="container">
          <Header />

          {/* slider of featured */}
          <div className="grid">
            <Slider speed={10000} className="col">
              <SliderItem />
            </Slider>
          </div>
          {/* slider of featured */}


          {/* newest products */}
          <MarketplaceBox />
          {/* end of newest products */}
        </div>
      </HomePage>
    </HomeLayout>
  )
}

export default home
