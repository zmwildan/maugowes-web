import Styled from "styled-components"
import Router from "next/router"
import { connect } from "react-redux"
import {
  color_red_main,
  color_white_main,
  color_gray_medium,
} from "../../../components/Const"

// redux
import { fetchBikeDetail, fetchBikes } from "../../../redux/bikes/actions"
import { fetchGroupSpec } from "../../../redux/groupSpec/actions"

// layouts
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import BikeAutoComplete from "../../../components/boxs/BikeAutoComplete"
import CardCompareBike from "../../../components/cards/CardCompareBike"

// components
import Loader from "../../../components/Loader"

const BikesCompareStyled = Styled.div`
    margin-top: 50px;

    ul.list-data {
      line-height: 2;
      padding: 0;
      li {
        height: 64px;
        padding: 5px 5px 5px 2px;
        list-style: none;
        border-bottom: 1px solid ${color_gray_medium};
        &:first-child {
          border-top: 1px solid ${color_gray_medium};
        }
        overflow: auto;
        strong {
          margin-right: 20px;
        }
      }
    }
    
    .bike-compare-search {
      margin-bottom: 30px;
      .bike-compare-search_input-group {
        position: relative;
        img {
          position: absolute;
          top: 10px;
          left: 15px;
        }
        input[type="text"] {
          &:disabled {
            cursor: not-allowed;
          }
          padding: 10px 10px 10px 35px;
          display: block;
          width: calc(100% - 35px - 10px);
        }
      }
    }

    .bike-compare-specs {
      .bike-compare-left { 
        margin-top: 220px;
        .bike-compare-left__item {
          h2 {
            margin-top: 50px;
            &:first-child {
              margin-top: 0 !important;
            }
          }
          h2, strong {
            text-transform: capitalize;
          }
        }
      }
      
      .bike-compare-right {
        overflow-x: auto;
        overflow-y: hidden;
        .bike-compare-right__item {
          h2 {
            margin-top: 50px;
            color: #fff;
            &:first-child {
              margin-top: 0 !important;
            }
          }
          .bike-compare-right__item__thumbnail {
            position: relative;
            height: 150px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            button.btn-delete {
              cursor: pointer;
              background-color: ${color_red_main};
              color: ${color_white_main};
              padding: 1px 6px 3px;
              border-radius: 50%;
              border: none;
              right: 0;
              position: absolute;
              top: 0;
              outline: none;
            }
          }
          .bike-compare-right__item__title {
            text-align: center;
            height: 70px;
            overflow: hidden;
            h4 {
              margin: 5px 0;
            }
          }
         
        }
      }
    }
  `

//setup before functions
let typingTimer //timer identifier
const doneTypingInterval = 300

class BikesCompare extends React.Component {
  static async getInitialProps({ req, reduxStore, query }) {
    if (req) {
      const { id } = query
      await reduxStore.dispatch(fetchGroupSpec("list"))
      await reduxStore.dispatch(fetchBikeDetail(id))
    }

    return {
      id: query.id,
    }
  }

  constructor(props) {
    super(props)
    const { id } = props
    this.state = {
      ids: [id],
      search: "",
    }
  }

  componentDidMount() {
    const { id, dispatch } = this.props
    const bikeData = this.props.bikes[id] || {}
    const groupSpec = this.props.groupSpec["list"] || {}

    if (!groupSpec.status) {
      dispatch(fetchGroupSpec("list"))
    }

    if (!bikeData.status) {
      dispatch(fetchBikeDetail(id))
    } else if (bikeData.status === 204) {
      Router.push("/bikes")
    }
  }

  // TODO: @wildan untuk sementara saya komen dulu karena masih blocker di mobile
  handleKeyDown = (e) => {
    clearTimeout(typingTimer)
    const charCode = e.keyCode
    if (charCode === 38 || charCode === 40) {
      e.preventDefault()
    } else {
      console.log("val", e.target.value)
      // const inp = String.fromCharCode(charCode)
      if (this.state.search) {
        // if ((/[a-zA-Z0-9-_ ]/.test(inp) || charCode === 8) && this.state.search) {
        typingTimer = setTimeout(() => {
          this.props.dispatch(
            fetchBikes("bike_autocomplete", {
              q: this.state.search,
              limit: 6,
              page: 1,
            })
          )
        }, doneTypingInterval)
      }
    }
  }

  setSuggestion = (id) => {
    const { ids } = this.state
    if (ids.indexOf(id) === -1) {
      ids.push(id)
      const bikeData = this.props.bikes[id] || {}
      if (!bikeData.status) {
        this.props.dispatch(fetchBikeDetail(id))
      }
    }
    this.setState({ ids, search: "" })
  }

