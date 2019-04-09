import React from "react"
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

import config from "../config/index"
import fetch from "isomorphic-unfetch"
import { fetchVideos } from "../redux/videos/actions"

const HomePage = Styled.div`

`

class Home extends React.Component{

  static async getInitialProps({ reduxStore }) {

    if (typeof window == "undefined") {
      // only call in server side
      const videosResponse = await fetch(
        `${config[process.env.NODE_ENV].host}/api/videos?maxResults=3`
      )
      const videos = await videosResponse.json()
      reduxStore.dispatch(fetchVideos("new", videos))
    }
   
    return { reduxStore }
  }

  async componentDidMount() {
    const videosState = this.props.videos.new || {}

    if(!videosState.status) {
      this.props.reduxStore.dispatch(fetchVideos("new"))
      const videosResponse = await fetch(
        `${config[process.env.NODE_ENV].host}/api/videos?maxResults=3`
      )
      const videos = await videosResponse.json()
      this.props.reduxStore.dispatch(("new", videos))
    }
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
  
            {/* newest products */}
            <MarketplaceBox title="Produk Baru Siap COD" />
            <div className="grid-center p-t-30 p-b-50">
              <Button type="link" target="/marketplace" text="Ke Marketplace" />
            </div>
            {/* end of newest products */}
  
            {/* videos */}
            <VideoBox data={this.props.videos.new || {}} />
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
}

const mapStateToProps = state => {
  return {
    videos: state.Videos
  }
}

export default connect(mapStateToProps)(Home)
