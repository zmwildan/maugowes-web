import React from "react"
import Styled from "styled-components"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Link from "next/link"
import {
  color_gray_dark,
  color_gray_medium,
  color_black_main,
  color_gray_soft
} from "../../components/Const"

const BlogDetailStyled = Styled.div`
  position: relative;
  h1 {
    margin-top: 50px;
    font-weight: 500;
    font-size: 38px;
  }
  .blog-detail_author {
    margin-top: 50px
  }
  img.blog-detail_author_avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left !important;
  }
  .blog-detail_author_name {
    padding-top: 6px;
    padding-left: 60px;
    font-size: 14px;
  }
  .blog-detail_author_level {
    padding-left: 60px;
    color: ${color_gray_dark};
    font-size: 14px;
  }
  .blog-detail_main-image {
    max-width: 100%;
    margin-top: 50px;
  }
  .blog-detail_content {
    line-height: 2.5;
    img {
      margin: 20px auto;
      max-width: 100%;
      display: block;
    }
  }
  .blog-detail_tag {
    display: block;
    margin: 20px 0;
    a {
      &:hover {
        background: ${color_gray_soft};
      }
      cursor: pointer;
      padding: 5px 10px;
      background: ${color_gray_medium};
      color: ${color_black_main};
      text-decoration: none;
      margin-right: 10px;
    }
  }
`

export default class BlogDetail extends React.Component {
  render() {
    return (
      <GlobalLayout>
        <DefaultLayout>
          <BlogDetailStyled className="blog-detail">
            <div className="grid-center">
              <div className="col-7">
                <h1>Lorem Ipsum Semi Dolo Akse Hokya - Hokya Ready To Go</h1>

                <Link href="/author?username=yussan">
                  <div className="blog-detail_author">
                    <img
                      className="blog-detail_author_avatar"
                      src="/static/images/dummies/avatar-1.jpeg"
                      alt="avatar"
                    />
                    <div className="blog-detail_author_name">Yusuf A. H</div>
                    <div className="blog-detail_author_level">Author</div>
                  </div>
                </Link>

                <img
                  className="blog-detail_main-image"
                  src="/static/images/dummies/blog-2.jpeg"
                  alt="main image"
                />
                <article className="blog-detail_content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque venenatis rhoncus erat, at commodo nisi pharetra
                    eget. Pellentesque tincidunt, nunc eget dictum auctor, ipsum
                    erat maximus metus, at posuere dolor augue vitae dui.
                    Curabitur tincidunt sollicitudin mauris sit amet tristique.
                    Suspendisse id maximus justo, eget egestas leo. Phasellus
                    facilisis blandit euismod. Praesent nulla lectus, mattis nec
                    magna quis, dictum aliquet mauris. Maecenas nibh elit,
                    posuere eu elit commodo, vulputate eleifend tellus. Morbi a
                    augue quis nulla hendrerit vehicula. Maecenas tempor sapien
                    eget hendrerit sollicitudin. Vestibulum in eros est. Nulla
                    non sem aliquam, pretium mi luctus, convallis eros. Sed eu
                    metus vel massa blandit molestie ac a neque. Nam luctus
                    facilisis ligula, pellentesque faucibus nulla porttitor in.
                    <img
                      src="/static/images/dummies/product-1.jpg"
                      alt="dummy image"
                    />
                    <br />
                    Nunc at varius tortor, eget consequat lorem. Morbi egestas
                    est lorem, et sodales justo rutrum sed. Donec felis turpis,
                    faucibus id ante vitae, sodales efficitur diam. Cras
                    porttitor, sem ac aliquam cursus, leo tellus tempor urna,
                    sit amet tempus sem risus eget est. Mauris commodo sit amet
                    purus eu maximus. Duis nunc elit, finibus et condimentum
                    tempor, suscipit eget lorem. Proin ac egestas orci.
                    <br />
                    <img
                      src="/static/images/dummies/blog-1.jpeg"
                      alt="dummy small image"
                    />
                    Quisque vel urna fringilla, tempor erat vitae, malesuada
                    sapien. Duis ullamcorper turpis non blandit cursus. Quisque
                    efficitur mauris nisl, eu cursus est maximus in. Nunc
                    interdum ex elit, a tempus nibh interdum nec. Nunc consequat
                    tellus vel lacus porta cursus nec ut ante. Nunc erat ante,
                    rutrum non elementum eget, hendrerit eget eros. Donec nec
                    hendrerit elit. Nunc ut porttitor arcu. Nulla vitae
                    elementum sapien. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Aliquam sit amet enim id sem imperdiet
                    blandit et id leo. Suspendisse potenti. Vivamus eget libero
                    tortor. Quisque non condimentum urna. Pellentesque habitant
                    morbi tristique senectus et netus et malesuada fames ac
                    turpis egestas. Cras ultrices pellentesque erat, non pretium
                    elit dictum non.
                  </p>
                </article>
              </div>
            </div>
            {/* list tag of post */}
            <div className="grid-center blog-detail_tag">
              <Link href="/blog/tag/tag-1">
                <a>tag 1</a>
              </Link>

              <Link href="/blog/tag/tag-1">
                <a>tag 1</a>
              </Link>
            </div>
            {/* end of list tag of post */}

            {/* comment */}
            <div className="blog-detail_comment grid-center">lala</div>
            {/* end of comment */}
          </BlogDetailStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}
