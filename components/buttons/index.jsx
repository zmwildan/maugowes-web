import Styled from "styled-components"
import {
  color_black_main,
  color_white_main,
  color_gray_medium,
  color_red_main,
  color_blue_main,
} from "../Const"
import Link from "next/link"

const ButtonStyled = Styled.div`
  &.btn-inline {
    display: inline;
    margin-right: 10px;
  }
  button, a {
    cursor: pointer;
    opacity: ${(props) => (props.isDisabled ? 0.8 : 1)};
    transition: background .5s ease;
    text-decoration: none;
    font-weight: 700;
    border-radius: 5px;
    word-break: break-word;
    padding: ${(props) => {
      switch (props.size) {
        case "small":
          return `10px 15px;`
        default:
          return `15px 50px;`
      }
    }};
    font-size: ${(props) => {
      switch (props.size) {
        case "small":
          return `14px;`
        default:
          return `15px;`
      }
    }};
    text-transform: uppercase;
    background-color: ${(props) => {
      switch (props.color) {
        case "white":
          return `${color_white_main} !important;`
        case "black":
          return `${color_black_main} !important;`
        case "red":
          return `${color_red_main} !important;`
        default:
          return `${color_white_main} !important;`
      }
    }};
    border: ${(props) => {
      switch (props.color) {
        case "white":
          return `2px solid ${color_black_main} !important;`
        case "black":
          return `2px solid ${color_black_main} !important;`
        case "red":
          return `2px solid ${color_red_main} !important;`
        default:
          return `2px solid ${color_blue_main} !important;`
      }
    }}
    color: ${(props) => {
      switch (props.color) {
        case "white":
          return `${color_black_main} !important;`
        case "red":
        case "black":
          return `${color_white_main} !important;`
        default:
          return `${color_blue_main} !important`
      }
    }};
    &:hover {
      background-color: ${(props) => {
        switch (props.color) {
          case "white":
            return `${color_gray_medium} !important;`
          case "red":
            return `2px solid ${color_red_main} !important;`
          default:
            return `${color_white_main} !important;`
        }
      }};
    }
  }
`

const Button = (props) => {
  return (
    <ButtonStyled
      disabled={props.isDisabled}
      {...props}
      style={props.containerStyle}>
      {props.type === "link" ? (
        <Link href={props.target} as={props.targetAs || props.target}>
          <a href={props.targetAs || props.target}>{props.text}</a>
        </Link>
      ) : (
        <button id={props.btnId} type="button" onClick={() => props.onClick}>
          {props.text}
        </button>
      )}
    </ButtonStyled>
  )
}

Button.defaultProps = {
  type: "button",
  target: "",
  btnId: "btn-id",
  onClick: () => {},
  containerStyle: {},
}

export default Button
