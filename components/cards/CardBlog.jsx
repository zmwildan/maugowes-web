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

  .card-blog-tags {
    .card-blog-label {
      transition: background .5s ease;
      padding: 5px 10px;
      font-size: 15px;
      background-color: #FFF;
      color: ${color_black_main};
      text-decoration: none;
      display: inline-block;
    }
  }

  .card-blog-title {
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
  const linkUrl = `/blog/${data.id}`
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

          {/* tag of post */}
          <div className="card-blog-tags">
            {data.tags && data.tags.length > 0
              ? data.tags.map((tag, key) => (
                  <Link key={key} href={`/blog/tag/${tag}`}>
                    <a className="card-blog-label" href={`/blog/tag/${tag}`}>
                      {tag}
                    </a>
                  </Link>
                ))
              : null}
          </div>

          {/* title if post */}
          <div className="card-blog-title">
            <h3>
              <Link href={linkUrl}>
                <a href={linkUrl}>{data.title || "..."}</a>
              </Link>
            </h3>
          </div>
        </React.Fragment>
      </Link>
    </CardBlogStyled>
  )
}
