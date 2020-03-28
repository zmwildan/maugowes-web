import Styled from "styled-components"
import { extractPath } from "../../modules/url"
import config from "../../config/index"
import fetch from "isomorphic-unfetch"
import { connect } from "react-redux"

// redux
import { fetchBikeDetail } from "../../redux/bikes/actions"

// layouts
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"

// components
import DisqusBox from "../../components/boxs/Disqus"
import BikeBox from "../../components/boxs/BikeBox"
import BikeSpecsBox from "../../components/boxs/BikeSpecsBox"
import Tab from "../../components/navigations/Tab"
import Loader from "../../components/Loader"
import Share from "../../components/boxs/Share"
import Error from "../../components/cards/CardError"

const BikeDetailStyled = Styled.div`
.bike-detail__geometry {
  margin-top: 40px;
  img {
    width: 100%;
  }
}
`

const TabContents = [
  { text: "Spesifikasi" },
  { text: "Geometri" },
  { text: "Diskusi" },
  { text: "Share" }
]

class BikeDetail extends React.Component {
  static async getInitialProps({ reduxStore, res, query }) {
    const { id } = extractPath(query.id)
    if (typeof window == "undefined") {
      const { type, endpoint } = fetchBikeDetail(id)["CALL_API"]
      //  only call in server side
      const bikeResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${endpoint}`
      )
      const bike = await bikeResponse.json()
      reduxStore.dispatch({
        type,
        filter: id,
        data: bike
      })
    }

    return { id: query.id }
  }

  constructor(props) {
    super(props)
    const { title, id } = extractPath(props.id)
    this.state = {
      title,
      id,
      activeTab: 0,
      windowReady: false
    }
  }

  componentDidMount() {
    this.setState({
      windowReady: true
    })
  }

  boxRenderHandler() {
    const bikeData = this.props.bikes[this.state.id] || {}
    switch (this.state.activeTab) {
      case 0:
        return bikeData.specs ? (
          <BikeSpecsBox data={bikeData.specs} />
        ) : (
          <Error text="Spesifikasi belum tersedia" />
        )
      case 1:
        return bikeData.geometry ? (
          <div className="bike-detail__geometry">
            <img
              src="https://contenderbicycles.com/wp-content/uploads/2019/05/2020-Pinarello-Dogma-F12-Geometry-768x644.jpg"
              alt="geometry"
            />
          </div>
        ) : (
          <Error text="Geometri belum tersedia" />
        )

      case 2:
        return this.state.windowReady ? (
          <DisqusBox
            url={`https://maugowes.com/bikes/${this.props.id}`}
            identifier={`maugowes-bikes-${this.props.id}`}
          />
        ) : null
      case 3:
        return <Share url={`https://maugowes.com/bikes/${this.props.id}`} />
      default:
        return null
    }
  }

  render() {
    const MetaData = {
      title: `Bikes - Mau Gowes`,
      description: `Spesifikasi dan deskripsi dari`
    }
    const bikeData = this.props.bikes[this.state.id] || {}
    return (
      <GlobalLayout metadata={MetaData}>
        <DefaultLayout>
          <BikeDetailStyled>
            {bikeData.status ? (
              bikeData.status == 200 ? (
                <div className="grid-center">
                  <div className="col-10_xs-12">
                    <BikeBox data={bikeData} />
                    <div className="grid-center">
                      <div className="col-10_md-10_xs-12">
                        <Tab
                          tabContent={TabContents}
                          active={this.state.activeTab}
                          onClick={selected =>
                            this.setState({ activeTab: selected })
                          }
                        />
                      </div>
                      <div className="col-10__md-10_xs-12">
                        {this.boxRenderHandler()}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                "error"
              )
            ) : (
              <Loader />
            )}
          </BikeDetailStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect(state => {
  return {
    bikes: state.Bikes
  }
})(BikeDetail)
