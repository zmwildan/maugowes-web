import Styled from "styled-components"
import { color_black_main, color_gray_dark, color_blue_main } from "../Const"

const TabStyled = Styled.div`
  border-bottom: 1px solid ${color_blue_main};
  border-width: 2px;
  padding: 10px 0;
  overflow-x: auto;
  overflow-y: hidden;
  .tab-item {
    transition: font-weight ease .5s;
    cursor: pointer;
    padding: 10px 20px;
    color: ${color_gray_dark};
    text-transform: uppercase;
    letter-spacing: -.5px;
    font-size: 16px !important;
    transition: border .5s ease, color .5s ease;
    &.active, &:hover {
      color: ${color_blue_main};
    }
    &.active {
      font-weight: bold;
    }
  }
`

const Tab = (props) => {
  return (
    <TabStyled className={"tab"}>
      {props.tabContent.map((n, key) => {
        return (
          <a
            className={`tab-item ${key == props.active ? "active" : ""}`}
            key={key}
            href={n.link || "#"}
            onClick={(e) => {
              if (props.onClick) {
                e.preventDefault(e)
                props.onClick(key)
              }
            }}>
            {n.text}
          </a>
        )
      })}
    </TabStyled>
  )
}

export default Tab
