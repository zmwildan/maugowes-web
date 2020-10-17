// components
import Header from "../navigations/Header"
import Footer from "../navigations/Footer"
import ThanksTo from "../boxs/ThanksToFooter"
import ProgressBar from "../loaders/ProgressBar"

export default (props) => {
  return (
    <>
      <ProgressBar />
      <div className="container">
        <Header />
        {props.children}
        <ThanksTo />
        <Footer />
      </div>
    </>
  )
}
