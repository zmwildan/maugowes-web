import Styled from "styled-components"
import Card from "../cards/CardBlog"
import { color_blue_main } from "../Const"

const VideoBox = Styled.div`
  margin-top: ${props => (props.noHeaderTitle ? "80px" : "40px")};
  .video-box-title {
    border-bottom: 2px solid ${color_blue_main};
    padding-bottom: 10px;
    font-size: 20px
  }
`

export default props => {
  return (
    <VideoBox noHeaderTitle={props.noHeaderTitle}>
      {!props.noHeaderTitle ? (
        <div className="grid-center">
          <h2 className="video-box-title">
            {props.title || "Yang Baru di Video"}
          </h2>
        </div>
      ) : null}

      <div className="grid">
        <Card isVideo />
        <Card isVideo />
        <Card isVideo />
        <Card isVideo />
      </div>
    </VideoBox>
  )
}
