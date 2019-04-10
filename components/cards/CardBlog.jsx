import React from "react"
import Styled from "styled-components"
import {
  color_gray_dark,
  color_black_main,
  color_blue_dark,
  color_blue_main
} from "../Const"
import Link from "next/link"

const CardBlogStyled = Styled.div`

  padding: 0 20px;
  margin-bottom: 30px;

  .card-blog-cover {
    position: relative;
    padding: 10px 20px;
    height: 250px;
    background-size: cover;
    background-position: top center;
    cursor: pointer;
  }

  .card-blog-title {
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
      a {
        color: ${color_black_main};
        text-decoration: none;
        font-weight: 500;
      }
    }

  }
`

export default props => {
  const { data = {} } = props || {}
  const linkUrl = `/blog/1`
  return (
    <CardBlogStyled className="col-4">
      <Link href={linkUrl}>
        <React.Fragment>
          <div
            className="card-blog-cover"
            style={{
              backgroundImage: `url(${
                data.thumbnails
                  ? data.thumbnails.high.url
                  : "/static/images/no-image.png"
              })`
            }}
          />

          {/* label of post */}
          <div className="card-blog-title">
            {data.label && data.label.length > 0 ? (
              <span className="card-blog-label">
                <Link href="/blog/tag/news">
                  <a href="/blog/tag/news">news</a>
                </Link>
              </span>
            ) : null}

            {/* title of post */}
            <h3>
              <Link href="/blog/detail/1">
                <a href="/blog/detail/1">{data.title || "Judul Postingan"}</a>
              </Link>
            </h3>
          </div>
        </React.Fragment>
      </Link>
    </CardBlogStyled>
  )
}
