import Styled from "styled-components"
import { currencyFormat } from "string-manager"
import { color_gray_dark, color_gray_medium } from "../Const"

// components
import Button from "../buttons/index"
import ImagePrevBox from "./ImagePreviewBox"
import GA from "../../components/boxs/GA"

const ProductBoxStyled = Styled.div`
margin: 20px 0;
line-height: 2;

.product-page-right {
 padding: 0;
 margin-bottom: 30px;
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
  text-transform: capitalize;
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
}

// responsiveness
 // gridlex _xs
 @media (max-width: 36em) {
   
 }
 // gridlex _sm
 @media (max-width: 48em) {
  .product-page-right {
   padding: 10px !important;
  }
 }
`

const ProductBox = ({ data }) => {
  return (
    <ProductBoxStyled>
      <div className="grid">
        <div className="col-4_xs-12 product-page-right">
          <div className="product-title">
            <h1 style={{ lineHeight: 1.5 }}>{data.name}</h1>
          </div>
          <div className="product-rate">
            <img
              src="https://img.icons8.com/color/20/000000/filled-star.png"
              alt="rate 1 icon"
            />
            <img
              src="https://img.icons8.com/color/20/000000/filled-star.png"
              alt="rate 2 icon"
            />
            <img
              src="https://img.icons8.com/color/20/000000/filled-star.png"
              alt="rate 3 icon"
            />
            <img
              src="https://img.icons8.com/color/20/000000/filled-star.png"
              alt="rate 4 icon"
            />
            <img
              src="https://img.icons8.com/color/20/000000/star-half.png"
              alt="rate 5 icon"
            />
          </div>

          <div className="product-status">
            <strong>Waktu Rilis: </strong> {data.release_date}
            <br />
            <strong>Brand: </strong>{" "}
            <a href={`/bikes?brand=${data.brand.id}`}>{data.brand.name}</a>
            <br />
            <strong>Tipe:</strong>{" "}
            <a href={`/bikes?type=${data.type.id}`}>{data.type.name}</a>
            <br />
            <strong>Harga Resmi:</strong> Rp{" "}
            {currencyFormat(data.estimated_price)},-
          </div>
          <br />
          <Button
            style={{ marginTop: 5 }}
            color="blue"
            size="large"
            text="Bandingkan Spek"
            type="link"
            targetAs={`/bikes/compare/${data.id}`}
            target={`/bikes/compare/[id]`}
          />
        </div>

        <div className="col-8_xs-12 product-page-left">
          <ImagePrevBox data={data.images} />
        </div>

        <div className="col-12">
          <GA
            style={{ marginBottom: 0 }}
            adClient="ca-pub-4468477322781117"
            adSlot="4316048838"
          />
        </div>
      </div>
    </ProductBoxStyled>
  )
}

export default ProductBox
