import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
import { fetchVideos } from "../redux/videos/actions"
import { fetchBlog } from "../redux/blog/actions"
import { progressBar } from "../modules/loaders"

// components
import GlobalLayout from "../components/layouts/Global"
import DefaultLayout from "../components/layouts/Default"
import Slider from "../components/slider/index"
import SliderItem from "../components/cards/CardHomeSlider"
// import MarketplaceBox from "../components/boxs/MarketplaceBox"
import GA from "../components/boxs/GA"
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
    }

    return { props: true }
  }

  async componentDidMount() {
    const newVideos = this.props.videos.new || {}
    const newBlog = this.props.blog.new || {}
    const newReview = this.props.blog.new_review || {}
    const newCara = this.props.blog.new_cara_cara || {}
    const newBikeReview = this.props.blog.new_bike_review || {}

    if (!newVideos.status) this.props.dispatch(fetchVideos("new", { limit: 6 }))
    if (!newBlog.status) this.props.dispatch(fetchBlog("new", { limit: 6 }))
    if (!newReview.status || !newCara.status || !newBikeReview.status) {
      progressBar.start()
    }

    this.props.dispatch(
      fetchBlog("new_bike_review", { limit: 3, tag: "review sepeda" })
    )
    this.props.dispatch(
      fetchBlog("new_review", { limit: 3, tag: "review lain" })
    )
    this.props.dispatch(
      fetchBlog("new_cara_cara", { limit: 3, tag: "cara cara" })
    )
  }

  render() {
    const newReview = this.props.blog.new_review || {}
    const newCara = this.props.blog.new_cara_cara || {}
    const newBikeReview = this.props.blog.new_bike_review || {}
    if (newBikeReview.status && newCara.status && newReview.status) {
      progressBar.stop()
    }
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
            <VideosBox hideAds data={this.props.videos.new || {}} />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/videos" text="Lihat Video" />
            </div>
            {/* end of videos */}

            {/* banner of youtube and bike shop */}
            <BannerBox />
            {/* end of banner of youtube and bike shop */}

            <GA
              style={{ marginTop: 30 }}
              adClient="ca-pub-4468477322781117"
              adSlot="2131764851"
            />

            {/* blog */}
            <BlogBox hideAds data={this.props.blog.new || {}} />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/blog" text="Baca Blog" />
            </div>
            {/* end of blog */}

            {/* part or accessories review */}
            <BlogBox
              hideAds
              title="Yang Baru di Review Part atau Aksesoris"
              data={newReview}
            />
            <div className="grid-center p-t-30 p-b-50">
              <Button
                type="link"
                targetAs="/blog/tag/review%20lain"
                target="/blog/tag/[tag]"
                text="Baca Review Part / Aksesories"
              />
            </div>
            {/* end of part or accessories review */}

            {/* utak atik */}
            <BlogBox hideAds title="Yang Baru di Cara - Cara" data={newCara} />
            <div className="grid-center p-t-30 p-b-50">
              <Button
                type="link"
                targetAs="/blog/tag/cara%20cara"
                target="/blog/tag/[tag]"
                text="Baca Cara Cara"
              />
            </div>
            {/* utak atik */}

            {/* bicycle review */}
            <BlogBox
              hideAds
              title="Yang Baru di Review Sepeda"
              data={newBikeReview}
            />
            <div className="grid-center p-t-30 p-b-50">
              <Button
                type="link"
                targetAs="/blog/tag/review%20sepeda"
                target="/blog/tag/[tag]"
                text="Baca Review Sepeda"
              />
            </div>
            {/* bicycle review */}
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
  }
}

export default connect(mapStateToProps)(Home)
