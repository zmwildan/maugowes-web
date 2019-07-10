import React from "react"
import Styled from "styled-components"
import { color_gray_dark, color_gray_medium } from "../../Const"

const TableWrapperStyled = Styled.div`
  font-size: 12px;
  .table-row {
    padding: 12px 0;
    border-bottom: 1px solid ${color_gray_medium};
    font-size: 14px;
    line-height: 2;
    &:last-child {
      border-bottom: none;s
    }
    a {
      color: ${color_gray_dark};
      text-decoration: none;
    }
  }
`

const TableWrapper = props => {
  return <TableWrapperStyled>{props.children}</TableWrapperStyled>
}

export default TableWrapper
