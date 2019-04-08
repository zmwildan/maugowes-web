import Styled from "styled-components"
import { color_gray_soft, color_black_main, color_gray_dark } from "../Const"
import Dayjs from "dayjs"
import RelativeTime from "dayjs/plugin/relativeTime"

Dayjs.extend(RelativeTime)

const VideoCard = Styled.div`
  border: 1px solid ${color_gray_soft};
  margin-bottom: 25px;
 
 .video-card-meta {
  padding: 15px;
  .video-card-title {
    height: 100px;
    overflow: hidden;
    a {
      text-decoration: none;
      color: ${color_black_main};
    }
    h2 {
      font-size: 18px;
      font-weight: 400;
    }
   } 
  
   .video-card-date {
     font-size: 14px;
     color: ${color_gray_dark}
   }
 }

 .video-card-cover {
  position: relative;
  height: 200px;
  background-size: cover;
  background-position: center;
  .btn-play-video {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -25px;
    margin-top: -25px;
    cursor: pointer
  }
  .btn-play-video img {
    width: 50px;
  }
 }
`

export default props => {
  const { data = {} } = props || {}
  const linkUrl = `https://www.youtube.com/watch?v=${data.id}`
  return (
    <div className="col-4">
      <VideoCard>
        <div
          className="video-card-cover"
          style={{ backgroundImage: `url(${data.thumbnails.high.url})` }}>
          <a
            className="btn-play-video"
            href={linkUrl}
            target="_blank"
            title="play video">
            <img
              src={"/static/images/icons/white-play-button.png"}
              alt="play video"
            />
          </a>
        </div>
        <div className="video-card-meta">
          <div className="video-card-title">
            <a href={linkUrl} target="_blank">
              <h2>{data.title}</h2>
            </a>
          </div>
          <div className="video-card-date">
            Posted {Dayjs(data.publishedDate).fromNow()}
          </div>
        </div>
      </VideoCard>
    </div>
  )
}
