import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
import { nl2br } from "string-manager"
// import { color_black_main, color_white_main } from "../../components/Const"
import config from "../../config/index"

// redux
import { fetchVideoDetail, fetchVideos } from "../../redux/videos/actions"

// layouts
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"

// components
import VideoSSBox from "../../components/boxs/VideoSuperSmallBox"
import DisqusBox from "../../components/boxs/Disqus"
import ShareBox from "../../components/boxs/Share"
import Loader from "../../components/Loader"
import GA from "../../components/boxs/GA"

const VideoDetailStyled = Styled.div`
  .video-title {
    padding: 5px 20px;
    margin: 0 -8px;
    h1 {
      font-weight: 400;
      line-height: 1.3;
    }
  }

  .video-player {
    display: flex;
    justify-content: center;
    background: #000;
    padding: 20px;
    margin: 0 -8px;
    
    iframe {
      width: 100%;
      height: 500px;
    }

    // responsive section
    // gridlex _xs
    @media (max-width: 36em) {
      iframe {
        width: 100%;
        height: 300px;
      }
    }
    // gridlex _sm
    @media (max-width: 48em) {
      iframe {
        width: 100%;
        height: 300px;
      }
    }
  }
`

function getId(title) {
  let titleArr = title.split("-")
  return titleArr[titleArr.length - 1]
}

class VideoDetail extends React.Component {
  static async getInitialProps({ reduxStore, res, query }) {
    if (typeof window == "undefined") {
      const id = getId(query.id)
      const { type, endpoint } = fetchVideoDetail(id)["CALL_API"]
      //  only call in server side
      const videoResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${endpoint}`
      )
      const video = await videoResponse.json()
      reduxStore.dispatch({
        type,
        filter: id,
        data: video,
      })
    }

    return { id: query.id }
  }

  state = {}

  async componentDidMount() {
    this.setState({ windowReady: true })

    const videoRelatedState = this.props.videos.related || {}
    if (!videoRelatedState.status) {
      return this.props.dispatch(
        fetchVideos("related", {
          limit: 4,
          page: 1,
          notId: getId(this.props.id),
        })
      )
    }
  }

  render() {
    const id = getId(this.props.id)
    const data = this.props.videos[id] || {}
    const relatedData = this.props.videos.related || {}

    let metadata = {}

    if (data && data.status == 200) {
      metadata = {
        title: data.title,
        description: data.description,
        image: data.thumbnails.high,
        keywords: "video,maugowes,youtube",
        jsonld: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: data.title,
          alternativeHeadline: data.title,
          image: data.thumbnails.high,
          genre: "cycling,bicycle,sepeda,gowes",
          keywords: "video,maugowes,youtube",
          wordcount: data.description.length,
          publisher: {
            "@type": "Organization",
            name: "Mau Gowes",
            logo: {
              "@type": "ImageObject",
              url: "https://maugowes.com/static/icons/icon-512x512.png",
              height: "500",
              width: "500",
            },
          },
          url: `https://maugowes.com/videos/${this.props.id}`,
          datePublished: new Date(data.publishedDate).toISOString(),
          dateCreated: new Date(data.publishedDate).toISOString(),
          dateModified: new Date(data.publishedDate).toISOString(),
          description: data.description,
          author: {
            "@type": "Organization",
            name: "Mau Gowes",
          },
        },
      }
    } else {
      metadata = {
        title: "Video tidak ditemukan",
        description:
          "Maaf video yang kamu tuju tidak ditemukan, silahkan cek url sekali lagi, bisa juga karena video telah di hapus.",
      }
    }

    return (
      <GlobalLayout metadata={metadata}>
        <DefaultLayout>
          <VideoDetailStyled>
            {data.satus ? (
              <Loader />
            ) : data.status === 200 ? (
              <React.Fragment>
                {/* video detail */}
                <div className="grid-center">
                  <div className="col-7_xs-12">
                    <div className="video-title">
                      <h1>{data.title}</h1>
                    </div>
                  </div>
                </div>

                <div className="grid-center" style={{ background: "#000" }}>
                  <div className="col-10_xs-12">
                    <div className="video-player">
                      <iframe
                        src={`https://youtube.com/embed/${data.id}`}
                        frameBorder={0}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                <GA
                  style={{ margin: "30px 0" }}
                  adClient="ca-pub-4468477322781117"
                  adSlot="2754181340"
                />

                <div className="grid-center">
                  <div className="col-7_xs-12">
                    <p
                      style={{
                        lineHeight: 1.8,
                        wordBreak: "break-all",
                        padding: "25px 0 0",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: nl2br(data.description),
                      }}
                    />

                    <div className="grid" id="share-box">
                      <div className="col-12">
                        <ShareBox
                          url={`https://maugowes.com/videos/${this.props.id}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* end of video detail */}

                <VideoSSBox title="Video Lainnya" data={relatedData} />

                <GA
                  style={{ marginBottom: 0 }}
                  adClient="cca-pub-4468477322781117"
                  adSlot="2754181340"
                />

                <div className="m-t-50" />

                <div className="grid-center" id="comment-box">
                  <div className="col-7_xs-12 blog-detail_comment">
                    {this.state.windowReady ? (
                      <DisqusBox
                        url={`${window.location.origin}/videos/${this.props.id}`}
                        identifier={`maugowes-video-${id}`}
                      />
                    ) : null}
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <Loader text={data.messages} />
            )}
            {/* end of comment */}
          </VideoDetailStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

const mapsStateToProps = (state) => {
  return {
    videos: state.Videos,
  }
}

export default connect(mapsStateToProps)(VideoDetail)
