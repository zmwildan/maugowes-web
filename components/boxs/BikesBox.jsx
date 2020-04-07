import Styled from "styled-components"

// components
import CardBike from "../cards/CardBike"
import Loader from "../Loader"
import Error from "../cards/CardError"
import GA from "../../components/boxs/GA"
import Button from "../../components/buttons/index"

const BikesBoxStyled = Styled.div`

`

class BikesBox extends React.Component {
  render() {
    const { status, results, message, is_loading } = this.props.data
    return (
      <BikesBoxStyled>
        {status ? (
          results && results.length > 0 ? (
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
          ) : null
        ) : null}

        {!status || is_loading ? <Loader /> : null}

        {status && status != 200 ? <Error text={message} /> : null}

        {this.props.loadmoreHandler &&
        !is_loading &&
        status === 200 &&
        results &&
        results.length >= this.props.maxResults ? (
          <div className="grid-center" style={{ margin: "20px 0 40px" }}>
            <Button
              btnId="btn-load-more-blog"
              type="button"
              isDisabled={is_loading}
              text={!is_loading ? "Bikes Berikutnya" : "Loading..."}
              size="large"
              onClick={() => this.props.loadmoreHandler()}
            />
          </div>
        ) : null}
        {!this.props.hideAds ? (
          <GA adClient="ca-pub-4468477322781117" adSlot="4316048838" />
        ) : null}
      </BikesBoxStyled>
    )
  }
}

BikesBox.defaultProps = {
  data: {},
  loadmoreHandler: false,
  maxResults: 3,
}

export default BikesBox
