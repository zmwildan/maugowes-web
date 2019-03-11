import Styled from "styled-components"
import { color_gray_dark, color_black_main, color_blue_dark, color_blue_main } from "../Const";

const CardBlogStyled = Styled.div`
.card-blog {
    position: relative;
    padding: 10px 20px;
    height: 250px;
    background-size: cover;
    background-position: top center;

    .card-blog-title {
      bottom: 0;
      position: absolute;
      .card-blog-label {
        transition: background .5s ease;
        padding: 5px 10px;
        font-size: 15px;
        background-color: #FFF;
        &:hover{
          background-color: ${color_blue_main};
          a {
            color: #FFF;
          }
        }
        a {
          color: ${color_black_main};
          text-decoration: none;
        }
      }
      h3 {
        bottom: 0;
        text-shadow: 2px 2px 8px ${color_black_main};
        a {
          color: #FFF;
          text-decoration: none;
          font-weight: 500;
        }
      }

    }

  }
`

export default props => {
  return (
    <CardBlogStyled className="col-4">
      <div
        className="card-blog"
        style={{
          backgroundImage: `url('/static/images/dummies/blog-1.jpeg')`
        }}>
        <div className="card-blog-title">
          <span className="card-blog-label">
            <a href="#">news</a>
          </span>
          <h3>
            <a href="#">
              This is Title of the Post cukup panjang dan gila apa adanya
            </a>
          </h3>

        </div>
      </div>
    </CardBlogStyled>
  )
}
