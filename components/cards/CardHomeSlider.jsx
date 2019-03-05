import Styled from "styled-components"

const CardHomeSlidderStyled = Styled.div`
  width: 100%;
  height: 400px;

  .slider-item-right {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    h2 {
      font-size: 2.5em;
    }

  }
`

export default props => {
  return (
    <CardHomeSlidderStyled className="grid">
      <div className="col-8_sm-6">
          ...
      </div>
      <div className="col-4_sm-6">
        <div className="slider-item-right">
          <h2>The Title</h2>
        </div>
      </div>
    </CardHomeSlidderStyled>
  )
}