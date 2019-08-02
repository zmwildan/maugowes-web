import Styled from "styled-components"
import { Footer } from "../navigations/Footer"

const ThanksTo = Styled.div`
  padding: 40px 0;
  h3 {
    color: color_gray_dark;
  }
  .thanks-box {
    .thanks-box--item {
      margin-right: 20px;
    }
  }
`

export default props => {
  return (
    <ThanksTo className="grid">
      <div className="col-12 align-center">
        <h3>TERIMAKASIH UNTUK</h3>
      </div>
      <div className="thanks-box col-12 align-center">
        <a className="thanks-box--item" href="/ads">
          <img
            src="https://res.cloudinary.com/dhjkktmal/image/upload/v1561894898/kompetisi-id/referral/digitalocean.png"
            alt="Thanks Digital Ocean"
          />
        </a>
        <a className="thanks-box--item" href="/ads">
          <img
            src="https://res.cloudinary.com/dhjkktmal/image/upload/v1561894898/kompetisi-id/referral/domainesia.png"
            alt="Thanks Domainesia"
          />
        </a>
      </div>
    </ThanksTo>
  )
}
