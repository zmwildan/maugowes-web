import React from "react"
import Styled from "styled-components"
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"

const BlogPageStyled = Styled.div`

`

class BlogPage extends React.Component {
  render() {
    return (
      <GlobalLayout metadata={{ title: "Login Super Page" }}>
        <DefaultLayout>
          <SuperLayout>
            <BlogPageStyled className="p-t-b-30">this is blog page...</BlogPageStyled>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default BlogPage
