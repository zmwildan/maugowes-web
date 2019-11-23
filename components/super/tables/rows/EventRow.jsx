import Styled from 'styled-components'
import DayJs from '../../../../modules/dayjs'
import Link from 'next/router'
import { BlogRowStyled } from './BlogRow'
import {
  color_blue_main,
  color_gray_soft,
  color_white_main,
  color_red_main
} from '../../../Const'

export const EventRowStyled = Styled(BlogRowStyled)`
  a {
    font-weight: bold;
  }
  ${props => {
    const { status } = props
    let bg = color_blue_main
    if (status === 'reject') {
      bg = color_red_main
    } else if (status === 'waiting') {
      bg = color_gray_soft
    }
    return `
      .label-${props.status} {
        color: ${color_white_main};
        background-color: ${bg};
        padding: 0 6px;
        border-radius: 5px;
        margin-left: 5px;
      }
    `
  }}
`

export default props => {
  const { data } = props
  return (
    <EventRowStyled className="table-row" status={data.status}>
      <a href={`/super/events/detail/${data.id}`}>{data.title}</a>
      <span className={`label-${data.status}`}>{data.status}</span>
      <br />
      Dipost {DayJs(data.created_on * 1000).fromNow()}
    </EventRowStyled>
  )
}
