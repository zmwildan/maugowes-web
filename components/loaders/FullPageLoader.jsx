import Styled from "styled-components"
import { color_blue_main, color_blue_main_transparent } from "../Const"

const FullPageLoader = Styled.div`
  top: 0;
  position: fixed;
  opacity: 0;
  visibility: hidden;
  display:flex;
  align-items: center;
  justifiy-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${color_blue_main_transparent};
  z-index: 10;
  left: 0 !important;
  font-family: Montserrat, sans-serif;
  .loader-white-line {
    position: absolute;
    top: 50%;
    height: 50vh;
    width: 100vw;
    border-top: 5px solid #FFFFFF;
    h2 {
      text-align: center;
      padding: 20px 0;
      color: #FFFFFF;
      animation: blinkLoading 1s infinite;
      opacity: .5;
    }
  }

  /* Safari 4.0 - 8.0 */
  @-webkit-keyframes blinkLoading {
    0% {opacity: .5;}
    50% {opacity: 1;}
    100% {opacity: .5;}
  }

  @keyframes blinkLoading {
    0% {opacity: .5;}
    50% {opacity: 1;}
    100% {opacity: .5;}
  }
`

export default () => {
  return (
    <FullPageLoader>
      <div className="loader-white-line">
        <h2>LOADING...</h2>
      </div>
    </FullPageLoader>
  )
}
