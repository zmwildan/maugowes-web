import Styled from "styled-components"
import { connect } from "react-redux"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import VideoBox from "../../components/boxs/VideoBox"
import GA from "../../components/boxs/GA"

import config from "../../config/index"
import fetch from "isomorphic-unfetch"
import { fetchVideos, fetchMoreVideos } from "../../redux/videos/actions"

const VideoStyled = Styled.div`
  
`

const StoreFilter = "list"
const MaxResults = 7

class VideosPage extends React.Component {
  state = {
    page: 1
  }

  static async getInitialProps({ reduxStore }) {
    if (typeof window == "undefined") {
      const { endpoint, type } = fetchVideos()["CALL_API"]

      // only call in server side
      const videosResponse = await fetch(
        `${
          config[process.env.NODE_ENV].host
        }${endpoint}?page=1&limit=${MaxResults}`
      )

      const videos = await videosResponse.json()

      reduxStore.dispatch({
        type,
        filter: StoreFilter,
        data: videos
      })
    }

    return {}
  }

  loadmoreHandler() {
    const videosState = this.props.videos.list || {}
    if (!videosState.is_loading && videosState.status == 200) {
      this.setState(
        {
          page: this.state.page + 1
        },
        () => {
          let reqQuery = {
            limit: MaxResults,
            page: this.state.page
          }

          this.props.dispatch(fetchMoreVideos(StoreFilter, reqQuery))
        }
      )
    }
  }

  render() {
    const videos = this.props.videos[StoreFilter] || {}
    return (
      <GlobalLayout
        metadata={{
          title: "Video - Mau Gowes",
          description: "Video - video terbaru dari channel Youtube Mau Gowes",
          keywords: "video maugowes,youtube maugowes,gowes,sepeda"
        }}>
        <DefaultLayout>
          <VideoStyled>
            <Header
              title="Mau Gowes Video"
              text="Nikmati tontonan Dari Mau Gowes. Semoga kamu semakin termotivasi setelah menonton ini ya."
              backgroundImage="/static/images/background/bg-bike-store.jpg"
            />
            <GA adClient="ca-pub-4468477322781117" adSlot="4886894471" />
            <VideoBox
              data={videos}
              loadmoreHandler={() => this.loadmoreHandler()}
              maxResults={MaxResults}
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
