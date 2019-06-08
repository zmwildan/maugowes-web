import Header from "../navigations/Header"
import Footer from "../navigations/Footer"
import Styled from "styled-components"

const DefaultLayout = Styled.div`

`

export default props => {
  return (
    <DefaultLayout>
      <div className="container">
        <Header />
        {props.children}
        <Footer />
      </div>
    </DefaultLayout>
  )
}
