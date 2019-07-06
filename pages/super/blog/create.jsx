import React from "react"
import Styled from "styled-components"
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import PageHeader from "../../../components/boxs/PageHeader"
import Editor from "../../../components/form/Editor"

const BlogCreateStyled = Styled.div`

`

class BlogPage extends React.Component {
  render() {
    const title = "Blog Create"
    return (
      <GlobalLayout metadata={{ title }}>
        <DefaultLayout>
          <SuperLayout>
            <BlogCreateStyled className="p-t-b-30">
              <PageHeader title={title} />
              <Editor />
            </BlogCreateStyled>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default BlogPage
