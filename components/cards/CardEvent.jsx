import Styled from "styled-components"
import {
  color_gray_dark,
  color_black_main,
  color_blue_main,
  color_red_main,
  color_white_main,
} from "../Const"
import DayJs from "../../modules/dayjs"
import Link from "next/link"

const CardEventStyled = Styled.div`
  padding: 0 20px;
  margin-bottom: 60px;

  .label {
    &.label-red {
      background-color: ${color_red_main};
      color: ${color_white_main};
      text-decoration: none;
      text-align: center;
      position: absolute;
      top: 0;
      width: calc(100% - 10px);
      left: 0;
      padding: 10px 5px;
    }
  }

  .card-event-cover {
    position: relative;
    padding: 10px 20px;
    height: 250px;
    background-size: cover;
    background-position: top center;
    cursor: pointer;
  }

  .card-event-time {
    text-align: left;
    overflow-y: hidden;
    .card-event-label {
      padding: 15px 0;
      margin-right: 15px;
      transition: background .5s ease;
      background-color: #FFF;
      color: ${color_blue_main};
      font-weight: bold;
      text-transform: uppercase;
      text-decoration: none;
      display: inline-block;
    }
  }

  .card-event-title {
    max-height: 63px;
    overflow: hidden;
    min-height: 35px;
    h3 {
      bottom: 0;
      margin: 0;
      font-size: 1.5em;
      text-align: left;
      a {
        color: ${color_black_main};
        font-weight: bold;
        text-decoration: none;
      }
    }
  }

  .card-event-content {
    text-align: left;
    margin-bottom: 10px;
    line-height: 1.5;
    color: ${color_gray_dark};
    max-height: 50px;
    overflow: hidden;
  }

  .card-event-category {
    font-size: 14px;
    color: ${color_gray_dark};
    text-align: left;
  }
`

const CardEvent = (props) => {
  const { data } = props
  return (
    <CardEventStyled className="col-4_xs-12_md-6">
      <Link href="/events/[id]" as={data.link}>
        <a>
          <div
            className="card-event-cover"
            style={{
              backgroundImage: `url(${data.poster[600]})`,
            }}>
            {data.is_ended ? (
              <div className="label label-red">TELAH BERAKHIR</div>
            ) : null}
          </div>
        </a>
      </Link>

      <div className="card-event-time">
        <span className="card-event-label">
          {DayJs(data.start_time).format("DD MMMM YYYY HH:mm")} <br />{" "}
          {data.location.address}
        </span>
      </div>

      <div className="card-event-title">
        <h3>
          <Link href="/events/[id]" as={data.link}>
            <a>{data.title}</a>
          </Link>
        </h3>
      </div>

      <div className="card-event-content">{data.note}</div>

      {/* <div className="card-event-category">Gowes Bareng</div> */}
    </CardEventStyled>
  )
}

export default CardEvent
