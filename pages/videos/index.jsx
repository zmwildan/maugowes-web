import Styled from "styled-components"
import { connect } from "react-redux"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import VideoBox from "../../components/boxs/VideoBox"

import config from "../../config/index"
import fetch from "isomorphic-unfetch"
import { objToQuery } from "string-manager"
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
      // only call in server side
      const videosResponse = await fetch(
        `${
          config[process.env.NODE_ENV].host
        }/api/videos-db?limit=${MaxResults}`
      )
      const videos = await videosResponse.json()
      reduxStore.dispatch(fetchVideos(StoreFilter, videos))
    }

    return {}
  }

  // async componentDidMount() {
  //   const videosState = this.props.videos.list || {}
  //   if (!videosState.status) {
  //     this.props.dispatch(fetchVideos(StoreFilter))
  //     const videosResponse = await fetch(
  //       `${config[process.env.NODE_ENV].host}/api/videos-db?limit=${MaxResults}`
  //     )
  //     const videos = await videosResponse.json()
  //     this.props.dispatch(fetchVideos(StoreFilter, videos))
  //   }
  // }

  loadmoreHandler() {
    const videosState = this.props.videos.list || {}
    if (!videosState.is_loading && videosState.status == 200) {
      this.setState(
        {
          page: this.state.page + 1
        },
        async () => {
          this.props.dispatch(fetchVideos(StoreFilter))
          let reqQuery = {
            limit: MaxResults,
            page: this.state.page
          }
          const videoResponse = await fetch(
            `${config[process.env.NODE_ENV].host}/api/videos-db?${objToQuery(
              reqQuery
            )}
        `
          )
          const videos = await videoResponse.json()
          this.props.dispatch(fetchMoreVideos(StoreFilter, videos))
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
