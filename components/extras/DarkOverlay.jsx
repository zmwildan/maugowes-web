import Styled from "styled-components"

const DarkOverlayStyled = Styled.div`
    top: 0;
    left: 0;
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 110vh;
    background: #000;
    opacity: 0.9;
`

const DarkOverlay = () => {
  return <DarkOverlayStyled />
}

export default DarkOverlay
