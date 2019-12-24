import React from "react"
import Styled from "styled-components"
import Button from "../buttons/index"

import toast from "../../modules/toast"

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
    position: relative;
    .text {
      position: absolute;
      left: 10px;
      bottom: 10px;
      color: #FFF;
      font-size: 10px;
    }
  }

  // gridlex _xs
  @media (max-width: 36em) {
    height: 350px;
    .slider-item-right {
      h2 {
        font-size: 1.5em
      }
    }
  }
  // gridlex _sm
  @media (max-width: 48em) {
    height: 350px;
    .slider-item-right {
      h2 {
        font-size: 1.5em
      }
    }
  }
`

const SliderContent = [
  {
    title: "Cek Video Terbaru di Youtube Mau Gowes",
    cover_image:
      "https://images.unsplash.com/photo-1541877944-ac82a091518a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80",
    link_target: "/videos",
    link_text: "Video Terbaru"
  },
  {
    title: "Punya Event Gowes / Ingin Gowes Bareng ?",
    cover_image: "https://images.unsplash.com/photo-1558009525-29a300db7b7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    link_target: "/events",
    link_text: "Cek Disini"
  },
  {
    title: "Postingan Terbaru di Blog Mau Gowes",
    cover_image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    link_target: "/blog",
    link_text: "Selengkapnya"
  },
]

export default () => {
  return SliderContent.map((n, key) => (
    <CardHomeSlidderStyled className="grid" key={key}>
      <div
        className="col-8_xs-6 slider-item-left"
        style={{ backgroundImage: `url(${n.cover_image})` }}
      >
        <span className="text">Sumber: unsplash.com</span>
      </div>
      <div className="col-4_xs-6">
        <div className="slider-item-right">
          <div>
            <h2>{n.title}</h2>
            <Button
              onClick={() => location.href = n.link_target}
              size="medium"
              text={n.link_text}
            />
          </div>
        </div>
      </div>
    </CardHomeSlidderStyled>
  ))
}
