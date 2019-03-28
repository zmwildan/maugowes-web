import Styled from "styled-components"
import {
  color_gray_dark,
  color_black_main,
  color_blue_dark,
  color_blue_main
} from "../Const"
import Link from "next/link"

const CardBlogStyled = Styled.div`
.card-blog {
    position: relative;
    padding: 10px 20px;
    height: 250px;
    background-size: cover;
    background-position: top center;
    cursor: pointer;

    .btn-play-video {
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -40px;
      margin-left: -40px;
      transition: margin .5s ease;
      img {
        width: 80px;
        height: 80px;
        transition: all .5s ease;
      }
      &:hover {
        margin-top: -50px;
        margin-left: -50px;
        img {
          width: 100px;
          height: 100px;
        }
      }
    }

    .card-blog-title {
      bottom: 0;
      position: absolute;
      .card-blog-label {
        transition: background .5s ease;
        padding: 5px 10px;
        font-size: 15px;
        background-color: #FFF;
        &:hover{
          background-color: ${color_blue_main};
          a {
            color: #FFF;
          }
        }
        a {
          color: ${color_black_main};
          text-decoration: none;
        }
      }
      h3 {
        bottom: 0;
        text-shadow: 2px 2px 8px ${color_black_main};
        a {
          color: #FFF;
          text-decoration: none;
          font-weight: 500;
        }
      }

    }

  }
`

export default props => {
  return (
    <CardBlogStyled className="col-4">
      <Link href="/blog/detail?id=1" as="/blog/1">
        <div
          className="card-blog"
          style={{
            backgroundImage: `url('/static/images/dummies/blog-1.jpeg')`
          }}>
          {props.isVideo ? (
            <a className="btn-play-video" href="/video/1" title="play-audio">
              <img
                src="https://img.icons8.com/color/80/000000/circled-play.png"
                alt="play"
              />
            </a>
          ) : (
            ""
          )}
          <div className="card-blog-title">
            <span className="card-blog-label">
              <Link href="/blog?tag=news">
                <a href="/blog?tag=news">news</a>
              </Link>
            </span>
            <h3>
              <Link href="/blog/detail?id=1">
                <a href="/blog/detail?id=1">
                  This is Title of the Post cukup panjang dan gila apa adanya
                </a>
              </Link>
            </h3>
          </div>
        </div>
      </Link>
    </CardBlogStyled>
  )
}
