import Styled from "styled-components"

import GlobalLayout from "../components/layouts/Global"
import Header from "../components/navigations/Header"
import Footer from "../components/navigations/Footer"
import Slider from "../components/slider/index"
import SliderItem from "../components/cards/CardHomeSlider"
import MarketplaceBox from "../components/boxs/MarketplaceBox"
import BlogBox from "../components/boxs/BlogBox"
import Button from "../components/buttons/index"

const HomePage = Styled.div`

`

function home() {
  return (
    <GlobalLayout>
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
            <Button onClick={() => location.href="/marketplace"} text="Ke Marketplace" />
          </div>
          {/* end of newest products */}

          {/* blog */}
          <BlogBox />
          <div className="grid-center p-t-30 p-b-50">
            <Button onClick={() => location.href="/blog"} text="Ke Blog" />
          </div>
          {/* end of blog */}

          <Footer />
        </div>
      </HomePage>
    </GlobalLayout>
  )
}

export default home
