import Styled from "styled-components"
import { color_gray_dark, color_gray_medium } from "../Const";

const SidebarMarketplace = Styled.div`
  .sidebar-items {
    margin-bottom: 10px;
    h2.title {
      text-transform: uppercase;
      font-size: 18px;
      border-bottom: 1px solid ${color_gray_medium};
      padding-bottom: 10px;
    }
  }
`

export default props => {
  return <SidebarMarketplace>
    <div className="sidebar-items">
      <h2 className="title">Categories</h2>

    </div>
  </SidebarMarketplace>
}