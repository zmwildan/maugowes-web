import Styled from "styled-components"
import { connect } from "react-redux"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import VideoBox from "../../components/boxs/VideoBox"

import config from "../../config/index"
import fetch from "isomorphic-unfetch"
import { fetchVideos, fetchMoreVideos } from "../../redux/videos/actions"

const VideoStyled = Styled.div`
  
`

const StoreFilter = "list"
const MaxResults = 7

class VideosPage extends React.Component {
  static async getInitialProps({ reduxStore }) {
    if (typeof window == "undefined") {
      // only call in server side
      const videosResponse = await fetch(
        `${
          config[process.env.NODE_ENV].host
        }/api/videos?maxResults=${MaxResults}`
      )
      const videos = await videosResponse.json()
      reduxStore.dispatch(fetchVideos(StoreFilter, videos))
    }

    return {}
  }

  state = {
    isLoading: false
  }

  async componentDidMount() {
    const videosState = this.props.videos.list || {}
    if (!videosState.status) {
      this.props.dispatch(fetchVideos(StoreFilter))
      const videosResponse = await fetch(
        `${
          config[process.env.NODE_ENV].host
        }/api/videos?maxResults=${MaxResults}`
      )
      const videos = await videosResponse.json()
      this.props.dispatch(fetchVideos(StoreFilter, videos))
    }
  }

  async loadmoreHandler() {
    const videosState = this.props.videos[StoreFilter] || {}
    if (!videosState.is_loading && videosState.nextPageToken) {
      console.log("video", videosState)
      console.log("load more content...")
      this.props.dispatch(fetchMoreVideos(StoreFilter))
      const videosResponse = await fetch(
        `${config[process.env.NODE_ENV].host}/api/videos?nextPageToken=${
          videosState.nextPageToken
        }&maxResults=${MaxResults}`
      )
      const videos = await videosResponse.json()
      this.props.dispatch(fetchMoreVideos(StoreFilter, videos))
    }
  }

  render() {
    const videos = this.props.videos[StoreFilter] || {}
    return (
      <GlobalLayout>
        <DefaultLayout>
          <VideoStyled>
            <Header
              title="Mau Gowes Video"
              text="Nikmati tontonan Dari Mau Gowes. Semoga kamu semakin termotivasi setelah menonton ini ya."
              backgroundImage="/static/images/background/bg-bike-store.jpg"
            />
            <VideoBox
              data={videos}
              loadmoreHandler={() => this.loadmoreHandler()}
              noHeaderTitle
            />
          </VideoStyled>
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

export default connect(mapStateToProps)(VideosPage)
