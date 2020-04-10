import Styled from "styled-components"
import { currencyFormat, toSlug } from "string-manager"
import { color_gray_dark, color_blue_main, color_black_main } from "../Const"
import Link from "next/link"
import { imageFormatUrl } from "../../modules/cloudinary"

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
      className="col-4_xs-6"
      onClick={() => {
        if (typeof window !== "undefined") {
          location.href = linkTarget
        }
      }}>
      <div className="card-bike">
        <div
          className="card-bike__thumb"
          style={{
            backgroundImage: `url(${imageFormatUrl(
              data.images,
              "c_scale,w_300"
            )})`,
          }}
        />
        <div className="card-bike__text">
          <Link href={"/bikes/[id]"} as={linkTarget} prefetch>
            <a href={linkTarget}>
              <h3>{data.name}</h3>
              <small className="text-muted">
                estimasi Rp {currencyFormat(data.estimated_price)},-
              </small>
            </a>
          </Link>
        </div>
      </div>
    </CardBikeStyled>
  )
}

export default CardBike
