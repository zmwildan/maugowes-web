import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { fetchVideos, fetchMoreVideos } from "../../redux/videos/actions"
import { progressBar } from "../../modules/loaders"

// components
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import VideosBox from "../../components/boxs/VideosBox"

const StoreFilter = "list"
const MaxResults = 12

const Breadcrumb = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/videos",
    title: "Videos",
  },
]

const VideosPage = (props) => {
  const [page, setPage] = useState(1)

  const videos = props.videos[StoreFilter] || {}
  if (videos.status) {
    progressBar.stop()
  }

  const loadmoreHandler = () => {
    const videosState = props.videos.list || {}
    if (!videosState.is_loading && videosState.status == 200) {
      const nextPage = page + 1

      setPage(nextPage)

      let reqQuery = {
        limit: MaxResults,
        page: nextPage,
      }

      props.dispatch(fetchMoreVideos(StoreFilter, reqQuery))
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const videos = props.videos[StoreFilter] || {}
      if (!videos.status) progressBar.start()
      if (!videos.status && !videos.loading) {
        let query = requestQueryGenerator()
        props.dispatch(fetchVideos(StoreFilter, query))
      }
    }
  }, [])

  return (
    <GlobalLayout
      metadata={{
        title: "Video - Mau Gowes",
        description: "Video - Video dari channel Youtube Mau Gowes",
        keywords: "video maugowes,youtube maugowes,gowes,sepeda",
      }}>
      <DefaultLayout>
        <>
          <Header
            title="Videos - Mau Gowes"
            text="Nikmati tontonan dari Mau Gowes."
            breadcrumb={Breadcrumb}
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
            loadmoreHandler={() => loadmoreHandler()}
            maxResults={MaxResults}
            noHeaderTitle
          />
        </>
      </DefaultLayout>
    </GlobalLayout>
  )
}

VideosPage.getInitialProps = async ({ req, reduxStore, query }) => {
  if (req) {
    let reqQuery = requestQueryGenerator(query)
    await reduxStore.dispatch(fetchVideos(StoreFilter, reqQuery))
  }

  return {
    query,
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
