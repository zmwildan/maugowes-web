import Styled from "styled-components"
import { connect } from "react-redux"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import VideosBox from "../../components/boxs/VideosBox"
import GA from "../../components/boxs/GA"

import config from "../../config/index"
import fetch from "isomorphic-unfetch"
import { fetchVideos, fetchMoreVideos } from "../../redux/videos/actions"
import { objToQuery } from "string-manager/dist/modules/httpquery"

const VideoStyled = Styled.div`
  
`

const StoreFilter = "list"
const MaxResults = 7

class VideosPage extends React.Component {
  state = {
    page: 1,
  }

  static async getInitialProps({ reduxStore, query }) {
    if (typeof window == "undefined") {
      const { endpoint, type } = fetchVideos()["CALL_API"]
      const reqQuery = requestQueryGenerator(query)

      // only call in server side
      const videosResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${endpoint}?${objToQuery(
          reqQuery
        )}`
      )

      const videos = await videosResponse.json()

      reduxStore.dispatch({
        type,
        filter: StoreFilter,
        data: videos,
      })
    }

    return {
      query,
    }
  }

  componentDidMount() {
    const videos = this.props.videos[StoreFilter] || {}
    if (!videos.status && !videos.loading) {
      const query = requestQueryGenerator()
      this.props.dispatch(fetchVideos(StoreFilter, query))
    }
  }

  loadmoreHandler() {
    const videosState = this.props.videos.list || {}
    if (!videosState.is_loading && videosState.status == 200) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          let reqQuery = {
            limit: MaxResults,
            page: this.state.page,
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
          keywords: "video maugowes,youtube maugowes,gowes,sepeda",
        }}>
        <DefaultLayout>
          <VideoStyled>
            <Header
              title="Mau Gowes Video"
              text="Nikmati tontonan Dari Mau Gowes. Semoga kamu semakin termotivasi setelah menonton ini ya."
              backgroundImage="/static/images/cover/cover-videos.jpeg"
            />
            <VideosBox
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

export function requestQueryGenerator(query = {}) {
  let reqQuery = {
    page: 1,
    limit: MaxResults,
  }

  return reqQuery
}

const mapStateToProps = (state) => {
  return {
    videos: state.Videos,
  }
}

export default connect(mapStateToProps)(VideosPage)
