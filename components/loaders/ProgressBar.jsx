import Styled from "styled-components"

// ref: https://www.w3schools.com/css/css3_gradients.asp
const ProgressBarStyled = Styled.div`
  width: 0;
  top: 0;
  left: 0;
  position: fixed;
  background-image: linear-gradient(to right, #137DC2, #0d517d);
  padding: 3px 0;
  transition: width ease .8s;
  z-index: 9999;
  display: none;
  -webkit-backface-visibility: hidden;
  transform: none;
`

const ProgressBar = () => {
  return <ProgressBarStyled id="progress-bar" />
}

export default ProgressBar
