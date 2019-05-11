import React from "react"
import Styled from "styled-components"
import Card from "../cards/CardVideo"
import { color_blue_main, color_gray_dark } from "../Const"
import Loader from "../Loader"
import Error from "../cards/CardError"
import Button from "../buttons/index"

const VideoBoxStyled = Styled.div`
  margin-top: ${props => (props.noHeaderTitle ? "80px" : "40px")};
  .video-box-title {
    border-bottom: 2px solid ${color_blue_main};
    padding-bottom: 10px;
    font-size: 20px
  }
`

const VideoBox = props => {
  const { results, status, message, stats, is_loading } = props.data
  return (
    <VideoBoxStyled noHeaderTitle={props.noHeaderTitle}>
      {!props.noHeaderTitle ? (
        <div className="grid-center">
          <h2 className="video-box-title">
            {props.title || "Yang Baru di Video"}
          </h2>
        </div>
      ) : stats ? (
        <center style={{ marginBottom: 50 }}>
          Menampilkan <strong>{results.length || 0}</strong> dari{" "}
          <strong>{stats.totalResults}</strong> video
        </center>
      ) : null}

      {status ? (
        results && results.length > 0 ? (
          <div className="grid">
            {results.map((n, key) => {
              let size = "default"
              if (key === 0 || key % 5 === 0) size = "large"
              return <Card size={size} key={key} data={n} />
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
    </VideoBoxStyled>
  )
}

VideoBox.defaultProps = {
  data: {}
}

export default VideoBox
