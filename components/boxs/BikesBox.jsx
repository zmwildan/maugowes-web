import Styled from "styled-components"

// components
import CardBike from "../cards/CardBike"
import Loader from "../Loader"
import Error from "../cards/CardError"
import GA from "../../components/boxs/GA"

const BikesBoxStyled = Styled.div`

`

class BikesBox extends React.Component {
  render() {
    const { status, results, message, is_loading } = this.props.data
    return (
      <BikesBoxStyled>
        {status ? (
          status == 200 ? (
            <div className="grid">
              {results.map((n, key) => (
                <React.Fragment key={key}>
                  <CardBike data={n} />
                  {results.length > 9 &&
                  key !== 0 &&
                  key !== results.length - 1 &&
                  (key + 1) % 9 === 0 ? (
                    <div className="col-12">
                      <GA
                        adClient="ca-pub-4468477322781117"
                        adSlot="4316048838"
                      />
                    </div>
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <Error text={message} />
          )
        ) : null}

        {!status || is_loading ? <Loader /> : null}
      </BikesBoxStyled>
    )
  }
}

BikesBox.defaultProps = {
  data: {},
}

export default BikesBox
