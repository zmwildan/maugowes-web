import Styled from "styled-components"
import { color_gray_dark, color_gray_medium, color_black_main } from "../Const"

const SidebarMarketplaceSytled = Styled.div`
  .sidebar-items {
    margin-bottom: 10px;
    padding-right: 20px;
    &.sidebar-items_fixed {
      position: fixed;
      top: 0;
    }
    h2.title {
      text-transform: uppercase;
      font-size: 18px;
      border-bottom: 1px solid ${color_gray_medium};
      padding-bottom: 10px;
    }
    .categories {
      .category-item {
        padding-bottom: 10px;
        border-bottom: solid 1px ${color_gray_medium};
        margin-bottom: 10px;
        a {
          text-decoration: none;
          color: ${color_black_main};
          text-transform: capitalize;
          width: 100%;
          line-height: 1.5;
        }
        .subcategories {
          transition: max-height .5s ease-out;
          height: auto;
          overflow: hidden;
          max-height: 0;
          &.active {
            max-height: 50px;
          }
          .subcategory-item {
            a {
              color: ${color_gray_dark};
            }
          }
        }
      }
    }
  }
`

const dummyCats = [
  {
    name: "roadbike",
    link: "/marketplace?category=1",
    subcategories: [
      {
        name: "aksesories",
        link: "marketplace?category=23"
      },
      {
        name: "parts",
        link: "marketplace?category=23"
      }
    ]
  },
  {
    name: "semua sepeda",
    link: "/marketplace?category=1",
    subcategories: [
      {
        name: "aksesories",
        link: "marketplace?category=23"
      },
      {
        name: "parts",
        link: "marketplace?category=23"
      }
    ]
  }
]

export default class SidebarMarketplace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeCat: null,
      sidebarWidth: 0,
      sidebarFixed: false
    }
    this.scrollHandler = this.scrollHandler.bind(this)
  }

  componentDidMount() {
    const sidebarWidth =
      document.getElementById("sidebar-marketplace").clientWidth - 20
    this.setState({ sidebarWidth }, () => {
      // scroll listener
      document.addEventListener("scroll", this.scrollHandler)
    })
  }

  scrollHandler() {
    if (window.pageYOffset >= 710) {
      if (this.state.sidebarFixed === false) {
        this.setState({
          sidebarFixed: true
        })
      }
    } else {
      if (this.state.sidebarFixed === true) {
        this.setState({
          sidebarFixed: false
        })
      }
    }
  }

  render() {
    return (
      <SidebarMarketplaceSytled id="sidebar-marketplace">
        <div
          className={`sidebar-items ${
            this.state.sidebarFixed ? "sidebar-items_fixed" : ""
          }`}
          style={{
            width: this.state.sidebarFixed ? this.state.sidebarWidth : "inherit"
          }}>
          <h2 className="title">Categories</h2>
          <div className="categories">
            {dummyCats.map((category, catKey) => {
              return (
                <div className="category-item" key={catKey}>
                  <a
                    onClick={() =>
                      this.setState({
                        activeCat:
                          this.state.activeCat === catKey ? null : catKey
                      })
                    }
                    href="javascript:;">
                    {category.name}
                    <span style={{ float: "right" }}>
                      {this.state.activeCat === catKey ? "-" : "+"}
                    </span>
                  </a>
                  <div
                    className={`subcategories ${
                      this.state.activeCat === catKey ? "active" : ""
                    }`}>
                    {category.subcategories.map((subcategory, subKey) => {
                      return (
                        <div className={`subcategory-item`} key={subKey}>
                          <a href="#">{subcategory.name}</a>
                        </div>
                      )
                    })}
                    <div className={`subcategory-item`}>
                      <a href="#">Semua Kategori</a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </SidebarMarketplaceSytled>
    )
  }
}
