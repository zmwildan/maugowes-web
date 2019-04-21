import React from "react"
import Styled from "styled-components"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Link from "next/link"
import { toCamelCase } from "string-manager"
import {
  color_gray_dark,
  color_gray_medium,
  color_black_main,
  color_gray_soft
} from "../../components/Const"
import Disqus from "../../components/boxs/Disqus"
import Loader from "../../components/Loader"

import { connect } from "react-redux"
import { fetchBlog } from "../../redux/blog/actions"
import config from "../../config/index"
import fetch from "isomorphic-unfetch"

function getId(title) {
  let titleArr = title.split("-")
  return titleArr[titleArr.length - 1]
}

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
    }
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
        background: #FFF;
        border: 1px solid ${color_gray_soft};
      }
      cursor: pointer;
      padding: 5px 10px;
      background: ${color_gray_soft};
      color: ${color_black_main};
      text-decoration: none;
      margin-right: 10px;
    }
  }
`

class BlogDetail extends React.Component {
  state = {}

  static async getInitialProps({ reduxStore, res, query }) {
    if (typeof window == "undefined") {
      const id = getId(query.id)
      //  only call in server side
      const postsResponse = await fetch(
        `${config[process.env.NODE_ENV].host}/api/post/${id}`
      )
      const posts = await postsResponse.json()
      reduxStore.dispatch(fetchBlog(id, posts))
    }

    return { id: query.id }
  }

  async componentDidMount() {
    this.setState({ windowReady: true })
    // const id = getId(this.props.id)
    // const blogState = this.props.blog[id] || {}
    // if (!blogState.status) {
    //   this.props.dispatch(fetchBlog(id))
    //   const postsResponse = await fetch(
    //     `${config[process.env.NODE_ENV].host}/api/posts/${id}`
    //   )
    //   const posts = await postsResponse.json()
    //   this.props.dispatch(fetchBlog(id, posts))
    // }
  }

  render() {
    const id = getId(this.props.id)
    const data = this.props.blog[id] || {}
    console.log("data", data)

    let metadata = {}

    if (data && data.status === 200) {
      metadata = {
        title: data.title,
        description: data.truncatedContent,
        image: data.image.original,
        keywords: data.tags.toString()
      }
    } else {
      metadata = {
        title: "Postingan tidak ditemukan",
        description:
          "Maaf postingan yang kamu tuju tidak ditemukan, silahkan cek url sekali lagi, bisa juga karena postingan telah di hapus."
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
                  <div className="col-7">
                    <h1>{data.title}</h1>

                    <Link href="/author?username=yussan">
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
                    </Link>

                    {data.video ? (
                      <div className="blog-detail_video">
                        <iframe src={data.video} />
                      </div>
                    ) : (
                      <div className="blog-detail_main-image">
                        <img src={data.image.original} alt={data.title} />
                      </div>
                    )}

                    <article
                      className="blog-detail_content"
                      dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                  </div>
                </div>

                {/* list tag of post */}
                {data.tags && data.tags.length > 0 ? (
                  <div className="grid-center">
                    <div className="col-7 blog-detail_tag">
                      {data.tags.map((n, key) => {
                        return (
                          <Link key={key} href={`/blog/tag/${n}`}>
                            <a href={`/blog/tag/${n}`}>{n}</a>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ) : null}
                {/* end of list tag of post */}

                {/* comment */}
                <div className="grid-center">
                  <div className="col-7 blog-detail_comment">
                    {this.state.windowReady ? (
                      <Disqus
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

const mapStateToProps = state => {
  return {
    blog: state.Blog
  }
}

export default connect(mapStateToProps)(BlogDetail)
