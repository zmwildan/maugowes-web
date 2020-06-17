import Styled from "styled-components"
import { currencyFormat, toSlug } from "string-manager"
import { color_gray_dark, color_blue_main, color_black_main } from "../Const"
import Link from "next/link"
import { imageFormatUrl } from "../../modules/cloudinary"

const CardBikeStyled = Styled.div`
 .card-bike {
  cursor: pointer;
  height: 380px;
  overflow: hidden;
  a {
   color: ${color_black_main};
  }
  .card-bike__thumb__padding {
    padding: 10px;
    border: 1px solid ${color_gray_dark};
    &:hover {
      border: 1px solid ${color_blue_main};
     }
    .card-bike__thumb {
      height: 180px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  
  .card-bike__text {
    h3 {
      font-weight: 300
    }
  }
 }
`

const CardBike = ({ data, size }) => {
  const linkTarget = `/bikes/${toSlug(data.name)}-${data.id}`
  return (
    <CardBikeStyled className={size == "large" ? "col-3_xs-6" : "col-4_xs-6"}>
      <div className="card-bike">
        <Link href={"/bikes/[id]"} as={linkTarget}>
          <div className="card-bike__thumb__padding">
            <div
              className="card-bike__thumb"
              style={{
                backgroundImage: `url(${imageFormatUrl(
                  data.images,
                  "c_scale,w_300"
                )})`,
              }}
            />
          </div>
        </Link>
        <div className="card-bike__text">
          <Link href={"/bikes/[id]"} as={linkTarget}>
            <a>
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
