import Styled from "styled-components"
import { connect } from "react-redux"
import fetch from "isomorphic-unfetch"
import config from "../../config/index"

// redux
import {
  fetchBikes,
  fetchBikeBrands,
  fetchBikeTypes
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
  title: "Bikes",
  description: "Temukan sepeda dan sepesifikasinya di halaman ini."
}

const Host = config[process.env.NODE_ENV].host

export function requestQueryGenerator(query = {}) {
  let reqQuery = {
    page: 1,
    limit: 12
  }

  if (query.brand) reqQuery.brand = query.brand
  if (query.type) reqQuery.type = query.type

  return reqQuery
}

class BikesIndex extends React.Component {
  static async getInitialProps({ reduxStore, query }) {
    if (typeof window == "undefined") {
      const reqQuery = requestQueryGenerator(query)

      // request list bike brands on server
      const bikeBrandReponse = await fetch(
        `${Host}${fetchBikeBrands()["CALL_API"].endpoint}`
      )
      const bikeBrands = await bikeBrandReponse.json()
      reduxStore.dispatch({
        type: fetchBikeBrands()["CALL_API"].type,
        filter: fetchBikeBrands()["CALL_API"].filter,
        data: bikeBrands
      })

      // request list bike types
      const bikeTypesResponse = await fetch(
        `${Host}${fetchBikeTypes()["CALL_API"].endpoint}`
      )
      const bikeTypes = await bikeTypesResponse.json()
      reduxStore.dispatch({
        type: fetchBikeTypes()["CALL_API"].type,
        filter: fetchBikeTypes()["CALL_API"].filter,
        data: bikeTypes
      })

      // request list bikes
      const bikesResponse = await fetch(
        `${Host}${fetchBikes("bike_list", reqQuery)["CALL_API"].endpoint}`
      )
      const bikes = await bikesResponse.json()
      reduxStore.dispatch({
        type: fetchBikes()["CALL_API"].type,
        filter: fetchBikes()["CALL_API"].filter,
        data: bikes
      })
    }
    return { query }
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

  render() {
    return (
      <GlobalLayout metadata={MetaData}>
        <DefaultLayout>
          <Header
            title={MetaData.title}
            text={MetaData.description}
            backgroundImage="https://images.unsplash.com/photo-1545571326-00415fe9848b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          />
          <BikesStyled>
            <div className="grid">
              <Sidebar
                query={this.props.query}
                className="col-3_md-4_xs-12"
                bikeBrands={this.props.bikes.bike_brands}
                bikeTypes={this.props.bikes.bike_types}
              />
              <div className="content col-9_md-8_xs-12">
                <BikesBox data={this.props.bikes.bike_list || {}} />
              </div>
            </div>
          </BikesStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect(state => {
  return {
    bikes: state.Bikes
  }
})(BikesIndex)
