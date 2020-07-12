import Styled from "styled-components"

import { color_gray_dark, color_gray_medium } from "../Const"

const ProductBoxStyled = Styled.div`
margin: 80px 0;
.product-page-left {
 .preview-product {
   img {
     max-width: 100%;
   }
 }
 .product-thumb {
   overflow-x: auto;
   overflow-y: hidden;
   height: 100px;
   padding: 2px 0;
   .product-thumb-item {
     margin-right: 6px;
     width: calc(25% - 7px);
     height: 100px;
     border: 1px solid ${color_gray_medium};
     float: left;
     background-position: center;
     background-size: contain;
     background-repeat: no-repeat;
     &:last-child {
       margin-right: 0;
     }
   }
 }
}

.product-page-right {
 padding: 0 0 0 40px;
 .product-title {
  h1 {
    padding: 0;
    margin: 0;
    font-size: 18px;
  }
 }
 .product-rate {
  padding: 5px 0;
 }
 .product-status {
  line-height: 1.5;
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

const ProductBox = (props) => {
  return (
    <ProductBoxStyled>
      <div className="grid">
        <div className="col-6_xs-12 product-page-left">
          <div className="preview-product">
            <img
              src="/static/images/dummies/product-2.jpg"
              alt="product preview"
            />
          </div>
          <div className="product-thumb">
            <div
              style={{
                backgroundImage: `url(${"/static/images/dummies/product-2.jpg"})`,
              }}
              className="product-thumb-item"
            />
            <div
              style={{
                backgroundImage: `url(${"/static/images/dummies/product-1.jpg"})`,
              }}
              className="product-thumb-item"
            />
            <div
              style={{
                backgroundImage: `url(${"/static/images/dummies/product-1.jpg"})`,
              }}
              className="product-thumb-item"
            />
            <div
              style={{
                backgroundImage: `url(${"/static/images/dummies/product-2.jpg"})`,
              }}
              className="product-thumb-item"
            />
          </div>
        </div>

        <div className="col-6_xs-12 product-page-right">
          <div className="product-title">
            <h1>Argon 81 Krypton Red</h1>
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
            <strong>Kondisi:</strong> Bekas
            <br />
            <strong>COD:</strong> di Sleman
          </div>
          <div className="product-price">Rp 23.000.000,-</div>
          <div className="product-shortdesc">
            Curabitur semper varius lectus sed consequat. Nam accumsan dapibus
            sem, sed lobortis nisi porta vitae. Ut quam tortor, facilisis nec
            laoreet consequat, malesuada a massa. Proin pretium tristique leo et
            imperdiet.
          </div>
          <div className="product-share">
            <span style={{ marginRight: 20 }}>SHARE:</span>
            <a className="product-share_icon" href="#">
              <img
                src="https://img.icons8.com/android/20/000000/facebook.png"
                alt="Facebook share"
              />
            </a>
            <a className="product-share_icon" href="#">
              <img
                src="https://img.icons8.com/android/20/000000/twitter.png"
                alt="Twitter share"
              />
            </a>
          </div>
        </div>
      </div>
    </ProductBoxStyled>
  )
}

export default ProductBox
