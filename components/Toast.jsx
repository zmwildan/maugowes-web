import Styled from "styled-components"
import Toast from "../modules/toast"
import { color_black_main } from "./Const"

const ToastStyled = Styled.div`
  background-color: ${color_black_main};
  position: fixed;
  color: #FFF;
  width: 300px;
  padding: 15px 30px;
  text-align: center;
  bottom: -60px;
  right: 20px;
  cursor: pointer;
  transition: all .2s ease;
  &:hover {
    padding: 20px 35px;
  }
`

export default () => {
  return <ToastStyled id="mg-toast" />
}
