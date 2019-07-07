import React from "react"
import Styled from "styled-components"
import Dayjs from "../../../modules/dayjs"

const BlogRowStyled = Styled.div`
  a {
    font-weight: bold;
  }
`

const BlogRow = props => {
  const { data } = props
  return (
    <BlogRowStyled className="table-row">
      <a href={`/super/blog/edit/${data.id}`}>{data.title}</a>
      <br />
      Dipost {Dayjs(data.created_on * 1000).fromNow()}
    </BlogRowStyled>
  )
}

export default BlogRow
