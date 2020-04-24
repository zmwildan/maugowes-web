import React from "react"
import Styled from "styled-components"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import { toCamelCase } from "string-manager"
import {
  color_gray_dark,
  color_gray_soft,
  color_blue_main,
  color_white_main,
} from "../../components/Const"
import DisqusBox from "../../components/boxs/Disqus"
import ShareBox from "../../components/boxs/Share"
import Loader from "../../components/Loader"
import GA from "../../components/boxs/GA"

import { connect } from "react-redux"
import { fetchBlogDetail, fetchBlog } from "../../redux/blog/actions"
import config from "../../config/index"
import fetch from "isomorphic-unfetch"
import BlogBox from "../../components/boxs/BlogBox"
import ShareIcon from "../../components/icons/Share"
import CommentIcon from "../../components/icons/Comment"
import EyeIcon from "../../components/icons/Eye"

function getId(title) {
  let titleArr = title.split("-")
  return titleArr[titleArr.length - 1]
}

export const BlogDetailStyled = Styled.div`
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
  .blog-detail_video {
    width: 100%;
    margin: 50px 0 30px;
    padding: 50px 0;
    background: #000;
    iframe {
      width: 100%;
      height: 400px;
      border: none;
    }
  }
  .link-blog-detail_author {
    text-decoration: none;
    color: ${color_gray_dark};
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
    margin-top: 50px;
    margin-bottom: 10px;
    text-align: center;
    img {
      max-width: 100%;
      object-fit: contain;
    }
  }
  .blog-detail_content {
    line-height: 2.5;
    img {
      margin: 20px auto;
      max-width: 100%;
      display: block;
    }
    a{
      word-break: break-all;
    }
    h2 {
      background: ${color_blue_main};
      color: ${color_white_main};
      padding: 0 10px;
      line-height: 2;
    }
  }
  .blog-detail_tag {
    display: block;
    margin: 20px 0;
    a {
      &:hover {
        background: #FFF;
        border: 1px solid ${color_gray_soft};
      }
      line-height: 2.5;
      cursor: pointer;
      padding: 5px 10px;
      background: ${color_gray_soft};
      color: ${color_gray_dark};
      text-decoration: none;
      margin-right: 10px;
    }
  }
  .blog-detail_meta {
    margin-top: 20px;
    color: ${color_gray_dark};
    svg {
      vertical-align: middle;
      margin-right: 5px;
    }
    .blog-detail_meta_item {
      margin-right: 16px;
      a {
        color: ${color_gray_dark};
        text-decoration: none;
      }
    }
  }
`

class BlogDetail extends React.Component {
  state = {}

