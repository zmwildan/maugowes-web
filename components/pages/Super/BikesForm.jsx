import Styled from "styled-components"
import { connect } from "react-redux"

// redux
import {
  fetchBikeBrands,
  fetchBikeTypes,
  fetchBikeDetail,
  fetchBikeGroupSpecs,
} from "../../../redux/bikes/actions"

// components
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import BikeFormCom from "../../../components/form/BikeForm"
import PageHeader from "../../../components/boxs/PageHeader"

const BikeFormStyled = Styled.div`

`

class BikeForm extends React.Component {
  static async getInitialProps({ req, reduxStore, query }) {
    const { id } = query

    if (typeof id != "undefined" && req) {
      await reduxStore.dispatch(fetchBikeDetail(id))
    }

    return {
      id,
    }
  }

  state = {
    id: this.props.id,
  }

  componentDidMount() {
    this.props.dispatch(fetchBikeTypes())
    this.props.dispatch(fetchBikeBrands())

    if (this.state.id) {
      this.props.dispatch(fetchBikeDetail(this.state.id))
      this.props.dispatch(fetchBikeGroupSpecs())
    }
  }

  render() {
    let title = "Create Bike"
    const { id } = this.state
    if (id) title = "Update Bike"
    return (
      <GlobalLayout metadata={{ title }}>
        <DefaultLayout>
          <SuperLayout>
            <BikeFormStyled className="p-t-b-30">
              <PageHeader title={title} />
              <BikeFormCom
                bikes={this.props.bikes}
                id={id}
                dispatch={this.props.dispatch}
              />
            </BikeFormStyled>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect((state) => {
  return {
    bikes: state.Bikes,
  }
})(BikeForm)
