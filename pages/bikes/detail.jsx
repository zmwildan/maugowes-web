import Styled from "styled-components"
import { extractPath } from "../../modules/url"

// layouts
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"

// components
import BikeBox from "../../components/boxs/BikeBox"
import BikeSpecsBox from "../../components/boxs/BikeSpecsBox"
import Tab from "../../components/navigations/Tab"

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
  { text: "Diskusi" }
]

class BikeDetail extends React.Component {
  static async getInitialProps({ reduxStore, res, query }) {
    return { id: query.id }
  }

  constructor(props) {
    super(props)
    const { title, id } = extractPath(props.id)
    this.state = {
      title,
      id,
      activeTab: 0
    }
  }

  boxRenderHandler() {
    switch (this.state.activeTab) {
      case 0:
        return <BikeSpecsBox />
      case 1:
        return (
          <div className="bike-detail__geometry">
            <img
              src="https://contenderbicycles.com/wp-content/uploads/2019/05/2020-Pinarello-Dogma-F12-Geometry-768x644.jpg"
              alt="geometry"
            />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const MetaData = {
      title: `Bikes - Mau Gowes`,
      description: `Spesifikasi dan deskripsi dari`
    }
    return (
      <GlobalLayout metadata={MetaData}>
        <DefaultLayout>
          <BikeDetailStyled>
            <div className="grid-center">
              <div className="col-10_xs-12">
                <BikeBox />
                <div className="grid-center">
                  <div className="col-8_md-10_xs-12">
                    <Tab
                      tabContent={TabContents}
                      active={this.state.activeTab}
                      onClick={selected =>
                        this.setState({ activeTab: selected })
                      }
                    />
                  </div>
                  <div className="col-8__md-10_xs-12">
                    {this.boxRenderHandler()}
                  </div>
                </div>
              </div>
            </div>
          </BikeDetailStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default BikeDetail
