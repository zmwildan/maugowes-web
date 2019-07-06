import React from "react"
import Styled from "styled-components"

const PageHeader = Styled.div`
  h1 {
    margin-top: 0;
    font-weight:300;
  }
  margin-bottom: 50px;
`

export default props => {
  return (
    <PageHeader>
      <h1>{props.title || "..."}</h1>
    </PageHeader>
  )
}