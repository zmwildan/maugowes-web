import Styled from "styled-components"

import { color_gray_dark, color_gray_medium } from "../Const"

// components
import Button from "../buttons/index"
import ImagePrevBox from "./ImagePreviewBox"

const ProductBoxStyled = Styled.div`
margin: 80px 0;
line-height: 2;

.product-page-right {
 padding: 0 0 0 40px;
 .product-title {
  h1 {
    padding: 0;
    margin: 0;
    font-size: 25px;
  }
 }
 .product-rate {
  padding: 5px 0;
 }
 .product-status {
  line-height: 1.9;
 }
 .product-price {
  font-size: 24px;
  padding: 10px 0;
 }
 .product-shortdesc {
  line-height: 1.8;
  padding: 20px 0;
  margin: 10px 0;
  border-top: 1px solid ${color_gray_medium};
  border-bottom: 1px solid ${color_gray_medium};
  color: ${color_gray_dark};
  font-size: 14px;
 }
 .product-share {
  color: ${color_gray_dark};
  display: flex;
  align-items: center;
  padding: 20px 0;
  .product-share_icon {
    margin-right: 20px;
  }
 }

 // responsiveness
 // gridlex _xs
 @media (max-width: 36em) {
   
 }
 // gridlex _sm
 @media (max-width: 48em) {
  .product-page-right {
   padding: 0;
  }
 }

}
`

const ProductBox = props => {
  return (
    <ProductBoxStyled>
      <div className="grid">
        <div className="col-6_xs-12 product-page-left">
          <ImagePrevBox />
        </div>

        <div className="col-6_xs-12 product-page-right">
          <div className="product-title">
            <h1>Argon 81 Krypton Red</h1>
          </div>
          <div className="product-rate">
            <img src="https://img.icons8.com/color/20/000000/filled-star.png" />
            <img src="https://img.icons8.com/color/20/000000/filled-star.png" />
            <img src="https://img.icons8.com/color/20/000000/filled-star.png" />
            <img src="https://img.icons8.com/color/20/000000/filled-star.png" />
            <img src="https://img.icons8.com/color/20/000000/star-half.png" />
          </div>
          <div className="product-status">
            <strong>Waktu Rilis: </strong> 20 Januari 2020
            <br />
            <strong>Brand: </strong> Pinarello
            <br />
            <strong>Tipe:</strong> Road Bike
            <br />
            <strong>Estimasi Harga:</strong> Rp 235.000.000,-
          </div>
          <div className="product-share">
            <span style={{ marginRight: 20 }}>SHARE:</span>
            <a className="product-share_icon" href="#">
              <img src="https://img.icons8.com/android/20/000000/facebook.png" />
            </a>
            <a className="product-share_icon" href="#">
              <img src="https://img.icons8.com/android/20/000000/twitter.png" />
            </a>
          </div>
          <Button color="blue" size="small" text="Komparasi" />
        </div>
      </div>
    </ProductBoxStyled>
  )
}

export default ProductBox
