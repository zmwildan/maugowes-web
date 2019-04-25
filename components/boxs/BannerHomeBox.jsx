import React from "react"
import Styled from "styled-components"
import { color_blue_main, color_red_main, color_white_main } from "../Const"

const BannerHomeBoxStyled = Styled.div`
    .banner-home {

        margin: 40px 0 20px;
        .banner-home_content {
            position: relative;
            display: flex;
            align-items:center;
            height: 150px;
            padding: 50px 20px;
            text-align: left;
            color: ${color_white_main};
            a {
                color: ${color_white_main};
                text-decoration: none;
            }
        }
        &.banner-home_left {
            .banner-home_content {
                background-color: ${color_red_main};
                img {
                    height: 200px;
                    position: absolute;
                    right: 30px;
                    bottom: 0;
                }
            }
        }
        &.banner-home_right {
            .banner-home_content {
                background-color: ${color_blue_main};
                img {
                    height: 280px;
                    position: absolute;
                    right: 0;
                }
            }
        }
    }
`

class BannerHomeBox extends React.Component {
  render() {
    return (
      <BannerHomeBoxStyled className="grid">
        <div className="col-6_xs-12_md-6 banner-home banner-home_left">
          <div className="banner-home_content">
            <img
              src="/static/images/banner-maugowes-youtube.png"
              alt="mau gowes bike shop"
            />
            <div>
              <h2>
                Mau Gowes <br />
                di Youtube{" "}
              </h2>
              <a
                href="https://youtube.com/maugowes"
                target="_blank"
                rel="noreferer noopener">
                Kunjungi &#x2192;
              </a>
            </div>
          </div>
        </div>
        <div className="col-6_xs-12_md-6 banner-home banner-home_right">
          <div className="banner-home_content">
            <img
              src="/static/images/banner-maugowes-bike-shop.png"
              alt="mau gowes bike shop"
            />
            <div>
              <h2>
                Mau Gowes <br /> Bike Shop
              </h2>
              <a
                href="https://tokopedia.com/maugowes"
                target="_blank"
                rel="noreferer noopener">
                Tokopedia &#x2192;
              </a>
              <br />
              <a
                href="https://www.bukalapak.com/u/mr_yussan"
                target="_blank"
                rel="noreferer noopener">
                Bukalapak &#x2192;
              </a>
            </div>
          </div>
        </div>
      </BannerHomeBoxStyled>
    )
  }
}

export default BannerHomeBox
