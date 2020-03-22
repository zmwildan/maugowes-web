import Styled from "styled-components"

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

class BikesIndex extends React.Component {
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
              <Sidebar className="col-3" />
              <div className="content col-9">
                <BikesBox />
              </div>
            </div>
          </BikesStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default BikesIndex
