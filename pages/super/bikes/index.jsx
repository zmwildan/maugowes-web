import { useState } from "react"
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

const SuperBikes = (props) => {
  const [page, setPage] = useState(1)
  const data = props.bikes.bike_list || {}
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

SuperBikes.getInitialProps = async ({ req, reduxStore, query = {} }) => {
  await reduxStore.dispatch(fetchBikes())

  return { ready: true }
}

export default connect((state) => {
  return {
    bikes: state.Bikes,
  }
})(SuperBikes)
