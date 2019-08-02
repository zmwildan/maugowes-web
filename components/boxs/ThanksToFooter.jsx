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
        <a
          title="Belanja domain disini, bonusnya berlimpah, CSnya juga responsiv"
          className="thanks-box--item"
          target="_blank"
          rel="noreferer noopener"
          href="https://www.domainesia.com/?aff=585">
          <img
            src="https://res.cloudinary.com/dhjkktmal/image/upload/v1561894898/kompetisi-id/referral/domainesia.png"
            alt="Terimakasih Domainesia"
          />
        </a>
        <a
          title="Digital Ocean solusi VPS dengan fitur lengkap mulai USD3/bulan"
          className="thanks-box--item"
          target="_blank"
          rel="noreferer noopener"
          href="https://m.do.co/c/e4eacf5d20a5">
          <img
            src="https://res.cloudinary.com/dhjkktmal/image/upload/v1561894898/kompetisi-id/referral/digitalocean.png"
            alt="Terimakasih Digital Ocean"
          />
        </a>
      </div>
    </ThanksTo>
  )
}
