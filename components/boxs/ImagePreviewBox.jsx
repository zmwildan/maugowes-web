import Styled from "styled-components"
import { color_gray_dark, color_gray_medium } from "../Const"

const ImagePreviewBoxStyled = Styled.div`
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
`

const ImagePreviewBox = props => {
  return (
    <ImagePreviewBoxStyled>
      <div className="preview-product">
        <img src="/static/images/dummies/product-2.jpg" alt="product preview" />
      </div>
      <div className="product-thumb">
        <div
          style={{
            backgroundImage: `url(${"/static/images/dummies/product-2.jpg"})`
          }}
          className="product-thumb-item"
        />
        <div
          style={{
            backgroundImage: `url(${"/static/images/dummies/product-1.jpg"})`
          }}
          className="product-thumb-item"
        />
        <div
          style={{
            backgroundImage: `url(${"/static/images/dummies/product-1.jpg"})`
          }}
          className="product-thumb-item"
        />
        <div
          style={{
            backgroundImage: `url(${"/static/images/dummies/product-2.jpg"})`
          }}
          className="product-thumb-item"
        />
      </div>
    </ImagePreviewBoxStyled>
  )
}

export default ImagePreviewBox
