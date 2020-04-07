import { color_gray_soft, color_gray_medium } from "../Const"
import Styled from "styled-components"

const BikeSpecsStyled = Styled.div`
  .bike-specs {
    margin-bottom: 50px;
    h2 {
      margin: 30px 0;
      text-transform: capitalize;
    }
    .bike-specs__components {
      ul {
        line-height: 2;
        padding: 0;
        li {
          padding: 15px 0;
          list-style: none;
          border-bottom: 1px solid ${color_gray_medium};
          &:first-child {
            border-top: 1px solid ${color_gray_medium};
          }
          // &:nth-child(even) {
          //   background: ${color_gray_soft};
          // }
          // &:nth-child(odd) {
          //   background: ${color_gray_medium};
          // }
          strong {
            margin-right: 20px;
          }
        }
      }
    }
  }
`

const BikeSpecs = (props) => {
  const keys = Object.keys(props.data)

  return (
    <BikeSpecsStyled>
      {keys.map((n, key) => {
        return props.data[n] && props.data[n].length > 0 ? (
          <div key={key} className="bike-specs">
            <h2>{n}</h2>
            <div className="bike-specs__components">
              <ul>
                {props.data[n].map((m, m_key) => {
                  return (
                    <li key={m_key}>
                      <strong style={{ textTransform: "capitalize" }}>
                        {m.spec} :{" "}
                      </strong>
                      {m.description}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ) : null
      })}
    </BikeSpecsStyled>
  )
}

BikeSpecs.defaultProps = {
  data: [],
}

export default BikeSpecs
