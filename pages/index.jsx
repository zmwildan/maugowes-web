import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
import { fetchVideos } from "../redux/videos/actions"
import { fetchBlog } from "../redux/blog/actions"
import { fetchBikes } from "../redux/bikes/actions"
import { progressBar } from "../modules/loaders"

// components
import GlobalLayout from "../components/layouts/Global"
import DefaultLayout from "../components/layouts/Default"
import Slider from "../components/slider/index"
import SliderItem from "../components/cards/CardHomeSlider"
// import MarketplaceBox from "../components/boxs/MarketplaceBox"
import GA from "../components/boxs/GA"
import BikesBox from "../components/boxs/BikesBox"
import BlogBox from "../components/boxs/BlogBox"
import VideosBox from "../components/boxs/VideosBox"
import Button from "../components/buttons/index"
import BannerBox from "../components/boxs/BannerHomeBox"

const HomePage = Styled.div`

`

class Home extends React.Component {
  static async getInitialProps({ req, reduxStore }) {
    if (req) {
      // only call in server side
      await reduxStore.dispatch(fetchVideos("new", { limit: 6 }))
      await reduxStore.dispatch(fetchBlog("new", { limit: 6 }))
      await reduxStore.dispatch(fetchBikes("new", { limit: 4 }))
    }

    return { props: true }
  }

  async componentDidMount() {
    const newVideos = this.props.videos.new || {}
    const newBlog = this.props.blog.new || {}
    const newBikes = this.props.bikes.new || {}

    if (!newVideos.status) this.props.dispatch(fetchVideos("new", { limit: 6 }))
    if (!newBlog.status) this.props.dispatch(fetchBlog("new", { limit: 6 }))
    if (!newBikes.status) this.props.dispatch(fetchBikes("new", { limit: 4 }))

    if (!newVideos.status || !newBlog.status || !newBikes.status) {
      progressBar.start()
    }
  }

  render() {
    const newBlog = this.props.blog.new || {}
    const newVideos = this.props.videos.new || {}
    const newBikes = this.props.bikes.new || {}

    if (newBlog.status && newVideos.status && newBikes.status) {
      progressBar.stop()
    }

    // progressBar.stop()
    return (
      <GlobalLayout>
        <DefaultLayout>
          <HomePage>
            {/* slider of featured */}
            <Slider speed={10000} className="grid">
              <SliderItem />
            </Slider>
            {/* slider of featured */}

            <GA adClient="ca-pub-4468477322781117" adSlot="2131764851" />

            {/* newest products */}
            {/* <MarketplaceBox title="Produk Baru Siap COD" />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/marketplace" text="Ke Marketplace" />
            </div> */}
            {/* end of newest products */}

            {/* videos */}
            <VideosBox hideAds data={newVideos} />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/videos" text="Lihat Video" />
            </div>
            {/* end of videos */}

            {/* banner of youtube and bike shop */}
            <BannerBox />
            {/* end of banner of youtube and bike shop */}

            {/* bikes */}
            <br />
            <BikesBox hideAds data={newBikes} size={"large"} />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/bikes" text="Bikes Lainnya" />
            </div>
            {/* end of bikes */}

            <GA
              style={{ marginTop: 30 }}
              adClient="ca-pub-4468477322781117"
              adSlot="2131764851"
            />

            {/* blog */}
            <BlogBox hideAds data={newBlog} />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/blog" text="Baca Blog" />
            </div>
            {/* end of blog */}
          </HomePage>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    videos: state.Videos,
    blog: state.Blog,
    bikes: state.Bikes,
  }
}

export default connect(mapStateToProps)(Home)
