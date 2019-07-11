import React from "react"
import Styled from "styled-components"
import Dayjs from "../../../../modules/dayjs"
import { color_gray_dark, color_gray_soft } from "../../../Const"

export const BlogRowStyled = Styled.div`
  a {
    font-weight: bold;
  }
  small.label-draft {
    color: ${color_gray_dark};
  }
`

export default props => {
  const { data } = props
  return (
    <BlogRowStyled className="table-row">
      <a href={`/super/blog/edit/${data.id}`}>
        {data.title}{" "}
        {data.draft ? (
          <span style={{ fontWeight: 100 }} className="label-draft">
            - draft
          </span>
        ) : null}
      </a>
      <br />
      Diupdate {Dayjs(data.updated_on * 1000).fromNow()}, Dipost{" "}
      {Dayjs(data.created_on * 1000).fromNow()}
    </BlogRowStyled>
  )
}
