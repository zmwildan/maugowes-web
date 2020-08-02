import Styled from "styled-components"
import { color_gray_medium, color_gray_dark, color_blue_main } from "../Const"

// style source
export const InputRangeStyled = Styled.div`
input[type=range] {
  width: 100%;
  -webkit-appearance: none;
  height: 10px;
  background: #FFF;
  border: 1px solid ${color_gray_medium};
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${color_gray_dark};
    cursor: pointer;
    &:hover {
      background: ${color_blue_main};
    }
  }
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: ${color_gray_dark};
    cursor: pointer;
    &:hover {
      background: ${color_blue_main};
    }
  }
}
`

const InputRange = (props) => {
  return null
}

export default InputRange
