import Styled from "styled-components"
import { color_red_main, color_gray_dark } from "./Const"
import Toast from "../modules/toast"

const ToastStyled = Styled.div`
  background-color: ${color_gray_dark};
  position: fixed;
  color: #FFF;
  width: 300px;
  padding: 15px 30px;
  text-align: center;
  bottom: -60px;
  right: 20px;
  cursor: pointer;
  transition: all .2s ease;
  font-family: Montserrat, sans-serif;
  &:hover {
    padding: 20px 35px;
  }
`

export default () => {
  return (
    <ToastStyled
      id="mg-toast">
      sample text yuk
    </ToastStyled>
  )
}
