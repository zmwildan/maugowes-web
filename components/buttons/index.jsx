import Styled from "styled-components"
import { color_blue_main, color_blue_dark, color_black_main } from "../Const"
import Link from "next/link"

const ButtonStyled = Styled.div`

  button, a {
    cursor: pointer;
    border: none;
    transition: background .5s ease;
    text-decoration: none;
    font-weight: bold;
    padding: ${props => {
      switch (props.size) {
        case "small":
          return `10px 15px`
        default:
          return `15px 25px`
      }
    }};
    font-size: ${props => {
      switch (props.size) {
        case "small":
          return `14px`
        default:
          return `15px`
      }
    }};
    text-transform: uppercase;
    background-color: ${props => {
      switch (props.color) {
        case "black":
          return `${color_black_main} !important`
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
  }
`

const Button = props => {
  return (
    <ButtonStyled {...props}>
      {props.type === "link" ? (
        <Link prefetch href={props.target}>
          <a href={props.target}>{props.text}</a>
        </Link>
      ) : (
        <button type="button" onClick={() => props.onClick}>
          {props.text}
        </button>
      )}
    </ButtonStyled>
  )
}

Button.defaultProps = {
  type: "button",
  target: "",
  onClick: () => {}
}

export default Button
