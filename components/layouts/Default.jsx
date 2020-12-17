// components
import HeaderV2 from "../navigations/HeaderV2"
import Footer from "../navigations/Footer"
import ThanksTo from "../boxs/ThanksToFooter"
import ProgressBar from "../loaders/ProgressBar"

export default (props) => {
  return (
    <>
      <ProgressBar />
      <HeaderV2 />
      <div className="container">
        {props.children}
        <ThanksTo />
        <Footer />
      </div>
    </>
  )
}
