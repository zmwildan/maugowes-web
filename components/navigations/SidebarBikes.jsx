import Styled from "styled-components"
import { SidebarMarketplaceSytled } from "./SidebarMarketplace"
import { SelectStyled } from "../form/Select"
import { color_gray_dark, color_blue_main } from "../Const"

const SidebarBikesStyled = Styled(SidebarMarketplaceSytled)`
.sidebar-items {
 .categories {
  .category-item {
   border-bottom: none;
  }
 }
}
`

class SidebarBikes extends React.Component {
  render() {
    return (
      <SidebarBikesStyled className={this.props.className}>
        <div className="sidebar-items">
          <h2 className="title">Filter</h2>
          <div className="categories">
            <div className="category-item">
              {/* select brand */}
              <SelectStyled>
                <select name="" id="">
                  <option>Brand </option>
                </select>
              </SelectStyled>
              {/* end of select brand */}

              {/* select type */}
              <SelectStyled>
                <select name="" id="">
                  <option>Jenis Sepeda</option>
                </select>
              </SelectStyled>
              {/* end of select type */}
            </div>
          </div>
        </div>
      </SidebarBikesStyled>
    )
  }
}

SidebarBikes.defaultProps = {
  className: ""
}

export default SidebarBikes
