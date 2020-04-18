import React from "react"

import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Styled from "styled-components"
import Tab from "../../components/navigations/Tab"
import HeaderLvl2 from "../../components/navigations/HeaderLvl2"
import MarketplaceBox from "../../components/boxs/MarketplaceBox"
import { color_gray_dark } from "../../components/Const"

// components
import ProductBox from "../components/boxs/ProductBox"

const ProductStyled = Styled.div`
  .product-description {
    line-height: 1.8;
    color: ${color_gray_dark};
  }
`

const TabContent = [
  { text: "Deskripsi Produk", link: "/product/description" },
  { text: "Diskusi", link: "/product/discussions" },
]

class ProductPage extends React.Component {
  static async getInitialProps({ query }) {
    return { id: query.id }
  }
  render() {
    return (
      <GlobalLayout>
        <DefaultLayout>
          <ProductStyled className="product-page">
            <div className="grid-center">
              <div className="col-10_xs-12">
                <ProductBox />

                <div className={"grid"}>
                  <div className={"col-12"}>
                    <Tab tabContent={TabContent} />
                  </div>
                  <div className={"col-12 product-description"}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec id erat a nisl consequat elementum aliquam et sem.
                      Maecenas augue felis, rutrum ut facilisis at, auctor id
                      nisl. Ut vestibulum iaculis turpis, eget condimentum mi
                      volutpat eget. Ut convallis luctus mauris, dapibus
                      vestibulum dui tristique ut. Morbi sed felis tellus.
                      Aenean consectetur diam et accumsan molestie. Donec
                      consequat tortor in pulvinar finibus.
                      <br />
                      Integer nec rutrum sem. Pellentesque convallis enim vel
                      nulla ornare faucibus. Nam ullamcorper erat quis porta
                      finibus. Maecenas quis tincidunt ligula. Ut ornare
                      fringilla lorem, sit amet tincidunt risus congue vitae. In
                      id dui vehicula urna pretium gravida ut id ipsum. Mauris
                      tincidunt consequat interdum. Ut pulvinar nibh in est
                      pulvinar, ullamcorper scelerisque est finibus. Sed id est
                      hendrerit, semper mi et, sollicitudin erat. Quisque
                      accumsan odio non pretium euismod.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/*related product*/}
            <HeaderLvl2 title={"Produk Lainnya"} />

            <div className={"grid"}>
              <div className={"col-12"}>
                <MarketplaceBox noMarginTop />
              </div>
            </div>
            {/*end of related product*/}
          </ProductStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default ProductPage
