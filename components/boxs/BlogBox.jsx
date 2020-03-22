import Styled from "styled-components"
import CardBlog from "../cards/CardBlog"
import { color_blue_main } from "../Const"
import Loader from "../Loader"
import Error from "../cards/CardError"
import Button from "../buttons/index"
import GA from "../../components/boxs/GA"

const BlogBoxStyled = Styled.div`
  margin-top: ${props => (props.noHeaderTitle ? "50px" : "40px")};
  .blog-box-title {
    border-bottom: 2px solid ${color_blue_main};
    padding-bottom: 10px;
    font-size: 20px
  }
`

const BlogBox = props => {
  const { results, status, message, stats, is_loading, total } = props.data

  return (
    <BlogBoxStyled
      style={props.style || {}}
      noHeaderTitle={props.noHeaderTitle}>
      {!props.noHeaderTitle ? (
        <div className="grid-center">
          <h2 className="blog-box-title">
            {props.title || "Yang Baru di Blog"}
          </h2>
        </div>
      ) : results && results.length && total && !props.noStats ? (
        <center style={{ marginBottom: 50 }}>
          Menampilkan <strong>{results.length || 0}</strong> dari{" "}
          <strong>{total}</strong> post
        </center>
      ) : null}

      {status ? (
        results && results.length > 0 ? (
          <div className="grid">
            {results.map((n, key) => {
              let size = "default"
              if (key === 0 || key % 5 === 0) size = "large"
              return (
                <React.Fragment key={key}>
                  <CardBlog size={size} data={n} />
                  {/* every 8 card show ads */}
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
              )
            })}
          </div>
        ) : null
      ) : null}

      {is_loading ? <Loader /> : null}

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
  maxResults: 3
}

export default BlogBox
