import Styled from "styled-components"
import { connect } from "react-redux"

import GlobalLayout from "../components/layouts/Global"
import DefaultLayout from "../components/layouts/Default"
import Slider from "../components/slider/index"
import SliderItem from "../components/cards/CardHomeSlider"
import MarketplaceBox from "../components/boxs/MarketplaceBox"
import BlogBox from "../components/boxs/BlogBox"
import VideoBox from "../components/boxs/VideoBox"
import Button from "../components/buttons/index"

const HomePage = Styled.div`

`

function home() {
  return (
    <GlobalLayout>
      <DefaultLayout>
        <HomePage>
          {/* slider of featured */}
          <Slider speed={10000} className="grid">
            <SliderItem />
          </Slider>
          {/* slider of featured */}

          {/* newest products */}
          <MarketplaceBox title="Produk Baru Siap COD" />
          <div className="grid-center p-t-30 p-b-50">
            <Button type="link" target="/marketplace" text="Ke Marketplace" />
          </div>
          {/* end of newest products */}

          {/* videos */}
          <VideoBox />
          <div className="grid-center p-t-30 p-b-50">
            <Button type="link" target="/videos" text="Lihat Video" />
          </div>
          {/* end of videos */}

          {/* blog */}
          <BlogBox />
          <div className="grid-center p-t-30 p-b-50">
            <Button type="link" target="/blog" text="Baca Blog" />
          </div>
          {/* end of blog */}
        </HomePage>
      </DefaultLayout>
    </GlobalLayout>
  )
}

const mapStateToProps = state => {
  return {
    videos: state.Videos
  }
}

export default connect()(home)
