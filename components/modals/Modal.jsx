import Styled from "styled-components"

// components
import DarkOverlay from "../extras/DarkOverlay"

const ModalStyled = Styled.div`
  .modal-container {
    left: 0;
    top: 0;
    width: 100vw;
    position: fixed;
    z-index: 11;
    display: flex;
    justify-content: center;

    .modal-header {
      position: relative;
      .modal-header__title {
        font-size: 30px;
        margin-bottom: 25px;
      }
      .modal-header__btn-close {
        position: absolute;
        font-size: 30px;
        top: 0;
        right: 0;
      }
    }
  }
`

const Modal = (props) => {
  return (
    <ModalStyled>
      <DarkOverlay />
      <div className="modal-container">{props.children}</div>
    </ModalStyled>
  )
}

export default Modal
