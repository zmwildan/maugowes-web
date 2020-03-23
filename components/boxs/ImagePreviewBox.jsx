import { useState } from "react"
import Styled from "styled-components"
import { color_gray_medium } from "../Const"

const ImagePreviewBoxStyled = Styled.div`
.preview-product {
cursor: pointer;
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
   cursor: pointer;
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

const Images = [
  "/static/images/dummies/product-2.jpg",
  "/static/images/dummies/product-1.jpg"
]

const ImagePreviewBox = props => {
  const [mainImg, setMainImg] = useState(0)

  return (
    <ImagePreviewBoxStyled>
      <div className="preview-product">
        <img src={Images[mainImg]} alt="product preview" />
      </div>
      <div className="product-thumb">
        {Images.map((n, key) => {
          return (
            <div
              key={key}
              onClick={() => setMainImg(key)}
              style={{
                backgroundImage: `url(${n})`
              }}
              className="product-thumb-item"
            />
          )
        })}
      </div>
    </ImagePreviewBoxStyled>
  )
}

export default ImagePreviewBox
