import Styled from 'styled-components'
import DayJs from '../../../../modules/dayjs'
import Link from 'next/router'
import { BlogRowStyled } from './BlogRow'
import {
  color_blue_main,
  color_gray_dark,
  color_white_main,
  color_red_main
} from '../../../Const'
import Label from '../../../labels'

export const EventRowStyled = Styled(BlogRowStyled)`
  a {
    font-weight: bold;
    margin-right: 5px;
  }
`

export default props => {
  const { data } = props
  return (
    <EventRowStyled className="table-row">
      <a href={`/super/events/detail/${data.id}`}>{data.title}</a>
      <Label status={data.event_status} />
      <br />
      Dipost {DayJs(data.created_on * 1000).fromNow()}
    </EventRowStyled>
  )
}
