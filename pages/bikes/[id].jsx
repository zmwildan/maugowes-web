import { useState, useEffect } from "react"
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
import BikeBox from "../../components/boxs/BikeBox"
import TabContent from "../../components/boxs/BikeDetailTabContent"
import Tab from "../../components/navigations/Tab"
import Loader from "../../components/Loader"

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

const BikeDetail = (props) => {
  const [activeTab, setActiveTab] = useState(0)

  // get data form store
  const bikeData = props.bikes[props.id] || {}

  useEffect(() => {
    if (!bikeData.status) props.dispatch(fetchBikeDetail(props.id))
  }, [])

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
                        active={activeTab}
                        onClick={(selected) => setActiveTab(selected)}
                      />
                    </div>
                    <div className="col-10__md-10_xs-12">
                      <TabContent data={bikeData} activeTab={activeTab} />
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

BikeDetail.getInitialProps = async ({ req, reduxStore, query }) => {
  const { id } = extractPath(query.id)
  if (req) {
    await reduxStore.dispatch(fetchBikeDetail(id))
  }

  return { id }
}

export default connect((state) => {
  return {
    bikes: state.Bikes,
  }
})(BikeDetail)
