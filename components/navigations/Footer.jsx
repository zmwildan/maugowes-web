import React from "react"
import Styled from "styled-components"
import { color_gray_medium, color_gray_dark, color_black_main } from "../Const"

const Footer = Styled.div`
  padding: 80px 0;
  border-top: 1px solid ${color_gray_medium};
  border-bottom: 1px solid ${color_gray_medium};
  text-align: center;
  color: ${color_gray_dark};
  font-size: 13px;
  letter-spacing: .2px;
  line-height: 1.8;
  [class*=col-] {
    padding: 0;
  }
  a {
    color: ${color_black_main};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .footer-left {
    padding: 0 20px;
    .footer-social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      .footer-social-link_a {
        margin-right: 20px;
      }
    }
  }
  .col.footer-content {
    padding: 0 50px;
    text-align: left;
    .footer-content-title {
      font-size: 20px;
      color: ${color_black_main};
      font-weight: 600;
      border-bottom: 1px solid ${color_black_main};
    }
    .footer-content-list {
      ul {
        list-style: none;
        padding-left: 0;
        li {
          margin-top: 10px;
        }
      }
    }
  }
`

const FooterPoweredBy = Styled.div`
  text-align: center;
  padding: 10px;
  color: ${color_gray_dark};
  font-size: 13px;
  a {
    color: ${color_gray_dark};
    text-decoration: none;
  }

`

export default props => {
  return (
    <React.Fragment>
      <Footer className="grid">
        <div className="col-4_xs-12 footer-left">
          <img src="/static/images/logo.png" alt="Logo Mau Gowes" />
          <p>
            Mau Gowes - Adalah platform online yang dibuat untuk kamu para
            pecinta sepeda. Disini kamu bisa dapat konten menarik dan sekalian
            belanja pula.
          </p>
          <div className="footer-social-link text-black">
            <span style={{ marginRight: 20 }}>Social:</span>
            <span style={{ marginTop: 5 }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link_a"
                href="https://www.youtube.com/channel/UCc0sgRlqAJCWejiiSIDJjdg">
                <img src="https://img.icons8.com/ios-glyphs/15/000000/youtube-play.png" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link_a"
                href="https://instagram.com/maugowes">
                <img src="https://img.icons8.com/ios-glyphs/15/000000/instagram.png" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link_a"
                href="https://facebook.com/maugowes">
                <img src="https://img.icons8.com/android/15/000000/facebook.png" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link_a"
                href="https://twitter.com/maugowes">
                <img src="https://img.icons8.com/android/15/000000/twitter.png" />
              </a>
              {/* <a className="footer-social-link_a" href="https://twitter.com"><img src="https://img.icons8.com/android/15/000000/twitter.png" /></a> */}
            </span>
          </div>
        </div>
        <div className="col-8_xs-12 footer-right">
          <div className="grid">
            <div className="col footer-content">
              <div className="footer-content-title">Informasi</div>
              <div className="footer-content-list">
                <ul>
                  <li>
                    <a
                      target="_blank"
                      noreferer="true"
                      noopener="true"
                      href="https://maugowes.com/blog/Tentang-Kami-5cbc7e530ad6da31c52524dd">
                      Tentang Kami
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      noreferer="true"
                      noopener="true"
                      href="https://maugowes.com/blog/Syarat-dan-Ketentuan-5cbc7e620ad6da31c52524de">
                      Syarat dan Ketentuan
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      noreferer="true"
                      noopener="true"
                      href="https://maugowes.com/blog/Bantuan-5cbc7e6a0ad6da31c52524df">
                      Bantuan
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col footer-content">
              <div className="footer-content-title">Fitur</div>
              <div className="footer-content-list">
                <ul>
                  {/* <li>
                    <a href="/marketplace">Marketplace</a>
                  </li> */}
                  <li>
                    <a href="/blog">Blog</a>
                  </li>
                  <li>
                    <a href="/videos">Video</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Footer>
      <FooterPoweredBy>
        <strong>
          Powered by{" "}
          <a href="https://byidmore.com" target="_blank">
            Id More
          </a>
        </strong>
      </FooterPoweredBy>
    </React.Fragment>
  )
}
