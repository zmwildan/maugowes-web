import Styled from "styled-components"
import { color_black_main, color_gray_dark } from "../Const"

const TabStyled = Styled.div`
  border-bottom: 1px solid ${color_gray_dark};
  border-width: 2px;
  padding: 10px 0;
  overflow-x: auto;
  overflow-y: hidden;
  .tab-item {
    cursor: pointer;
    padding: 10px 20px;
    border-bottom: 1px solid ${color_gray_dark};
    color: ${color_gray_dark};
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
        return (
          <a
            className={`tab-item ${key == props.active ? "active" : ""}`}
            key={key}
            href={n.link || "#"}
            onClick={e => {
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
