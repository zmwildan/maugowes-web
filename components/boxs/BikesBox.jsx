import Styled from "styled-components"

// components
import CardBike from "../cards/CardBike"
import Loader from "../Loader"
import Error from "../cards/CardError"

const BikesBoxStyled = Styled.div`

`

class BikesBox extends React.Component {
  render() {
    const { status, results, message } = this.props.data
    return (
      <BikesBoxStyled>
        {status ? (
          status == 200 ? (
            <div className="grid">
              {results.map((n, key) => (
                <CardBike key={key} data={n} />
              ))}
            </div>
          ) : (
            <Error text={message} />
          )
        ) : (
          <Loader />
        )}
      </BikesBoxStyled>
    )
  }
}

BikesBox.defaultProps = {
  data: {}
}

export default BikesBox
