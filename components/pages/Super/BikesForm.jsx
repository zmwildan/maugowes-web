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

const BikeForm = ({ id, bikes, dispatch }) => {
  let title = "Create Bike"
  if (id) title = "Update Bike"
  return (
    <GlobalLayout metadata={{ title }}>
      <DefaultLayout>
        <SuperLayout>
          <BikeFormStyled className="p-t-b-30">
            <PageHeader title={title} />
            <BikeFormCom bikes={bikes} id={id} dispatch={dispatch} />
          </BikeFormStyled>
        </SuperLayout>
      </DefaultLayout>
    </GlobalLayout>
  )
}

BikeForm.getInitialProps = async ({ req, reduxStore, query = {} }) => {
  const { id } = query
  await reduxStore.dispatch(fetchBikeBrands())
  await reduxStore.dispatch(fetchBikeTypes())
  await reduxStore.dispatch(fetchBikeGroupSpecs())
  if (typeof id != "undefined") {
    await reduxStore.dispatch(fetchBikeDetail(id))
  }
  return { id }
}

export default connect((state) => {
  return {
    bikes: state.Bikes,
  }
})(BikeForm)
