import React from "react"
import Styled from "styled-components"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import BlogBox from "../../components/boxs/BlogBox"
import Pagination from "../../components/navigations/Pagination"

import { connect } from "react-redux"
import { fetchBlog } from "../../redux/blog/actions"
import config from "../../config/index"
import fetch from "isomorphic-unfetch"

const BlogStyled = Styled.div`

`

const StoreFilter = "list"
const MaxResults = 7

class Blog extends React.Component {
  static async getInitialProps({ reduxStore, req }) {
    if (typeof window == "undefined") {
      //  only call in server side
      const postsResponse = await fetch(
        `${config[process.env.NODE_ENV].host}/api/posts?limit=${MaxResults}`
      )
      const posts = await postsResponse.json()
      reduxStore.dispatch(fetchBlog(StoreFilter, posts))
    }

    return {}
  }

  componentDidMount() {}

  loadmoreHandler() {}

  render() {
    const blog = this.props.blog[StoreFilter] || {}
    return (
      <GlobalLayout
        metadata={{
          title: "Blog - Mau Gowes",
          description: "Baca postingan terupdate seputar dunia pergowesan"
        }}>
        <DefaultLayout>
          <BlogStyled>
            <Header
              title="Mau Gowes Blog"
              text="Yuk berbagi cerita tentang sepeda di Mau Gowes Blog"
              backgroundImage="/static/images/background/bg-bike-store.jpg"
            />
            <BlogBox
              noHeaderTitle
              data={blog}
              loadmoreHandler={() => this.loadmoreHandler}
            />
          </BlogStyled>
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

export default connect(mapStateToProps)(Blog)
