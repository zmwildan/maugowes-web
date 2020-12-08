import Styled from "styled-components"

// components
import CardBike from "../cards/CardBike"
import Loader from "../Loader"
import Error from "../cards/CardError"
import GA from "../../components/boxs/GA"
import Button from "../../components/buttons/index"

const BikesBoxStyled = Styled.div`
.blog-box-title {
  padding-bottom: 10px;
  font-size: 30px;
  font-weight: 600;
}
`

const BikesBox = (props) => {
  const { status, results, message, is_loading, total } = props.data
  return (
    <BikesBoxStyled>
      {!props.noHeaderTitle ? (
        <div className="grid-center">
          <h2 className="blog-box-title">
            {props.title || "Sepeda Baru Rilis"}
          </h2>
        </div>
      ) : null}

      {status ? (
        results && results.length > 0 ? (
          <div className="grid">
            {results.map((n, key) => {
              return (
                <React.Fragment key={key}>
                  <CardBike data={n} size={props.size} />
                  {results.length > 12 &&
                  key !== 0 &&
                  key !== results.length - 1 &&
                  (key + 1) % 12 === 0 ? (
                    <div className="col-12">
                      <GA
                        adClient="ca-pub-4468477322781117"
                        adSlot="4316048838"
                      />
                    </div>
                  ) : null}
                </React.Fragment>
              )
            })}
          </div>
        ) : null
      ) : null}

      {!status || is_loading ? <Loader /> : null}

      {status && status != 200 ? <Error text={message} /> : null}

      {props.loadmoreHandler &&
      !is_loading &&
      status === 200 &&
      results &&
      results.length >= props.maxResults ? (
        <div className="grid-center" style={{ margin: "20px 0 40px" }}>
          <Button
            btnId="btn-load-more-blog"
            type="button"
            isDisabled={is_loading}
            text={!is_loading ? "Bikes Berikutnya" : "Loading..."}
            size="large"
            onClick={() => props.loadmoreHandler()}
          />
        </div>
      ) : null}
      {!props.hideAds ? (
        <GA adClient="ca-pub-4468477322781117" adSlot="4316048838" />
      ) : null}
    </BikesBoxStyled>
  )
}

BikesBox.defaultProps = {
  data: {},
  loadmoreHandler: false,
  maxResults: 3,
  noHeaderTitle: false,
}

export default BikesBox
