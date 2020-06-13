import Styled from "styled-components"
import { connect } from "react-redux"
import { toCamelCase } from "string-manager"

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
  padding: 20px;
 }
`

const MetaData = {
  title: "Bikes - Mau Gowes",
  description: "Temukan sepeda dan sepesifikasinya di halaman ini.",
}

const MaxResults = 9

export function requestQueryGenerator(query = {}) {
  let reqQuery = {
    page: 1,
    limit: MaxResults,
  }

  if (query.brand) reqQuery.brand = query.brand
  if (query.type) reqQuery.type = query.type
  if (query.q) reqQuery.q = query.q

  return reqQuery
}

class BikesIndex extends React.Component {
  static async getInitialProps({ reduxStore, query }) {
    if (typeof window == "undefined") {
      const reqQuery = requestQueryGenerator(query)

      await reduxStore.dispatch(fetchBikeBrands())
      await reduxStore.dispatch(fetchBikeTypes())
      await reduxStore.dispatch(fetchBikes("bike_list", reqQuery))
    }
    return { query }
  }

  state = {
    page: 1,
  }

  componentDidMount() {
    const bikeTypes = this.props.bikes.bike_types || {}
    const bikeBrands = this.props.bikes.bike_brands || {}
    const bikes = this.props.bikes.bike_list || {}

    const reqQuery = requestQueryGenerator(this.props.query)

    if (!bikeTypes.status) this.props.dispatch(fetchBikeTypes())
    if (!bikeBrands.status) this.props.dispatch(fetchBikeBrands())
    if (!bikes.status) this.props.dispatch(fetchBikes("bike_list", reqQuery))
  }

  loadmoreHandler() {
    const bikeData = this.props.bikes.bike_list || {}
    if (!bikeData.is_loading && bikeData.status == 200) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        async () => {
          let reqQuery = requestQueryGenerator(this.props.query)
          reqQuery.page = this.state.page
          return this.props.dispatch(fetchBikes("bike_list", reqQuery))
        }
      )
    }
  }

  render() {
    let title = "",
      description = ""
    const { query } = this.props

    const bikeTypes = this.props.bikes.bike_types || {}
    const bikeBrands = this.props.bikes.bike_brands || {}
    const bikes = this.props.bikes.bike_list || {}

    if (query.q) {
      title += `Hasil Pencarian "${query.q}" `
      description += `Hasil Pencarian "${query.q}" `
    }

    if (query.type && bikeTypes.status === 200) {
      const typeDetail = bikeTypes.results.find((n) => n.id === query.type)
      if (typeDetail.name) {
        title += `${typeDetail.name} `
        description += `${typeDetail.name} `
      }
    }

    if (query.brand && bikeBrands.status === 200) {
      const brandDetail = bikeBrands.results.find((n) => n.id === query.brand)
      if (brandDetail.name) {
        title += `${brandDetail.name} `
        description += `${brandDetail.name} `
      }
    }

    title += `${title ? "di " : ""}${MetaData.title}`
    description += `${description ? "di " : ""}${MetaData.description}`

    return (
      <GlobalLayout
        metadata={{
          title: toCamelCase(title),
          description,
        }}>
        <DefaultLayout>
          <Header
            title={title}
            text={description}
            backgroundImage="/static/images/cover/cover-bikes.jpeg"
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
