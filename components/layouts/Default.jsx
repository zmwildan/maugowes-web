// components
import HeaderV2 from "../navigations/HeaderV2"
import Footer from "../navigations/Footer"
import ThanksTo from "../boxs/ThanksToFooter"
import ProgressBar from "../loaders/ProgressBar"
import ScrollToTop from "../buttons/ScrollToTop"

export default (props) => {
  return (
    <>
      <ProgressBar />
      <HeaderV2 />
      <div className="container">
        {props.children}
        <ThanksTo />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  )
}
