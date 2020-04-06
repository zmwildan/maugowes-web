import Styled from "styled-components"
import { connect } from "react-redux"

// redux
import { fetchBikes } from "../../../redux/bikes/actions"

// layouts
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"

// components
import PageHeader from "../../../components/boxs/PageHeader"
import BikeBox from "../../../components/super/boxs/BikeBox"

const SuperBikesStyled = Styled.div`

`

class SuperBikes extends React.Component {
  state = {
    page: 1
  }

  componentDidMount() {
    this.props.dispatch(fetchBikes())
  }

  render() {
    const data = this.props.bikes.bike_list || {}

    return (
      <GlobalLayout metadata={{ title: "Bike Management" }}>
        <DefaultLayout>
          <SuperLayout>
            <SuperBikesStyled className="p-t-b-30">
              <PageHeader title="Bikes Management" />
              <BikeBox data={data} loadMoreHandler={() => {}} />
            </SuperBikesStyled>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect(state => {
  return {
    bikes: state.Bikes
  }
})(SuperBikes)
