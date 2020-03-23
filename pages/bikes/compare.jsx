import Styled from "styled-components"
import { color_red_main, color_white_main } from "../../components/Const"

// layouts
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"

// components
const BikesCompareStyled = Styled.div`
    margin-top: 50px;
    
    .bike-compare-search {
      margin-bottom: 30px;
      .bike-compare-search_input-group {
        position: relative;
        img {
          position: absolute;
          top: 10px;
          left: 15px;
        }
        input[type="text"] {
          padding: 10px 10px 10px 35px;
          display: block;
          width: calc(100% - 35px - 10px);
        }
      }
    }

    .bike-compare-specs {
      .bike-compare-right {
        overflow-x: auto;
        overflow-y: hidden;
        .bike-compare-right__item {
          .bike-compare-right__item__thumbnail {
            position: relative;
            height: 150px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            button.btn-delete {
              cursor: pointer;
              background-color: ${color_red_main};
              color: ${color_white_main};
              padding: 1px 6px 3px;
              border-radius: 50%;
              border: none;
              right: 0;
              position: absolute;
              top: 0;
              outline: none;
            }
          }
          .bike-compare-right__item__title {
            text-align: center;
            height: 70px;
            overflow: hidden;
            h4 {
              margin: 5px 0;
            }
          }
          .bike-compare-right__item__content {
            padding: 2.5px; 
            background: #000;
            height: 1500px;
          }
        }
      }
    }
  `

class BikesCompare extends React.Component {
  render() {
    const MetaData = {
      title: `Perbandingan Sepeda - Mau Gowes`,
      description: `Spesifikasi dan deskripsi dari`
    }

    return (
      <GlobalLayout metadata={MetaData}>
        <DefaultLayout>
          <BikesCompareStyled>
            {/* input to search data */}
            <div className="bike-compare-search grid">
              <div className="col-3_md-5_xs-12 bike-compare-search_input-group">
                <img
                  src="/static/images/icons/search-icon.svg"
                  width="16"
                  height="16"
                />
                <input
                  type="text"
                  name="input-search-bike"
                  id="input-search-bike"
                  placeholder="Pencarian sepeda"
                />
              </div>
            </div>
            {/* end of input to search data */}

            <div className="grid bike-compare-specs">
              <div className="col-3 bike-compare-left">left side</div>
              <div className="col-9 bike-compare-right">
                <div className="grid" style={{ flexFlow: "unset" }}>
                  {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                    (n, key) => {
                      return (
                        <div
                          key={key}
                          className="col-3 bike-compare-right__item">
                          <div
                            className="bike-compare-right__item__thumbnail"
                            style={{
                              backgroundImage: `url(/static/images/dummies/bike-1.jpg)`
                            }}>
                            <button type="button" className="btn-delete">
                              x
                            </button>
                          </div>
                          <div className="bike-compare-right__item__title">
                            <h4>Pinarello F12 2020</h4>
                          </div>
                          <div className="bike-compare-right__item__content">
                            ...
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
              </div>
            </div>
          </BikesCompareStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default BikesCompare