  removeBike = (id) => {
    const { ids } = this.state
    const idx = ids.indexOf(id)
    if (idx !== -1) {
      ids.splice(idx, 1)
      this.setState({ ids })
    }
  }

  render() {
    const data = this.props.bikes[this.props.id] || {}
    const groupSpec = this.props.groupSpec["list"] || {}
    const bikeLists = this.props.bikes["bike_autocomplete"] || {}

    let metadata = {}

    if (data && data.status === 200) {
      metadata = {
        title: `Komparasi Specs ${data.name} Dengan Sepeda Lain - Mau Gowes`,
        description: `Berikut adalah hasil dari komparasi spesifikasi dari ${data.name} dengan sepeda lainnya di Mau Gowes`,
        image: data.images[0],
        // keywords: data.tags.toString(),
        jsonld: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: `Komparasi Specs ${data.name} Dengan Sepeda Lain - Mau Gowes`,
          alternativeHeadline: `Komparasi Specs ${data.name} Dengan Sepeda Lain - Mau Gowes`,
          image: data.images[0],
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
              width: "500",
            },
          },
          url: `https://maugowes.com/bikes/compare/${data.id}`,
          datePublished: new Date(data.created * 1000).toISOString(),
          dateCreated: new Date(data.created * 1000).toISOString(),
          dateModified: new Date(data.updated_on * 1000).toISOString(),
          // description: data.truncatedContent,
          author: {
            "@type": "Organization",
            name: "Mau Gowes",
          },
        },
      }
    } else {
      metadata = {
        title: "Sepeda tidak ditemukan",
        description:
          "Maaf sepeda yang kamu tuju tidak ditemukan, silahkan cek url sekali lagi, bisa juga karena sepeda telah di hapus.",
      }
    }

    const bikeTotal = this.state.ids.length
    let wrapperClassName = "col-6_xs-12 bike-compare-right__item"
    if (bikeTotal == 3)
      wrapperClassName = "col-4_md-6_xs-12 bike-compare-right__item"
    if (bikeTotal >= 4)
      wrapperClassName = "col-3_md-6_xs-12 bike-compare-right__item"

    return (
      <GlobalLayout metadata={metadata}>
        <DefaultLayout>
          <BikesCompareStyled>
            {/* input to search data */}
            <div className="bike-compare-search grid">
              <div className="col-3_md-5_xs-12 bike-compare-search_input-group">
                <img
                  src="/static/images/icons/search-icon.svg"
                  width="16"
                  height="16"
                />
                <input
                  type="text"
                  name="input-search-bike"
                  id="input-search-bike"
                  value={this.state.search}
                  placeholder="Pencarian sepeda"
                  onChange={(e) => this.setState({ search: e.target.value })}
                  onKeyDown={this.handleKeyDown}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  disabled={bikeTotal >= 5}
                />
                {this.state.search ? (
                  <BikeAutoComplete
                    data={bikeLists}
                    setSuggestion={this.setSuggestion}
                  />
                ) : null}
              </div>
            </div>
            {/* end of input to search data */}

            <div className="grid-noGutter bike-compare-specs">
              {/* left side */}

              <div className="col-3_xs-6 bike-compare-left">
                <div className="bike-compare-left__item">
                  <h2>Harga</h2>
                  <ul className="list-data">
                    <li>
                      <strong>Harga dalam Rp</strong>
                    </li>
                  </ul>
                  {groupSpec.status === 200
                    ? groupSpec.results.map((data, key) => {
                        return (
                          <React.Fragment key={key}>
                            <h2>{data.name}</h2>
                            <ul className="list-data">
                              {data.specs.map((spec, key) => {
                                return (
                                  <li key={key}>
                                    <strong>{spec.name}</strong>
                                  </li>
                                )
                              })}
                            </ul>
                          </React.Fragment>
                        )
                      })
                    : null}
                </div>
              </div>
              {/* end of left side */}

              {/* right side */}
              <div className="col-9_xs-6 bike-compare-right">
                <div className="grid-noGutter" style={{ flexFlow: "unset" }}>
                  {this.state.ids.map((n, key) => {
                    const bikeData = this.props.bikes[n] || {}
                    if (groupSpec.status === 200) {
                      if (bikeData.status === 200) {
                        return (
                          <CardCompareBike
                            bikeData={bikeData}
                            groupSpec={groupSpec}
                            idx={key}
                            key={key}
                            removeBike={this.removeBike}
                            wrapperClassName={wrapperClassName}
                          />
                        )
                      } else {
                        return (
                          <div className={wrapperClassName}>
                            <Loader />
                          </div>
                        )
                      }
                    }
                  })}
                </div>
              </div>
              {/* end of right side */}
            </div>
          </BikesCompareStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect((state) => {
  return {
    bikes: state.Bikes,
    groupSpec: state.GroupSpec,
  }
})(BikesCompare)
