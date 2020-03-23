import { color_gray_soft, color_gray_medium } from "../Const"
import Styled from "styled-components"

const BikeSpecsStyled = Styled.div`
  .bike-specs {
    h2 {
      margin: 30px 0;
    }
    .bike-specs__components {
      ul {
        line-height: 2;
        padding: 0;
        li {
          padding: 5px 10px;
          list-style: none;
          &:nth-child(even) {
            background: ${color_gray_soft};
          }
          &:nth-child(odd) {
            background: ${color_gray_medium};
          }
          strong {
            margin-right: 20px;
          }
        }
      }
    }
  }
`

const BikeSpecs = props => {
  return (
    <BikeSpecsStyled>
      <div className="bike-specs">
        <h2>Groupset</h2>
        <div className="bike-specs__components">
          <ul>
            <li>
              <strong>Front Deraliur : </strong>
              Shimano Dura Ace 9300
            </li>
            <li>
              <strong>Rear Deraliur : </strong>
              Shimano Dura Ace 9300
            </li>
            <li>
              <strong>Cassete : </strong>
              Shimano Dura Ace 11 Speed
            </li>
          </ul>
        </div>
      </div>

      <div className="bike-specs">
        <h2>Groupset</h2>
        <div className="bike-specs__components">
          <ul>
            <li>
              <strong>Front Deraliur : </strong>
              Shimano Dura Ace 9300
            </li>
            <li>
              <strong>Rear Deraliur : </strong>
              Shimano Dura Ace 9300
            </li>
            <li>
              <strong>Cassete : </strong>
              Shimano Dura Ace 11 Speed
            </li>
          </ul>
        </div>
      </div>
    </BikeSpecsStyled>
  )
}

export default BikeSpecs
