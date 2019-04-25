import React from "react"
import Dayjs from "../../modules/dayjs"
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
    overflow-y: hidden;
    height: 50px;
    .card-blog-label {
      padding: 15px 0;
      margin-right: 15px;
      transition: background .5s ease;
      font-size: 15px;
      background-color: #FFF;
      color: ${color_gray_dark};
      text-decoration: none;
      display: inline-block;
      font-weight: 300;
    }
  }

  .card-blog-title {
    height: 63px;
    overflow: hidden;
    h3 {
      bottom: 0;
      margin: 0;
      font-size: 1.5em;
      a {
        color: ${color_black_main};
        text-decoration: none;
        font-weight: 500;
      }
    }
  }

  .card-blog-date {
    font-size: 14px;
    color: ${color_gray_dark};
  }
`

export default props => {
  const { data = {} } = props || {}
  const linkUrl = data.link
  return (
    <CardBlogStyled className="col-4_xs-12_md-6">
      <a href={linkUrl}>
        <div
          className="card-blog-cover"
          style={{
            backgroundImage: `url(${
              data.image ? data.image["600"] : "/static/images/no-image.png"
            })`
          }}
        />
      </a>

      {/* tag of post */}
      <div className="card-blog-tags">
        {data.tags && data.tags.length > 0
          ? data.tags.map((tag, key) => (
              <a
                key={key}
                className="card-blog-label"
                href={`/blog/tag/${tag}`}>
                {tag}
              </a>
            ))
          : null}
      </div>

      {/* title if post */}
      <div className="card-blog-title">
        <h3>
          <a href={linkUrl}>{data.title || "..."}</a>
        </h3>
      </div>

      {/* truncated content */}
      <div className="card-blog-content">{data.truncatedContent}</div>
      <br />
      <div className="card-blog-date">
        Diposting {Dayjs(data.created_on * 1000).fromNow()}
      </div>
    </CardBlogStyled>
  )
}
