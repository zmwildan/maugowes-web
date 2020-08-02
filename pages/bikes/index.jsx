import Styled from "styled-components"
import { connect } from "react-redux"
import { toCamelCase, objToQuery } from "string-manager"
import { progressBar } from "../../modules/loaders"

// redux
import {
  fetchBikes,
  fetchBikeBrands,
  fetchBikeTypes,
} from "../../redux/bikes/actions"

// layouts
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"

// components
import Header from "../../components/boxs/FullWidthHeader"
import Sidebar from "../../components/navigations/SidebarBikes"
import BikesBox from "../../components/boxs/BikesBox"

const BikesStyled = Styled.div`
 margin-top: 50px;
 .content {
  // padding: 20px;
 }
`

const MetaData = {
  title: "",
  description: "Temukan sepeda dan sepesifikasinya di halaman ini.",
}

const MaxResults = 12

export function requestQueryGenerator(query = {}) {
  let reqQuery = {
    page: 1,
    limit: MaxResults,
  }

  if (query.min_price) reqQuery.min_price = query.min_price
  if (query.max_price) reqQuery.max_price = query.max_price
  if (query.brand) reqQuery.brand = query.brand
  if (query.type) reqQuery.type = query.type
  if (query.q) reqQuery.q = query.q

  return reqQuery
}

export function bikeFilterGenerator(query = {}) {
  delete query.page

  return `list_${objToQuery(query)}`
}

class BikesIndex extends React.Component {
  static async getInitialProps({ reduxStore, query }) {
    if (typeof window == "undefined") {
      const reqQuery = requestQueryGenerator(query)

      await reduxStore.dispatch(fetchBikeBrands())
      await reduxStore.dispatch(fetchBikeTypes())
      await reduxStore.dispatch(
        fetchBikes(bikeFilterGenerator(reqQuery), reqQuery)
      )
    }
    return { query }
  }

  constructor(props) {
    super(props)

    const reqQuery = requestQueryGenerator(props.query)

    this.state = {
      page: 1,
      bikeFilter: bikeFilterGenerator(reqQuery),
    }
  }

  componentDidMount() {
    this.fetchData(true)
  }

  componentDidUpdate() {
    this.fetchData()
  }

  fetchData(firstReq = false) {
    const reqQuery = requestQueryGenerator(this.props.query)

    // generate bike list filter
    const BikeFilter = bikeFilterGenerator(reqQuery)

    if (this.state.bikeFilter !== BikeFilter || firstReq) {
      this.setState({ bikeFilter: BikeFilter })

      const bikeTypes = this.props.bikes.bike_types || {}
      const bikeBrands = this.props.bikes.bike_brands || {}
      const bikes = this.props.bikes[BikeFilter] || {}

      if (!bikeTypes.status) this.props.dispatch(fetchBikeTypes())
      if (!bikeBrands.status) this.props.dispatch(fetchBikeBrands())
      if (!bikes.status) {
        progressBar.start()
        this.props.dispatch(fetchBikes(BikeFilter, reqQuery))
      }
    }
  }

  loadmoreHandler() {
    const { bikeFilter } = this.state
    const bikeData = this.props.bikes[bikeFilter] || {}
    if (!bikeData.is_loading && bikeData.status == 200) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          let reqQuery = requestQueryGenerator(this.props.query)
          reqQuery.page = this.state.page
          this.props.dispatch(fetchBikes(bikeFilter, reqQuery))
        }
      )
    }
  }

  render() {
    const { bikeFilter } = this.state
    let { title, description } = MetaData
    const { query } = this.props

    const bikeTypes = this.props.bikes.bike_types || {}
    const bikeBrands = this.props.bikes.bike_brands || {}
    const bikes = this.props.bikes[bikeFilter] || {}

    if (query.q) {
      description = `Hasil Pencarian "${query.q}" `
    }

    if (bikes.status) progressBar.stop()

    if (query.type && bikeTypes.status === 200) {
      const typeDetail = bikeTypes.results.find((n) => n.id === query.type)
      if (typeDetail && typeDetail.name) {
        title += `${typeDetail.name} `
      }
    }

    if (query.brand && bikeBrands.status === 200) {
      const brandDetail = bikeBrands.results.find((n) => n.id === query.brand)
      if (brandDetail && brandDetail.name) {
        title += `${brandDetail.name} `
      }
    }

    title += `${title ? "- " : ""} Bikes Mau Gowes`

    return (
      <GlobalLayout
        metadata={{
          title: toCamelCase(title),
          description,
        }}>
        <DefaultLayout>
          <Header
            title={toCamelCase(title)}
            text={description}
            stats={{
              suffix: "bikes",
              total: bikes.total || 0,
              show:
                bikes.results && bikes.results.length
                  ? bikes.results.length
                  : 0,
            }}
          />
          <BikesStyled>
            <div className="grid">
              <Sidebar
                query={query}
                className="col-3_md-4_xs-12"
                bikeBrands={bikeBrands}
                bikeTypes={bikeTypes}
              />
              <div className="content col-9_md-8_xs-12">
                <BikesBox
                  data={bikes}
                  loadmoreHandler={() => this.loadmoreHandler()}
                  maxResults={MaxResults}
                  noHeaderTitle
                />
              </div>
            </div>
          </BikesStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect((state) => {
  return {
    bikes: state.Bikes,
  }
})(BikesIndex)
