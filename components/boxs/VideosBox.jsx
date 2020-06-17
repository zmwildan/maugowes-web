import React from "react"
import Styled from "styled-components"
import Card from "../cards/CardVideo"
import Loader from "../Loader"
import Error from "../cards/CardError"
import Button from "../buttons/index"
import GA from "./GA"

let isEven = true

const VideosBoxStyled = Styled.div`
  margin-top: ${(props) => (props.noHeaderTitle ? "50px" : "40px")};
  .video-box-title {
    padding-bottom: 10px;
    font-size: 30px;
    font-weight: 500;
  }
`

const VideosBox = (props) => {
  const { results, status, message, total, is_loading } = props.data
  return (
    <VideosBoxStyled noHeaderTitle={props.noHeaderTitle}>
      {!props.noHeaderTitle ? (
        <div className="grid-center">
          <h2 className="video-box-title">
            {props.title || "Yang Baru di Video"}
          </h2>
        </div>
      ) : total ? (
        <center style={{ marginBottom: 50 }}>
          Menampilkan <strong>{results.length || 0}</strong> dari{" "}
          <strong>{total}</strong> video
        </center>
      ) : null}

      {status ? (
        results && results.length > 0 ? (
          <div className="grid">
            {results.map((n, key) => {
              let size = "default"

              return (
                <React.Fragment key={key}>
                  <Card size={size} data={n} />
                  {results.length > 9 &&
                  key !== 0 &&
                  key !== results.length - 1 &&
                  (key + 1) % 9 === 0 ? (
                    <div className="col-12">
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
      results.length >= props.maxResults ? (
        <div className="grid-center" style={{ margin: "20px 0 40px" }}>
          <Button
            type="button"
            isDisabled={is_loading}
            text={!is_loading ? "Video Berikutnya" : "Loading..."}
            size="large"
            onClick={() => props.loadmoreHandler()}
          />
        </div>
      ) : null}
      {!props.hideAds ? (
        <GA adClient="ca-pub-4468477322781117" adSlot="4886894471" />
      ) : null}
    </VideosBoxStyled>
  )
}

VideosBox.defaultProps = {
  data: {},
}

export default VideosBox
