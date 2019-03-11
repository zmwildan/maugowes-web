import Styled from "styled-components"
import { color_blue_main, color_blue_dark } from "../Const"

const ButtonStyled = Styled.button`
  cursor: pointer;
  border: none;
  transition: background .5s ease;
  padding: ${props => {
    switch (props.size) {
      default:
        return `15px 25px`
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      default:
        return `15px`
    }
  }};
  text-transform: uppercase;
  background-color: ${props => {
    switch (props.color) {
      default:
        return `${color_blue_main} !important`
    }
  }};
  
  color: ${props => {
    switch (props.color) {
      default:
        return `#FFF`
    }
  }};

  &:hover {
    background-color: ${props => {
      switch (props.color) {
        default:
          return `${color_blue_dark} !important`
      }
    }};
  }
`

const Button = props => {
  return <ButtonStyled {...props}>{props.text}</ButtonStyled>
}

Button.defaultProps = {
  type: "button"
}

export default Button
