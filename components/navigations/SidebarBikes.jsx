import Styled from "styled-components"
import { objToQuery } from "string-manager"
import { SidebarMarketplaceSytled } from "./SidebarMarketplace"
import { SelectStyled } from "../form/Select"
import { color_gray_dark, color_blue_main } from "../Const"

const SidebarBikesStyled = Styled(SidebarMarketplaceSytled)`
.sidebar-items {
 .categories {
  .category-item {
   border-bottom: none;
   select {
     text-transform: capitalize;
   }
  }
 }
}
`

class SidebarBikes extends React.Component {
  changeHandler(e) {
    const { name, value } = e.target
    let { query } = this.props
    if (value == 0) {
      delete query[name]
    } else {
      query[name] = value
    }
    return (location.href = `/bikes?${objToQuery(query)}`)
  }

  selectRender(dataKey) {
    const { status, results } = this.props[dataKey]
    if (status && status == 200) {
      return results.map((n, key) => (
        <option key={key} value={n.id}>
          {n.name}
        </option>
      ))
    } else {
      return null
    }
  }

  render() {
    const { brand, type } = this.props.query
    return (
      <SidebarBikesStyled className={this.props.className}>
        <div className="sidebar-items">
          <h2 className="title">Filter</h2>
          <div className="categories">
            <div className="category-item">
              {/* select brand */}
              <SelectStyled>
                <select
                  name="brand"
                  onChange={e => this.changeHandler(e)}
                  value={brand}>
                  <option value={0}>Pilih Brand Sepeda</option>
                  {this.selectRender("bikeBrands")}
                </select>
              </SelectStyled>
              {/* end of select brand */}

              {/* select type */}
              <SelectStyled>
                <select
                  name="type"
                  onChange={e => this.changeHandler(e)}
                  value={type}>
                  <option value={0}>Pilih Jenis Sepeda</option>
                  {this.selectRender("bikeTypes")}
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
  className: "",
  query: {}
}

export default SidebarBikes
