import Header from "../navigations/Header"
import Footer from "../navigations/Footer"
import Styled from "styled-components"
import ThanksTo from "../boxs/ThanksToFooter"

const DefaultLayout = Styled.div`

`

export default props => {
  return (
    <DefaultLayout>
      <div className="container">
        <Header />
        {props.children}
        <ThanksTo />
        <Footer />
      </div>
    </DefaultLayout>
  )
}
