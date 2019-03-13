import Styled from "styled-components"
import { color_blue_main, color_blue_dark } from "../Const"
import Link from "next/link"

const ButtonStyled = Styled.div`

  button, a {
    cursor: pointer;
    border: none;
    transition: background .5s ease;
    text-decoration: none;
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
  }
`

const Button = props => {
  return (
    <ButtonStyled {...props}>
      {props.type === "link" ? (
        <Link prefetch href={props.target}>
          {props.text}
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
