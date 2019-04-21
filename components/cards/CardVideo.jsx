import Styled from "styled-components"
import { color_gray_soft, color_black_main, color_gray_dark } from "../Const"
import Dayjs from "../../modules/dayjs"

const VideoCard = Styled.div`
  border: 1px solid #FFF;
  margin-bottom: 30px;

  &:hover {
    border: 1px solid ${color_gray_soft};
  }

  &.video-large {
    height: 350px;

    .video-card-cover {
      width: 50%;
      float: left;
      height: 100%;
      .btn-play-video {
        margin-left: -50px;
        margin-top: -50px;
      }
      .btn-play-video img {
        width: 100px;
      }
    }
    .video-card-meta {
      width: calc(50% - 40px);
      float: left;
      .video-card-title {
        height: 253px;
        h2{
          font-size: 30px;
        }
      }
    }
  }

 
 .video-card-meta {
  padding: 15px 20px;
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
  background-color: #000;
  background-size: 100%;
  background-position: center;
  transition: background .5s ease;
  background-repeat: no-repeat;
  &:hover {
    background-size: 400px;
  }
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
  const { data = {}, size } = props || {}
  const linkUrl = `https://www.youtube.com/watch?v=${data.id}`
  return (
    <div className={size === "large" ? "col-8" : "col-4"}>
      <VideoCard className={size === "large" ? "video-large" : "video-default"}>
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
            Diposting {Dayjs(data.publishedDate).fromNow()}
          </div>
        </div>
      </VideoCard>
    </div>
  )
}
