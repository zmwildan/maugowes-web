import Styled from "styled-components"
import { connect } from "react-redux"
import { fetchVideos, fetchMoreVideos } from "../../redux/videos/actions"
import { progressBar } from "../../modules/loaders"

// components
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import VideosBox from "../../components/boxs/VideosBox"

const VideoStyled = Styled.div`
  
`

const StoreFilter = "list"
const MaxResults = 12

class VideosPage extends React.Component {
  state = {
    page: 1,
  }

  static async getInitialProps({ req, reduxStore, query }) {
    if (req) {
      let reqQuery = requestQueryGenerator(query)
      await reduxStore.dispatch(fetchVideos(StoreFilter, reqQuery))
    }

    return {
      query,
    }
  }

  componentDidMount() {
    const videos = this.props.videos[StoreFilter] || {}
    if (!videos.status) progressBar.start()
    if (!videos.status && !videos.loading) {
      let query = requestQueryGenerator()
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
    if (videos.status) {
      progressBar.stop()
    }
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
              title="Videos - Mau Gowes"
              text="Nikmati tontonan Dari Mau Gowes. Semoga kamu semakin termotivasi setelah menonton ini ya."
              stats={{
                suffix: "video",
                total: videos.total || 0,
                show:
                  videos.results && videos.results.length
                    ? videos.results.length
                    : 0,
              }}
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
