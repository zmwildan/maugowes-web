import Styled from "styled-components"
import { connect } from "react-redux"
import config from "../../../config/index"
import fetch from "isomorphic-unfetch"
import {
  color_red_main,
  color_white_main,
  color_gray_soft,
  color_gray_medium,
} from "../../../components/Const"

// redux
import {
  fetchBikeDetail,
  fetchBikes,
  fetchBikeTypes,
} from "../../../redux/bikes/actions"
import { fetchGroupSpec } from "../../../redux/groupSpec/actions"

// layouts
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"

// components
const BikesCompareStyled = Styled.div`
    margin-top: 50px;

    ul.list-data {
      line-height: 2;
      padding: 0;
      li {
        height: 63px;
        padding: 5px 10px;
        list-style: none;
        &:nth-child(even) {
          background: ${color_gray_soft};
        }
        &:nth-child(odd) {
          background: ${color_gray_medium};
        }
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
          padding: 10px 10px 10px 35px;
          display: block;
          width: calc(100% - 35px - 10px);
        }
      }
    }

    .bike-compare-specs {
      .bike-compare-left { 
        margin-top: 220px;
        h3:first-child {
          margin-top: 0;
        }
      }

      
      .bike-compare-right {
        overflow-x: auto;
        overflow-y: hidden;
        .bike-compare-right__item {
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
          .bike-compare-right__item__content {
            h3 {
              &:first-child {
                margin-top: 0;
              }
              color: #fff;
            }
          }
        }
      }
    }
  `

//setup before functions
let typingTimer //timer identifier
const doneTypingInterval = 500

class BikesCompare extends React.Component {
  static async getInitialProps({ reduxStore, res, query }) {
    const { id } = query
    if (typeof window == "undefined") {
      const { type, endpoint } = fetchGroupSpec("list")["CALL_API"]
      //  only call in server side
      const groupSpecResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${endpoint}`
      )
      const groupSpec = await groupSpecResponse.json()
      reduxStore.dispatch({
        type,
        filter: "list",
        data: groupSpec,
      })
      const fetchBike = fetchBikeDetail(id)["CALL_API"]
      const fetchBikeType = fetchBike.type
      const bikeResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${fetchBike.endpoint}`
      )
      const bike = await bikeResponse.json()
      reduxStore.dispatch({
        type: fetchBikeType,
        filter: id,
        data: bike,
      })
    }

    return {
      id: query.id,
    }
    return {}
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
    if (!bikeData.status) {
      dispatch(fetchBikeDetail(id))
    }
  }

  handleKeyDown = (e) => {
    clearTimeout(typingTimer)
  }

  handleKeyUp = (e) => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(() => {
      console.log("asdf")
    }, doneTypingInterval)
  }

  render() {
    const MetaData = {
      title: `Perbandingan Sepeda - Mau Gowes`,
      description: `Spesifikasi dan deskripsi dari`,
    }

    const groupSpec = this.props.groupSpec["list"] || {}

    return (
      <GlobalLayout metadata={MetaData}>
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
                  onKeyUp={this.handleKeyUp}
                />
              </div>
            </div>
            {/* end of input to search data */}

            <div className="grid-noGutter bike-compare-specs">
              {/* left side */}

              <div className="col-3_xs-6 bike-compare-left">
                <div className="bike-compare-left__item">
                  {groupSpec.status === 200
                    ? groupSpec.results.map((data, key) => {
                        return (
                          <React.Fragment key={key}>
                            <h3>{data.name}</h3>
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
                    if (bikeData.status === 200) {
                      return (
                        <div
                          key={key}
                          className="col-3_md-6_xs-12 bike-compare-right__item">
                          <div
                            className="bike-compare-right__item__thumbnail"
                            style={{
                              backgroundImage: `url(${bikeData.images[0]})`,
                            }}>
                            {key ? (
                              <button type="button" className="btn-delete">
                                x
                              </button>
                            ) : null}
                          </div>
                          <div className="bike-compare-right__item__title">
                            <h4>{bikeData.name}</h4>
                          </div>
                          <div className="bike-compare-right__item__content">
                            {groupSpec.results.map((data, key) => {
                              const specs = bikeData.specs[data.name] || []
                              return (
                                <React.Fragment key={key}>
                                  <h3>{data.name}</h3>
                                  <ul className="list-data">
                                    {data.specs.map((data, i) => {
                                      const spec = specs[data.name] || {}
                                      return (
                                        <li key={i}>
                                          {spec.description
                                            ? spec.description
                                            : "-"}
                                        </li>
                                      )
                                    })}
                                  </ul>
                                </React.Fragment>
                              )
                            })}
                          </div>
                        </div>
                      )
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
