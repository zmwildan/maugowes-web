import Styled from "styled-components"
import { color_gray_soft, color_gray_medium, color_blue_main } from "../Const"

const CardProductStyled = Styled.div`
  padding: 10px;
  text-align: center;
  .card-product {
    border: 1px solid ${color_gray_medium};
    position: relative;

    span.label {
      padding: 5px 10px;
      background-color: ${color_blue_main};
      color: #FFF;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  
    .card-product-cover {
      height: 200px;
      background-size: cover;
    }
    .card-product-text {
      padding: 10px;
      padding-top: 20px;
      height: 50px;
      font-weight: 500;
    }
    .card-product-desc {
      font-size: 10px;
      color: ${color_gray_medium};
      font-weight: 100;
      letter-spacing: .5px;
    }
    .card-product-price {
      padding: 10px;
      padding-bottom: 20px;
      font-weight: 600;
      font-size: 18px;
      color: ${color_blue_main}
    }
  }
`

const CardProduct = props => {
  return (
    <CardProductStyled className="col-3">
      <div className="card-product">
        <span className="label">Bekas</span>
        <div className="card-product-cover" style={{backgroundImage: `url(/static/images/dummies/product-1.jpg)`}} />
        <div className="card-product-text">
          Stem Zipp Course 100mm
        </div>
        <div className="card-product-desc">
          COD di Sleman, DIY
        </div>
        <div className="card-product-price">
          Rp 700.000,-
        </div>
      </div>
    </CardProductStyled>
  )
}

export default CardProduct