import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
import config from "../config/index"
import fetch from "isomorphic-unfetch"
import { fetchVideos } from "../redux/videos/actions"
import { fetchBlog } from "../redux/blog/actions"

// components
import GlobalLayout from "../components/layouts/Global"
import DefaultLayout from "../components/layouts/Default"
import Slider from "../components/slider/index"
import SliderItem from "../components/cards/CardHomeSlider"
// import MarketplaceBox from "../components/boxs/MarketplaceBox"
import BlogBox from "../components/boxs/BlogBox"
import VideoBox from "../components/boxs/VideoBox"
import Button from "../components/buttons/index"
import BannerBox from "../components/boxs/BannerHomeBox"
import GA from "../components/boxs/GA"

const HomePage = Styled.div`

`

class Home extends React.Component {
  static async getInitialProps({ reduxStore }) {
    if (typeof window == "undefined") {
      // only call in server side

      // request videos list
      const videosResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${
          fetchVideos()["CALL_API"].endpoint
        }limit=5`
      )
      const videos = await videosResponse.json()
      reduxStore.dispatch({
        type: fetchVideos()["CALL_API"].type,
        filter: "new",
        data: videos
      })

      // request news list
      const postsResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${
          fetchBlog()["CALL_API"].endpoint
        }limit=6`
      )
      const posts = await postsResponse.json()
      reduxStore.dispatch({
        type: fetchBlog()["CALL_API"].type,
        filter: "new",
        data: posts
      })
    }

    return {}
  }

  async componentDidMount() {
    // const videosState = this.props.videos.new || {}

    // if(!videosState.status) {
    //   this.props.dispatch(fetchVideos("new", {maxResults: 5}))
    // }

    // req new bike review
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
    return (
      <GlobalLayout>
        <DefaultLayout>
          <HomePage>
            {/* slider of featured */}
            <Slider speed={10000} className="grid">
              <SliderItem />
            </Slider>
            {/* slider of featured */}

            {/* google adsense */}
            <GA />
            {/* end of google adsense */}

            {/* newest products */}
            {/* <MarketplaceBox title="Produk Baru Siap COD" />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/marketplace" text="Ke Marketplace" />
            </div> */}
            {/* end of newest products */}

            {/* videos */}
            <VideoBox data={this.props.videos.new || {}} />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/videos" text="Lihat Video" />
            </div>
            {/* end of videos */}

            {/* banner of youtube and bike shop */}
            <BannerBox />
            {/* end of banner of youtube and bike shop */}

            {/* blog */}
            <BlogBox data={this.props.blog.new || {}} />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/blog" text="Baca Blog" />
            </div>
            {/* end of blog */}

            {/* part or accessories review */}
            <BlogBox
              title="Yang Baru di Review Part atau Aksesoris"
              data={this.props.blog.new_review || {}}
            />
            <div className="grid-center p-t-30 p-b-50">
              <Button
                type="link"
                target="/blog/tag/review%20lain"
                text="Baca Review Part / Aksesories"
              />
            </div>
            {/* end of part or accessories review */}

            {/* utak atik */}
            <BlogBox
              title="Yang Baru di Cara - Cara"
              data={this.props.blog.new_cara_cara || {}}
            />
            <div className="grid-center p-t-30 p-b-50">
              <Button
                type="link"
                target="/blog/tag/cara%20cara"
                text="Baca Cara Cara"
              />
            </div>
            {/* utak atik */}

            {/* bicycle review */}
            <BlogBox
              title="Yang Baru di Review Sepeda"
              data={this.props.blog.new_bike_review || {}}
            />
            <div className="grid-center p-t-30 p-b-50">
              <Button
                type="link"
                target="/blog/tag/review%20sepeda"
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

const mapStateToProps = state => {
  return {
    videos: state.Videos,
    blog: state.Blog
  }
}

export default connect(mapStateToProps)(Home)
