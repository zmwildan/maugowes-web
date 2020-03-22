import Styled from "styled-components"

// components
import CardBike from "../cards/CardBike"

const BikesBoxStyled = Styled.div`

`

class BikesBox extends React.Component {
  render() {
    return (
      <BikesBoxStyled>
        <div className="grid">
          <CardBike />
          <CardBike />
          <CardBike />
          <CardBike />
        </div>
      </BikesBoxStyled>
    )
  }
}

export default BikesBox
