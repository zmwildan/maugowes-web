import Styled from 'styled-components'
import {
  color_blue_main,
  color_gray_dark,
  color_white_main,
  color_red_main
} from '../Const'
const LabelStyle = Styled.span`
	padding: 4px 10px;
	border-radius: 5px;
	color: ${color_white_main};
	${({ status }) => {
    let bg = color_blue_main
    switch (status) {
      case 'reject':
        bg = color_red_main
        break
      case 'waiting':
        bg = color_gray_dark
        break
      default:
        break
    }
    return `
			background-color: ${bg};
		`
  }}
`
const Label = props => {
  return <LabelStyle status={props.status}>{props.status}</LabelStyle>
}

export default Label