  static async getInitialProps({ reduxStore, res, query }) {
    if (typeof window == "undefined") {
      const id = getId(query.id)
      const { type, endpoint } = fetchBlogDetail(id)["CALL_API"]
      //  only call in server side
      const postsResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${endpoint}`
      )
      const posts = await postsResponse.json()
      reduxStore.dispatch({
        type,
        filter: id,
        data: posts,
      })
    }

    return { id: query.id }
  }

  async componentDidMount() {
    this.setState({ windowReady: true })

    // get related post
    const blogRelatedState = this.props.blog.related || {}
    if (!blogRelatedState.status) {
      return this.props.dispatch(
        fetchBlog("related", {
          limit: 3,
          page: 1,
          notId: getId(this.props.id),
        })
      )
    }
  }

  render() {
    const id = getId(this.props.id)
    const data = this.props.blog[id] || {}
    const related = this.props.blog.related || {}

    let metadata = {}

    if (data && data.status === 200) {
      metadata = {
        title: data.title,
        description: data.truncatedContent,
        image: data.image.original,
        keywords: data.tags.toString(),
        jsonld: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: data.title,
          alternativeHeadline: data.title,
          image: data.image.original,
          genre: "cycling,bicycle,sepeda,gowes",
          keywords: data.tags.toString(),
          wordcount: data.content.length,
          publisher: {
            "@type": "Organization",
            name: "Mau Gowes",
            logo: {
              "@type": "ImageObject",
              url: "https://maugowes.com/static/icons/icon-512x512.png",
              height: "500",
              width: "500",
            },
          },
          url: `https://maugowes.com${data.link}`,
          datePublished: new Date(data.created_on * 1000).toISOString(),
          dateCreated: new Date(data.created_on * 1000).toISOString(),
          dateModified: new Date(data.updated_on * 1000).toISOString(),
          description: data.truncatedContent,
          author: {
            "@type": "Person",
            name: data.author.username,
          },
        },
      }
    } else {
      metadata = {
        title: "Postingan tidak ditemukan",
        description:
          "Maaf postingan yang kamu tuju tidak ditemukan, silahkan cek url sekali lagi, bisa juga karena postingan telah di hapus.",
      }
    }

    return (
      <GlobalLayout metadata={metadata}>
        <DefaultLayout>
          <BlogDetailStyled className="blog-detail">
            {!data.status ? (
              <Loader />
            ) : data.status === 200 ? (
              <React.Fragment>
                <div className="grid-center">
                  <div className="col-7_xs-12">
                    <h1>{data.title}</h1>

                    {/* list tag of post */}
                    {data.tags && data.tags.length > 0 ? (
                      <div className="blog-detail_tag">
                        {data.tags.map((n, key) => {
                          return (
                            <a key={key} href={`/blog/tag/${n}`}>
                              {n}
                            </a>
                          )
                        })}
                      </div>
                    ) : null}
                    {/* end of list tag of post */}

                    {/* author */}
                    <a
                      className="link-blog-detail_author"
                      href="/author/yussan">
                      <div className="blog-detail_author">
                        <img
                          className="blog-detail_author_avatar"
                          src={data.author.avatar}
                          alt={`${data.author.username} avatar`}
                        />
                        <div className="blog-detail_author_name">
                          {toCamelCase(data.author.fullname)}
                        </div>
                        <div className="blog-detail_author_level">
                          alias {data.author.username} sebagai Penulis
                        </div>
                      </div>
                    </a>
                    {/* end of author */}

                    {/* post meta */}
                    <div className="blog-detail_meta">
                      <span className="blog-detail_meta_item">
                        <EyeIcon width="30" height="30" />
                        <span>{data.views}</span>
                      </span>

                      <span className="blog-detail_meta_item">
                        <a
                          onClick={() => {
                            document
                              .getElementById("comment-box")
                              .scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              })
                          }}
                          href="javascript:;">
                          <CommentIcon width="30" height="30" />
                          <span>0</span>
                        </a>
                      </span>

                      <span className="blog-detail_meta_item">
                        <a
                          onClick={() => {
                            document
                              .getElementById("share-box")
                              .scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              })
                          }}
                          href="javascript:;">
                          <ShareIcon width="25" height="25" />
                          <span>Share</span>
                        </a>
                      </span>
                    </div>
                    {/* end of post meta */}

                    {data.video ? (
                      <div className="blog-detail_video">
                        <iframe src={data.video} />
                      </div>
                    ) : (
                      <div className="blog-detail_main-image">
                        <img src={data.image.original} alt={data.title} />
                      </div>
                    )}

                    <GA
                      style={{ margin: "30px 0" }}
                      adClient="ca-pub-4468477322781117"
                      adSlot="4316048838"
                    />

                    <article
                      className="blog-detail_content"
                      dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                  </div>
                </div>

                <GA adClient="ca-pub-4468477322781117" adSlot="4316048838" />

                {/* share box */}
                <div className="grid-center" id="share-box">
                  <div className="col-7_xs-12">
                    <ShareBox url={`https://maugowes.com${data.link}`} />
                  </div>
                </div>
                {/* end of share box */}

                {/* blog box */}
                <div className="blog-detail_related">
                  <BlogBox
                    hideAds
                    style={{ margin: "20px 0" }}
                    noHeaderTitle
                    noStats
                    data={related}
                  />
                </div>
                {/* end of blog box */}

                {/* comment */}
                <div className="grid-center" id="comment-box">
                  <div className="col-7_xs-12 blog-detail_comment">
                    {this.state.windowReady ? (
                      <DisqusBox
                        url={`${window.location.origin}/blog/${id}`}
                        identifier={`maugowes-${id}`}
                      />
                    ) : null}
                  </div>
                </div>
                {/* end of comment */}
              </React.Fragment>
            ) : (
              <Loader text={data.messages} />
            )}
          </BlogDetailStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blog: state.Blog,
  }
}

export default connect(mapStateToProps)(BlogDetail)
