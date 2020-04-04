import Styled from "styled-components"
import { connect } from "react-redux"

// redux
import { fetchBikeBrands, fetchBikeTypes } from "../../../redux/bikes/actions"

// components
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import BikeFormCom from "../../../components/form/BikeForm"
import PageHeader from "../../../components/boxs/PageHeader"

const BikeFormStyled = Styled.div`

`

class BikeForm extends React.Component {
  static async getInitialProps({ reduxStore, res, query }) {
    return {
      id: query.id,
    }
  }

  state = {
    id: this.props.id,
  }

  componentDidMount() {
    this.props.dispatch(fetchBikeTypes())
    this.props.dispatch(fetchBikeBrands())
  }

  render() {
    const { id } = this.state
    let title = "Create Bike"
    if (id) title = "Update Bike"
    return (
      <GlobalLayout metadata={{ title }}>
        <DefaultLayout>
          <SuperLayout>
            <BikeFormStyled className="p-t-b-30">
              <PageHeader title={title} />
              <BikeFormCom bikes={this.props.bikes} />
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
