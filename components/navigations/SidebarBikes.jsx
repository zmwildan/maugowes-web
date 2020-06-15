import Styled from "styled-components"
import { objToQuery } from "string-manager"
import { SidebarMarketplaceSytled } from "./SidebarMarketplace"
import { SelectStyled } from "../form/Select"
import { InputTextStyled } from "../form/InputText"
import { color_black_main } from "../Const"

const SidebarBikesStyled = Styled(SidebarMarketplaceSytled)`
.sidebar-items {
  margin-bottom: 20px;
 .categories {
  .category-item {
   border-bottom: none;
   select {
     text-transform: capitalize;
     color: ${color_black_main};
   }
  }
 }

}
`

class SidebarBikes extends React.Component {
  state = {
    q: this.props.query.q || "",
  }

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
    const { status, results } = this.props[dataKey] || {}
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
          <h2 className="title">Cari</h2>
          <InputTextStyled>
            <input
              placeholder="Tulis brand atau tipe disini"
              name="q"
              type="text"
              value={this.state.q}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  this.changeHandler({
                    target: {
                      name: "q",
                      value: this.state.q,
                    },
                  })
                }
              }}
              onChange={(e) => this.setState({ q: e.target.value })}
            />
          </InputTextStyled>
        </div>
        <br />
        <div className="sidebar-items">
          <h2 className="title">Filter</h2>
          <div className="categories">
            <div className="category-item">
              {/* select brand */}
              <SelectStyled>
                <select
                  name="brand"
                  onChange={(e) => this.changeHandler(e)}
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
                  onChange={(e) => this.changeHandler(e)}
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
  query: {},
}

export default SidebarBikes
