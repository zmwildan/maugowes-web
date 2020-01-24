import React from "react"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import DayJs from "dayjs"
import DisqusBox from "../../components/boxs/Disqus"
import ShareBox from "../../components/boxs/Share"
import Loader from "../../components/Loader"
import GA from "../../components/boxs/GA"

import { connect } from "react-redux"
import { fetchEventDetail } from "../../redux/events/actions"
import config from "../../config/index"
import fetch from "isomorphic-unfetch"
import ShareIcon from "../../components/icons/Share"
import CommentIcon from "../../components/icons/Comment"
import EyeIcon from "../../components/icons/Eye"
import { BlogDetailStyled } from "../blog/detail"
import InputLocation from "../../components/form/InputLocation"
import Label from "../../components/labels"

function getId(title) {
  let titleArr = title.split("-")
  return titleArr[titleArr.length - 1]
}

class EventDetail extends React.Component {
  state = {}

  static async getInitialProps({ reduxStore, res, query }) {
    if (typeof window == "undefined") {
      const id = getId(query.id)
      const { type, endpoint } = fetchEventDetail(id)["CALL_API"]
      //  only call in server side
      const postsResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${endpoint}`
      )
      const posts = await postsResponse.json()
      reduxStore.dispatch({
        type,
        filter: id,
        data: posts
      })
    }

    return { id: query.id }
  }

  async componentDidMount() {
    this.setState({ windowReady: true })
  }

  render() {
    const id = getId(this.props.id)
    const data = this.props.event[id] || {}

    let metadata = {}

    if (data && data.status === 200) {
      metadata = {
        title: data.title,
        // description: data.truncatedContent,
        image: data.poster.original,
        // keywords: data.tags.toString(),
        jsonld: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: data.title,
          alternativeHeadline: data.title,
          image: data.poster.original,
          genre: "cycling,bicycle,sepeda,gowes",
          keywords: "gowes bareng,info gobar,info gowes",
          wordcount: data.note ? data.note.length : 0,
          publisher: {
            "@type": "Organization",
            name: "Mau Gowes",
            logo: {
              "@type": "ImageObject",
              url: "https://maugowes.com/static/icons/icon-512x512.png",
              height: "500",
              width: "500"
            }
          },
          url: `https://maugowes.com${data.link}`,
          datePublished: new Date(data.created_on * 1000).toISOString(),
          dateCreated: new Date(data.created_on * 1000).toISOString(),
          dateModified: new Date(data.updated_on * 1000).toISOString(),
          // description: data.truncatedContent,
          author: {
            "@type": "Organization",
            name: "Mau Gowes"
          }
        }
      }
    } else {
      metadata = {
        title: "Event tidak ditemukan",
        description:
          "Maaf event yang kamu tuju tidak ditemukan, silahkan cek url sekali lagi, bisa juga karena event telah di hapus."
      }
    }

    return (
      <GlobalLayout metadata={metadata}>
        <DefaultLayout>
          <BlogDetailStyled className="blog-detail">
            {!data.status ? (
              <Loader />
            ) : data.status === 200 ? (
              <React.Fragment>
                <GA
                  style={{ marginBottom: 0 }}
                  adClient="ca-pub-4468477322781117"
                  adSlot="4316048838"
                />
                <div className="grid-center">
                  <div className="col-7_xs-12">
                    <h1>
                      {data.title}{" "}
                      {data.is_ended ? (
                        <Label
                          style={{
                            fontSize: 20,
                            position: "absolute",
                            margin: "7.5px 0 0 10px"
                          }}
                          status={"ended_event"}
                          text={"Telah berakhir"}
                        />
                      ) : null}
                    </h1>

                    {/* post meta */}
                    <div className="blog-detail_meta">
                      <span className="blog-detail_meta_item">
                        <EyeIcon width="30" height="30" />
                        <span>{data.views}</span>
                      </span>

                      <span className="blog-detail_meta_item">
                        <a
                          onClick={() => {
                            document
                              .getElementById("comment-box")
                              .scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                              })
                          }}
                          href="javascript:;">
                          <CommentIcon width="30" height="30" />
                          <span>0</span>
                        </a>
                      </span>

                      <span className="blog-detail_meta_item">
                        <a
                          onClick={() => {
                            document
                              .getElementById("share-box")
                              .scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                              })
                          }}
                          href="javascript:;">
                          <ShareIcon width="25" height="25" />
                          <span>Share</span>
                        </a>
                      </span>
                    </div>
                    {/* end of post meta */}
                    <div className="blog-detail_main-image">
                      <img src={data.poster.original} alt={data.title} />
                    </div>

                    <article
                      className="blog-detail_content"
                      style={{ padding: "40px 0 0" }}>
                      <p>
                        <strong>Waktu : </strong>
                        <br />
                        {DayJs(data.start_time).format("DD MMMM YYYY HH:mm")}
                      </p>
                      <p>
                        <strong>Catatan : </strong>
                        <br />
                        {data.note || "Tidak ada catatan"}
                        <br />
                        {data.event_link ? (
                          <React.Fragment>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={data.event_link}>
                              Pelajari Selengkapnya
                            </a>
                          </React.Fragment>
                        ) : null}
                      </p>

                      {data.location && data.location.address ? (
                        <p>
                          <strong>Lokasi event : </strong>
                          <br />
                          {data.location.address}
                          <InputLocation
                            name="location"
                            label="Lokasi Start / Meetpoint Gowes"
                            readOnly
                            coordinate={data.location.coordinate}
                          />

                          <a
                            href={`https://maps.google.com/maps?q=${data.location.coordinate.lat},${data.location.coordinate.lng}`}
                            target="_blank"
                            rel="noopener noreferer">
                            Lihat di Google Maps
                          </a>
                        </p>
                      ) : null}

                      {data.geoJSON ? (
                        <p>
                          <strong>Rute : </strong>
                          <br />
                          <InputLocation
                            name="Rute"
                            label="Rute"
                            readOnly
                            geoJSON={data.geoJSON}
                            coordinate={data.location.coordinate}
                          />
                        </p>
                      ) : null}
                    </article>
                  </div>
                </div>

                <GA adClient="ca-pub-4468477322781117" adSlot="4316048838" />

                {/* share box */}
                <div className="grid-center" id="share-box">
                  <div className="col-7_xs-12">
                    <ShareBox url={`https://maugowes.com${data.link}`} />
                  </div>
                </div>
                {/* end of share box */}

                {/* comment */}
                <div className="grid-center" id="comment-box">
                  <div className="col-7_xs-12 blog-detail_comment">
                    {this.state.windowReady ? (
                      <DisqusBox
                        url={`${window.location.origin}/events/${id}`}
                        identifier={`maugowes-${id}`}
                      />
                    ) : null}
                  </div>
                </div>
                {/* end of comment */}
              </React.Fragment>
            ) : (
              <Loader text={data.messages} />
            )}
          </BlogDetailStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

const mapStateToProps = state => {
  return {
    event: state.Events
  }
}

export default connect(mapStateToProps)(EventDetail)
