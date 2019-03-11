import Styled from "styled-components"

const CardBlogStyled = Styled.div`
  .card-blog {
    height: 250px;
    background-size: cover;
    background-position: top center;
  }
`

export default props => {
  return (
    <CardBlogStyled className="col-3">
      <div
        className="card-blog"
        style={{
          backgroundImage: `url('/static/images/dummies/blog-1.jpeg')`
        }}>
        <h3>
          <a href="#"></a>
        </h3>
      </div>
    </CardBlogStyled>
  )
}
