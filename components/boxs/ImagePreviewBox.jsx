import { useState } from "react"
import Styled from "styled-components"
import { color_gray_medium, color_gray_dark, color_blue_main } from "../Const"
import { imageFormatUrl } from "../../modules/cloudinary"

const ImagePreviewBoxStyled = Styled.div`
.preview-product {
  cursor: pointer;
  margin-bottom: 30px;
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
   transition: border ease .5s;
   border-radius: 10px;
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
   &:hover {
    border: 1px solid ${color_gray_dark};
   }
   &.active {
    border: 1px solid ${color_blue_main};
   }
 }
}
`

const DefaultImages = ["/static/images/dummies/product-2.jpg"]

const ImagePreviewBox = (props) => {
  const [mainImg, setMainImg] = useState(0)

  let images = props.data.length < 1 ? DefaultImages : props.data

  return (
    <ImagePreviewBoxStyled>
      <div className="preview-product">
        <img
          src={imageFormatUrl(images[mainImg], "c_scale,w_900")}
          alt="product preview"
        />
      </div>
      <div className="product-thumb">
        {images.map((n, key) => {
          return (
            <div
              key={key}
              onClick={() => setMainImg(key)}
              style={{
                backgroundImage: `url(${imageFormatUrl(n, "c_scale,w_200")})`,
              }}
              className={`product-thumb-item ${key == mainImg ? "active" : ""}`}
            />
          )
        })}
      </div>
    </ImagePreviewBoxStyled>
  )
}

ImagePreviewBox.defaultProps = {
  data: [],
}

export default ImagePreviewBox
