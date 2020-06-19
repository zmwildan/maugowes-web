import React from "react"
import Styled from "styled-components"

// components
import Card from "../cards/CardVideo"

const VideoSuperSmallBoxStyled = Styled.div`
  .video-ss-box-title {
    padding-left: 20px;
  }
`

const VideoSuperSmallBox = (props) => {
  if (props.data.status && props.data.status == 200) {
    return (
      <VideoSuperSmallBoxStyled>
        {/* title */}
        {props.title ? (
          <div className="video-ss-box-title">
            <h4>{props.title}</h4>
          </div>
        ) : null}
        {/* end of title */}

        {/* start looping */}
        <div className="grid">
          {props.data.results.map((n, key) => (
            <Card key={key} size="supersmall" data={n} />
          ))}
        </div>
        {/* end of looping */}
      </VideoSuperSmallBoxStyled>
    )
  } else {
    return null
  }
}

VideoSuperSmallBox.defaultProps = {
  data: {},
}

export default VideoSuperSmallBox
