import React from "react"
import Styled from "styled-components"

const BlogRowStyled = Styled.div`
  a {
    font-weight: bold;
  }
`

const BlogRow = props => {
  return (
    <BlogRowStyled className="table-row">
      <a href="/super/blog/1">This super long post title and ready to use</a>
      <br/>
      Dipost 23 jam lalu
    </BlogRowStyled>
  )
}

export default BlogRow
