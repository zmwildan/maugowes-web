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
    title: "Punya Event Sepeda ?",
    cover_image: "https://images.unsplash.com/photo-1558009525-29a300db7b7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
    link_target: "/events",
    link_text: "Sebarkan Disini"
  },
  // {
  //   title: "Pamer Kegiatan Gowes Kamu Disini",
  //   cover_image:
  //     "https://images.unsplash.com/photo-1529148598219-967881aed3c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  //   link_target: "/galleries",
  //   link_text: "Lanjutkan"
  // }
]

export default () => {
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
