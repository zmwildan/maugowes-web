import React from "react"
import Styled from "styled-components"
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import PageHeader from "../../../components/boxs/PageHeader"
import PostForm from "../../../components/form/PostForm"

const BlogCreateStyled = Styled.div`

`

class BlogPage extends React.Component {
  static async getInitialProps({ reduxStore, res, query }) {
    const { id } = query
    // if (typeof window == "undefined") {
    // }

    return { id }
  }

  render() {
    const { id } = this.props
    const title = id ? "Update Post" : "Create Post"
    const is_loading = false
    return (
      <GlobalLayout metadata={{ title }}>
        <DefaultLayout>
          <SuperLayout>
            <BlogCreateStyled className="p-t-b-30">
              <PageHeader title={title} />
              <PostForm />
            </BlogCreateStyled>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default BlogPage
