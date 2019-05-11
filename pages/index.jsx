import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"

import GlobalLayout from "../components/layouts/Global"
import DefaultLayout from "../components/layouts/Default"
// import Slider from "../components/slider/index"
// import SliderItem from "../components/cards/CardHomeSlider"
// import MarketplaceBox from "../components/boxs/MarketplaceBox"
import BlogBox from "../components/boxs/BlogBox"
import VideoBox from "../components/boxs/VideoBox"
import Button from "../components/buttons/index"
import BannerBox from "../components/boxs/BannerHomeBox"

import config from "../config/index"
import fetch from "isomorphic-unfetch"
import { fetchVideos } from "../redux/videos/actions"
import { fetchBlog } from "../redux/blog/actions"

const HomePage = Styled.div`

`

class Home extends React.Component{

  static async getInitialProps({ reduxStore }) {

    if (typeof window == "undefined") {
      // only call in server side

      // request videos list
      const videosResponse = await fetch(
        `${config[process.env.NODE_ENV].host}/api/videos?maxResults=5`
      )
      const videos = await videosResponse.json()
      reduxStore.dispatch(fetchVideos("new", videos))

      // request news list
      const postsResponse = await fetch(
        `${config[process.env.NODE_ENV].host}/api/posts?limit=3`
      )
      const posts = await postsResponse.json()
      reduxStore.dispatch(fetchBlog("new", posts))
    }
   
    return {}
  }

  async componentDidMount() {
    const videosState = this.props.videos.new || {}

    if(!videosState.status) {
      this.props.dispatch(fetchVideos("new"))
      const videosResponse = await fetch(
        `${config[process.env.NODE_ENV].host}/api/videos?maxResults=5`
      )
      const videos = await videosResponse.json()
      this.props.reduxStore.dispatch(("new", videos))
    }

    this.props.dispatch(fetchBlog("new_bike_review"))
    this.props.dispatch(fetchBlog("new_review"))
    this.props.dispatch(fetchBlog("new_utak_atik"))

    // req new bike review
    const newBikeReviewReq = await fetch(
      `${config[process.env.NODE_ENV].host}/api/posts?limit=3&tag=review%20sepeda`
    )
    const newBikeReviewRes = await newBikeReviewReq.json()
    this.props.dispatch(fetchBlog("new_bike_review", newBikeReviewRes))

    // req new review
    const newReviewReq = await fetch(
      `${config[process.env.NODE_ENV].host}/api/posts?limit=3&tag=review%20lain`
    )
    const newReviewRes = await newReviewReq.json()
    this.props.dispatch(fetchBlog("new_review", newReviewRes))

    // req new utak atik
    const newUtakAtikReq = await fetch(
      `${config[process.env.NODE_ENV].host}/api/posts?limit=3&tag=utak%20atik`
    )
    const newUtakAtikRes = await newUtakAtikReq.json()
    this.props.dispatch(fetchBlog("new_utak_atik", newUtakAtikRes))


  }

  render() {
    return (
      <GlobalLayout>
        <DefaultLayout>
          <HomePage>
            {/* slider of featured */}
            {/* <Slider speed={10000} className="grid">
              <SliderItem />
            </Slider> */}
            {/* slider of featured */}
  
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
            <BlogBox title="Yang Baru di Review Part atau Aksesoris" data={this.props.blog.new_review || {}} />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/blog/tag/review" text="Baca Review Part / Aksesories" />
            </div>
            {/* end of part or accessories review */}

            {/* utak atik */}
            <BlogBox title="Yang Baru di Utak Atik" data={this.props.blog.new_utak_atik || {}} />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/blog/tag/review" text="Baca Utak Atik" />
            </div>
            {/* utak atik */}

            {/* bicycle review */}
            <BlogBox title="Yang Baru di Review Sepeda" data={this.props.blog.new_bike_review || {}} />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/blog/tag/review%20sepeda" text="Baca Review Sepeda" />
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
