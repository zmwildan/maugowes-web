import React from "react"
import Styled from "styled-components"
import Dayjs from "../../../modules/dayjs"
import { color_gray_soft } from "../../Const"

const BlogRowStyled = Styled.div`
  a {
    font-weight: bold;
  }
  small.label-draft {
    color: ${color_gray_soft};
  }
`

const BlogRow = props => {
  const { data } = props
  return (
    <BlogRowStyled className="table-row">
      <a href={`/super/blog/edit/${data.id}`}>{data.title}</a>
      <br />
      Dipost {Dayjs(data.created_on * 1000).fromNow()}
      {
        data.draft ? <small className="label-draft">-draft</small> : null
      }
    </BlogRowStyled>
  )
}

export default BlogRow
