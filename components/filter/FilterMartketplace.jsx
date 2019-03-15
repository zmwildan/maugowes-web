import Styled from "styled-components"
import { color_gray_medium, color_gray_dark } from "../Const";

const FilterMarketplace = Styled.div`
  color: ${color_gray_dark}
  font-size: 14px;
  margin-bottom: 50px;
  ul {
    padding-left: 0;
    li {
      padding-right: 80px;
      display: inline;
      list-style: none;
      .filter-title {
        text-transform: uppercase;
      }
      .filter-input {
        select {
          font-size: 14px;
        }
      }
    }
  }
  
`

export default props => {
  return (
    <FilterMarketplace>
      <ul>
        <li>
          <span className="filter-title">Hasil 234rb</span>
        </li>
        <li>
          <span className="filter-title">Urutkan: </span>
          <span className="filter-input">
            <select>
              <option value="1">Tidak Perlu</option>
              <option value="1">Harga Terbesar</option>
              <option value="1">Harga Terkecil</option>
            </select>
          </span>
        </li>
        <li>
          <span className="filter-title">Tampilkan: </span>
          <span className="filter-input">
            <select>
              <option value="1">20</option>
              <option value="1">50</option>
              <option value="1">80</option>
            </select>
          </span>
        </li>
      </ul>
    </FilterMarketplace> 
  )
}