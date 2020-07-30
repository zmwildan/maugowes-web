import Styled from "styled-components"
import { extractPath } from "../../modules/url"
import { connect } from "react-redux"
import { progressBar } from "../../modules/loaders"

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
  { text: "Share" },
]

class BikeDetail extends React.Component {
  static async getInitialProps({ req, reduxStore, query }) {
    if (req) {
      const { id } = extractPath(query.id)
      await reduxStore.dispatch(fetchBikeDetail(id))
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
      windowReady: false,
    }
  }

  componentDidMount() {
    this.setState({
      windowReady: true,
    })
    this.fetchBikeDetail()
  }

  fetchBikeDetail() {
    const bikeData = this.props.bikes[this.state.id] || {}
    if (!bikeData.status) {
      progressBar.start()
      this.props.dispatch(fetchBikeDetail(this.state.id))
    }
  }

  boxRenderHandler() {
    const bikeData = this.props.bikes[this.state.id] || {}
    switch (this.state.activeTab) {
      case 0:
        return bikeData.specs ? (
          <React.Fragment>
            <BikeSpecsBox data={bikeData.specs} />
            <br />
            {bikeData.source ? (
              <a
                target="_blank"
                rel="noopener noreferer"
                href={bikeData.source}>
                Sumber Data
              </a>
            ) : null}
          </React.Fragment>
        ) : (
          <Error text="Spesifikasi belum tersedia" />
        )
      case 1:
        return bikeData.geometry && bikeData.geometry != "undefined" ? (
          <div className="bike-detail__geometry">
            <img src={bikeData.geometry} alt="bike geometry" />
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
    const bikeData = this.props.bikes[this.state.id] || {}

    let MetaData = {
      title: `Bikes - Mau Gowes`,
      description: `Spesifikasi dan deskripsi bikes`,
    }

    if (bikeData.status) {
      progressBar.stop()
      if (bikeData.status == 200) {
        MetaData = {
          title: `${bikeData.name} - Mau Gowes`,
          description: `Spesifikasi dan deskripsi dari ${bikeData.name}`,
          image: bikeData.images[0],
        }
      } else {
        MetaData = {
          title: `Bike Not Found - Mau Gowes`,
          description: `Sepeda tidak ditemukan`,
        }
      }
    }

    return (
      <GlobalLayout metadata={MetaData}>
        <DefaultLayout>
          <BikeDetailStyled>
            {bikeData.status ? (
              bikeData.status == 200 ? (
                <div className="grid-center">
                  <div className="col-12">
                    <BikeBox data={bikeData} />
                    <div className="grid-center">
                      <div className="col-10_md-10_xs-12">
                        <Tab
                          tabContent={TabContents}
                          active={this.state.activeTab}
                          onClick={(selected) =>
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
                <Loader text={bikeData.messages} />
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

export default connect((state) => {
  return {
    bikes: state.Bikes,
  }
})(BikeDetail)
