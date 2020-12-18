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
import Breadcrumb from "../../components/navigations/Breadcrumb"
import { toSlug } from "string-manager/dist/modules/slug"

const BikeDetailStyled = Styled.div`
.bike-detail__geometry {
  margin-top: 40px;
  img {
    width: 100%;
  }
}
// responsiveness
// gridlex _xs
@media (max-width: 36em) {
  .breadcrumb {
    padding: 0 10px;
  }
}
// gridlex _sm
@media (max-width: 48em) {
  .breadcrumb {
    padding: 0 10px;
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

  // breadcrumbs
  const BreadcrumbData = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/bikes",
      title: "Bikes",
    },
  ]

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
      BreadcrumbData.push({
        title: bikeData.name,
        link: `/bikes/${toSlug(bikeData.name)}-${bikeData.id}`,
      })

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
                <div className="col-12" style={{ paddingBottom: 0 }}>
                  <Breadcrumb position="left" breadcrumb={BreadcrumbData} />
                </div>
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
