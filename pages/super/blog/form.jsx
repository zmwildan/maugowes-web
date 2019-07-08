import React from "react"
import Styled from "styled-components"
import { fetchBlogDetail } from "../../../redux/blog/actions"
import { connect } from "react-redux"
import config from "../../../config/index"

// components
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import PageHeader from "../../../components/boxs/PageHeader"
import PostForm from "../../../components/form/PostForm"
import Loader from "../../../components/Loader"

const BlogCreateStyled = Styled.div`

`

class BlogPage extends React.Component {
  state = {}

  static async getInitialProps({ reduxStore, res, query }) {
    const { id } = query
    // if (typeof window == "undefined") {
    if (typeof id != "undefined" && typeof window == "undefined") {
      const { type, endpoint } = fetchBlogDetail(id)["CALL_API"]
      //  only call in server side
      const postsResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${endpoint}`
      )
      const posts = await postsResponse.json()
      reduxStore.dispatch({
        type,
        filter: id,
        data: posts
      })
    }

    return { id }
  }

  render() {
    const { id } = this.props
    const title = id ? "Update Post" : "Create Post"
    const blogData = this.props.blog[id] || {}
    const { is_loading } = blogData
    return (
      <GlobalLayout metadata={{ title }}>
        <DefaultLayout>
          <SuperLayout>
            <BlogCreateStyled className="p-t-b-30">
              <PageHeader title={title} />
              {is_loading ? (
                <Loading />
              ) : (
                <PostForm
                  dispatch={this.props.dispatch}
                  blogData={blogData}
                  isEdit={blogData && blogData.id}
                />
              )}
            </BlogCreateStyled>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect(state => {
  return {
    blog: state.Blog
  }
})(BlogPage)
