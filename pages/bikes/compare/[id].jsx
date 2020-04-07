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
import { fetchBikeDetail, fetchBikes } from "../../../redux/bikes/actions"
import { fetchGroupSpec } from "../../../redux/groupSpec/actions"

// layouts
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import BikeAutoComplete from "../../../components/boxs/BikeAutoComplete"
import CardCompareBike from "../../../components/cards/CardCompareBike"

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
      const bikeResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${fetchBike.endpoint}`
      )
      const bike = await bikeResponse.json()
      reduxStore.dispatch({
        type: fetchBikeDetail(id)["CALL_API"].type,
        filter: id,
        data: bike,
      })
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
    if (!bikeData.status) {
      dispatch(fetchBikeDetail(id))
    }
    dispatch(
      fetchBikes("bike_autocomplete", { q: this.state.search, limit: 6 })
    )
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 38 || e.keyCode === 40) e.preventDefault()
    clearTimeout(typingTimer)
  }

  handleKeyUp = (e) => {
    clearTimeout(typingTimer)
    const inp = String.fromCharCode(e.keyCode)
    if ((/[a-zA-Z0-9-_ ]/.test(inp) || e.keyCode === 8) && this.state.search) {
      typingTimer = setTimeout(() => {
        this.props.dispatch(
          fetchBikes("bike_autocomplete", { q: this.state.search, limit: 6 })
        )
      }, doneTypingInterval)
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
    const MetaData = {
      title: `Perbandingan Sepeda - Mau Gowes`,
      description: `Spesifikasi dan deskripsi dari`,
    }

    const groupSpec = this.props.groupSpec["list"] || {}
    const bikeLists = this.props.bikes["bike_autocomplete"] || {}

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
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
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
                        <CardCompareBike
                          bikeData={bikeData}
                          groupSpec={groupSpec}
                          idx={key}
                          key={key}
                          removeBike={this.removeBike}
                        />
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
