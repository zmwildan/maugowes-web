import React from "react"
import Styled from "styled-components"
import Card from "../cards/CardEvent"
import { color_blue_main, color_gray_medium, color_gray_dark } from "../Const"
import Loader from "../Loader"
import Error from "../cards/CardError"
import Button from "../buttons/index"
import GA from "./GA"
import Link from "next/link"

const EventsBoxStyled = Styled.div`
  margin-top: ${props => (props.noHeaderTitle ? "80px" : "40px")};
  .events-box-title {
    border-bottom: 2px solid ${color_blue_main};
    padding-bottom: 10px;
    font-size: 20px
  }
  .events-box-meta {
    a {
      color: ${color_gray_dark};
      text-decoration: none;
    }
  }
`

const EventsBox = props => {

  const is_loading = false
  const status = null

  return (
    <EventsBoxStyled>
      {!props.noHeaderTitle ? (
        <div className="grid-center">
          <h2 className="events-box-title">{"Yang Baru di Events"}</h2>
        </div>
      ) : (
        <center className="events-box-meta" style={{ marginBottom: 50 }}>
          Menampilkan <strong>30</strong> dari <strong>500</strong> events
          <br />
          Atau kamu juga bisa{" "}
          <Link href="/events/send" prefetch>
            <a
              href="/events/send"
              title="Kamu punya event sepeda, yuk kirim ke Mau Gowes">
              + Kirim Event Baru
            </a>
          </Link>
        </center>
      )}
      
      <div className="grid">
        <Card />
        <Card />
        <Card />
      </div>

      {is_loading ? <Loader /> : null}

      {status && status !== 200 ? <Error text={message} /> : null}

      <div className="grid-center" style={{ margin: "20px 0 40px" }}>
        <Button
          btnId="btn-load-more-blog"
          type="button"
          isDisabled={is_loading}
          text={!is_loading ? "Events Berikutnya" : "Loading..."}
          size="large"
          onClick={() => props.loadmoreHandler()}
        />
      </div>

      {!props.hideAds ? (
        <GA adClient="ca-pub-4468477322781117" adSlot="4316048838" />
      ) : null}

    </EventsBoxStyled>
  )
}

export default EventsBox
