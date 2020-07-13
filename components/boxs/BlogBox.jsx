import Styled from "styled-components"
import CardBlog from "../cards/CardBlog"
import Loader from "../Loader"
import Error from "../cards/CardError"
import Button from "../buttons/index"
import GA from "../../components/boxs/GA"

const BlogBoxStyled = Styled.div`
  margin-top: ${(props) => (props.noHeaderTitle ? "50px" : "40px")};
  .blog-box-title {
    padding-bottom: 10px;
    font-size: 30px;
    font-weight: 500;
  }
`

const BlogBox = (props) => {
  const { size, data, style } = props
  const { results, status, message, stats, is_loading, total } = data

  return (
    <BlogBoxStyled style={style || {}} noHeaderTitle={props.noHeaderTitle}>
      {!props.noHeaderTitle ? (
        <div className="grid-center">
          <h2 className="blog-box-title">
            {props.title || "Yang Baru di Blog"}
          </h2>
        </div>
      ) : null}

      {status ? (
        results && results.length > 0 ? (
          <div className="grid">
            {results.map((n, key) => {
              return (
                <React.Fragment key={key}>
                  <CardBlog size={size} data={n} />
                  {/* every 8 card show ads */}
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

      {status && status !== 200 ? <Error text={message} /> : null}

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
            text={!is_loading ? "Postingan Berikutnya" : "Loading..."}
            size="large"
            onClick={() => props.loadmoreHandler()}
          />
        </div>
      ) : null}
      {!props.hideAds ? (
        <GA adClient="ca-pub-4468477322781117" adSlot="4316048838" />
      ) : null}
    </BlogBoxStyled>
  )
}

BlogBox.defaultProps = {
  maxResults: 3,
}

export default BlogBox
