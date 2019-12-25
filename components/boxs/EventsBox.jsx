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
  const { results, status, message, total, is_loading } = props.data

  return (
    <EventsBoxStyled>
      {!props.noHeaderTitle ? (
        <div className="grid-center">
          <h2 className="video-box-title">
            {props.title || "Yang Baru di Events"}
          </h2>
        </div>
      ) : (
        <center style={{ marginBottom: 50, lineHeight: 1.5 }}>
          Menampilkan <strong>{results ? results.length : 0}</strong> dari{" "}
          <strong>{total || 0}</strong> events
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

      {status ? (
        results && results.length > 0 ? (
          <div className="grid">
            {results.map((n, key) => {
              return (
                <React.Fragment key={key}>
                  <Card data={n} />
                  {(key + 1) % 3 === 0 ? (
                    <div className="col-12_md-6_xs-12">
                      <GA
                        adClient="ca-pub-4468477322781117"
                        adSlot="4316048838"
                      />
                    </div>
                  ) : null}
                </React.Fragment>
              )
            })}
          </div>
        ) : null
      ) : null}

      {is_loading ? <Loader /> : null}

      {status && status !== 200 ? <Error text={message} /> : null}

      {props.loadmoreHandler &&
      !is_loading &&
      status === 200 &&
      results &&
      results.length > total ? (
        <div className="grid-center" style={{ margin: "20px 0 40px" }}>
          <Button
            type="button"
            isDisabled={is_loading}
            text={!is_loading ? "Event Berikutnya" : "Loading..."}
            size="large"
            onClick={() => props.loadmoreHandler()}
          />
        </div>
      ) : null}

      {!props.hideAds ? (
        <GA adClient="ca-pub-4468477322781117" adSlot="4316048838" />
      ) : null}
    </EventsBoxStyled>
  )
}

export default EventsBox
