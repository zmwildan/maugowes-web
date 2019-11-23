import Styled from 'styled-components'
import {
  color_blue_main,
  color_blue_dark,
  color_black_main,
  color_white_main,
  // color_gray_dark,
  color_gray_medium
} from '../Const'
import Link from 'next/link'

const ButtonStyled = Styled.div`

  button, a {
    cursor: pointer;
    opacity: ${props => (props.isDisabled ? 0.8 : 1)};
    transition: background .5s ease;
    text-decoration: none;
    font-weight: bold;
    padding: ${props => {
      switch (props.size) {
        case 'small':
          return `10px 15px;`
        default:
          return `15px 25px;`
      }
    }};
    font-size: ${props => {
      switch (props.size) {
        case 'small':
          return `14px;`
        default:
          return `15px;`
      }
    }};
    text-transform: uppercase;
    background-color: ${props => {
      switch (props.color) {
        case 'white':
          return `${color_white_main} !important;`
        case 'black':
          return `${color_black_main} !important;`
        default:
          return `${color_blue_main} !important;`
      }
    }};
    border: ${props => {
      switch (props.color) {
        case 'white':
          return `1px solid ${color_black_main} !important;`
        case 'black':
          return `1px solid ${color_black_main} !important;`
        default:
          return `1px solid ${color_blue_main} !important;`
      }
    }}
    color: ${props => {
      switch (props.color) {
        case 'white':
          return `${color_black_main} !important;`
        default:
          return `#FFF;`
      }
    }};
    &:hover {
      background-color: ${props => {
        switch (props.color) {
          case 'white':
            return `${color_gray_medium} !important;`
          default:
            return `${color_blue_dark} !important;`
        }
      }};
    }
  }
`

const Button = props => {
  return (
    <ButtonStyled {...props} disabled={props.isDisabled}>
      {props.type === 'link' ? (
        <Link id={props.btnId || 'id of button'} href={props.target} prefetch>
          <a href={props.target}>{props.text}</a>
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
  type: 'button',
  target: '',
  btnId: 'btn-id',
  onClick: () => {}
}

export default Button
