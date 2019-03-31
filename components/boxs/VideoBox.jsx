import Styled from "styled-components"
import Card from "../cards/CardBlog"
import { color_blue_main } from "../Const"
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
  const { results, status, nextPageToken, message } = props.data
  return (
    <VideoBoxStyled noHeaderTitle={props.noHeaderTitle}>
      {!props.noHeaderTitle ? (
        <div className="grid-center">
          <h2 className="video-box-title">
            {props.title || "Yang Baru di Video"}
          </h2>
        </div>
      ) : null}

      {status ? (
        results && results.length > 0 ? (
          <div className="grid">
            {results.map((n, key) => {
              return <Card key={key} isVideo data={n} />
            })}
          </div>
        ) : null
      ) : (
        <Loader />
      )}

      {status && status !== 200 ? <Error text={message} /> : null}

      {props.loadmoreHandler && nextPageToken ? (
        <div className="grid-center" style={{ marginBottom: 20 }}>
          <Button
            text="Video Berikutnya"
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
