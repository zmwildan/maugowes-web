import Styled from "styled-components"
import { scaleNumber, toSlug } from "string-manager"
import { color_gray_dark, color_blue_main, color_black_main } from "../Const"

const CardBikeStyled = Styled.div`
 .card-bike {
  &:hover {
   border: 1px solid ${color_blue_main};
  }
  cursor: pointer;
  height: 400px;
  padding: 10px;
  border: 1px solid ${color_gray_dark};
  overflow: hidden;
  a {
   color: ${color_black_main};
  }
  .card-bike__thumb {
   height: 180px;
   background-size: contain;
   background-position: center;
   background-repeat: no-repeat;
  }
  .card-bike__text {
   text-align: center;
  }
 }
`

const CardBike = ({ data }) => {
  const linkTarget = `/bikes/${toSlug(data.name)}-${data.id}`
  return (
    <CardBikeStyled
      className="col-4"
      onClick={() => {
        if (typeof window !== "undefined") {
          location.href = linkTarget
        }
      }}>
      <div className="card-bike">
        <div
          className="card-bike__thumb"
          style={{ backgroundImage: `url(${data.images})` }}
        />
        <div className="card-bike__text">
          <a href={linkTarget}>
            <h3>{data.name}</h3>
            <small className="text-muted">
              estimasi Rp {scaleNumber(data.estimated_price)}
            </small>
          </a>
        </div>
      </div>
    </CardBikeStyled>
  )
}

export default CardBike
