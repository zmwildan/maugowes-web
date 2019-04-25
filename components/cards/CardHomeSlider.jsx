import React from "react"
import Styled from "styled-components"
import Button from "../buttons/index"

const CardHomeSlidderStyled = Styled.div`
  width: 100%;
  height: 450px;

  .slider-item-right {
    padding: 0 20px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    h2 {
      font-size: 2.5em;
    }
  }

  .slider-item-left {
    background-size: cover;
  }
`

const SliderContent = [
  {
    title: "Mau Jual / Beli Sepeda Bekas",
    cover_image:
      "https://images.unsplash.com/photo-1468436385273-8abca6dfd8d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=994&q=80",
    link_target: "/marketplace",
    link_text: "Cek Disini"
  },
  {
    title: "Pamer Kegiatan Gowes Kamu Disini",
    cover_image:
      "https://images.unsplash.com/photo-1529148598219-967881aed3c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    link_target: "/galleries",
    link_text: "Lanjutkan"
  }
]

export default props => {
  return SliderContent.map((n, key) => (
    <CardHomeSlidderStyled className="grid" key={key}>
      <div
        className="col-8_xs-6 slider-item-left"
        style={{ backgroundImage: `url(${n.cover_image})` }}
      />
      <div className="col-4_xs-6">
        <div className="slider-item-right">
          <div>
            <h2>{n.title}</h2>
            <Button size="medium" text={n.link_text} />
          </div>
        </div>
      </div>
    </CardHomeSlidderStyled>
  ))
}
