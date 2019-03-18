import Styled from "styled-components"
import { color_gray_medium, color_black_main } from "../Const"

const TabStyled = Styled.div`
  margin-top: 50px;
  border-bottom: 1px solid ${color_gray_medium};
  padding: 10px 0;
  .tab-item {
    cursor: pointer;
    padding: 10px 20px;
    border-bottom: 1px solid ${color_gray_medium};
    color: ${color_gray_medium};
    text-transform: uppercase;
    letter-spacing: -.5px;
    font-size: 16px !important;
    transition: border .5s ease, color .5s ease;
    &.active, &:hover {
      color: ${color_black_main};
      border-bottom-color: ${color_black_main};
    }
  }
`

const Tab = props => {
  return (
    <TabStyled className={"tab"}>
      {props.tabContent.map((n, key) => {
        return <a className={`tab-item ${key == 0 ? "active" : ""}`} key={key}>{n.text}</a>
      })}
    </TabStyled>
  )
}

export default Tab