import { useEffect, useState } from "react"
import Styled from "styled-components"
import { color_gray_soft, color_black_main, color_blue_main } from "../Const"
import initialDropdown from "../../modules/dropdown"

// components
import Link from "next/link"
import Dropdown from "../dropdown/index"
import IconBottomArrow from "../icons/bottom-arrow"
import IconSearch from "../icons/Search"
import SearchModal from "../modals/SearchInput"

const HeaderStyled = Styled.header`
  .header-logo {
    text-align: center;
    padding: 50px 0;
    .header-logo-img {
      width: 100px;
      max-width: 100%;
      border-radius: 8px;
    }
  }

  .header-top-menu {
    border-top: 2px solid ${color_gray_soft}; 
    border-bottom: 2px solid ${color_blue_main};
    
    margin: 0;
    button.header-top-menu_link {
      background: transparent;
    }

    .header-top-menu__left, .header-top-menu__right {
      padding: 0 5px;
      display: flex;
      align-items: center;
      height: 50px;
    }

    .header-top-menu__right {
      justify-content: flex-end
    }

    .header-top-menu_link {
      margin: 0 auto;
      border: none;
      cursor: pointer;
      text-decoration: none;
      color: ${color_black_main};
      font-size: 16px;
      display: block;
      text-align: center;
      font-weight: bold;
      text-transform: uppercase;
      outline: none;
      letter-spacing: 1.5px;
      .header-top-menu_link_icon {
        margin-left: 5px;
      }
    }

    .header-top-menu_dropdown {
      padding: 10px;
    }

    .header-categories-list-dropdown {
      max-height: 100vh;
      overflow: auto;
      padding: 10px 20px;
      top: 45px;
      rigt: -10px;
      a {
        text-decoration: none;
        text-transform: capitalize;
      }
      h3 {
        font-weight: 100;
        margin: 5px 0 10px;
        text-transform: uppercase;
      }
      ul {
        border-bottom: .5px solid ${color_gray_soft};
        margin-bottom: 15px;
        padding-bottom: 15px;
        li {
          padding: 0;
        }
      }
    }


    .header-top-menu_group {
      margin: 0;
      padding: 0;
      display: -webkit-inline-box;
      position: relative;
      li {
        list-style: none;
        padding: 0 20px;
        &:first-child {
          padding-left: 0;
        }
        &.active {
          a {
            color: ${color_blue_main};
          }
        }
      }
      a.btn-search {
        width: 25px !important;
        height: 25px !important;
        position: absolute;
        top: -11px;
        right: 5px;
      }
    }
  }

  [class*=col-] {
    padding: 0;
  }

  // responsiveness
  // gridlex _xs
  @media (max-width: 36em) {
    .header-logo {
      padding: 10px 0;
      .header-logo-img {
        width: 50px;
      }
    }
  }
  // gridlex _sm
  @media (max-width: 48em) {
    .header-logo {
      padding: 10px 0;
      .header-logo-img {
        width: 50px;
      }
    }
  }
`

const AvailableMenu = [
  {
    name: "Videos",
    pathname: "videos",
    link: "/videos",
  },
  {
    name: "Blog",
    pathname: "blog",
    link: "/blog",
  },
  {
    name: "Bikes",
    pathname: "bikes",
    link: "/bikes",
  },
  {
    name: "Events",
    pathname: "events",
    link: "/events",
  },
  // {
  //   name: "Marketplace",
  //   link: "/marketplace"
  // },
]

const Header = (props) => {
  const [path, setPath] = useState({})
  const [doSearch, setDoSearch] = useState(false)
  const { pathname } = path

  useEffect(() => {
    initialDropdown()

    const pathArr = window.location.pathname.split("/")
    setPath({ pathname: pathArr[1] })
  }, [])

  return (
    <HeaderStyled>
      {/* search modal */}
      {doSearch ? <SearchModal onClose={() => setDoSearch(false)} /> : null}

      {/* end of search modal */}

      <div className="grid-center header-logo">
        <div className="col">
          <Link href="/">
            <a href="/">
              <img
                className="header-logo-img"
                src="/static/images/logos/maugowes-v2/icon-128x128.png"
                alt="logo Mau Gowes"
              />
            </a>
          </Link>
        </div>
      </div>

      <div className="grid-noGuttter header-top-menu">
        {/* left menus */}
        <div
          className="col-6_xs-11 header-top-menu__left"
          style={{ overflow: "auto" }}>
          <ul className="header-top-menu_group">
            {AvailableMenu.map((n, key) => {
              return (
                <li
                  className={n.pathname == pathname ? "active" : ""}
                  key={key}>
                  {n.child ? (
                    <Dropdown>
                      <button
                        type="button"
                        className="dropdown-btn header-top-menu_link">
                        {n.name}
                        <IconBottomArrow
                          className="header-top-menu_link_icon"
                          size="10"
                        />
                      </button>
                      <div className="dropdown-content dropdown-btn header-top-menu_dropdown">
                        <ul>
                          {n.child.map((m, key) => {
                            return (
                              <li key={key}>
                                <Link href={m.link}>
                                  <a href={m.link}>
                                    {m.name}{" "}
                                    <IconBottomArrow
                                      className="header-top-menu_link_icon"
                                      size="10"
                                    />
                                  </a>
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </Dropdown>
                  ) : (
                    <Link href={n.link}>
                      <a className="header-top-menu_link" href={n.link}>
                        {n.name}
                      </a>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        {/* end of left menus */}

        {/* right menus */}
        <div className="col-6_xs-1 header-top-menu__right">
          <div className="header-top-menu_group">
            <a
              onClick={(e) => {
                e.preventDefault()
                setDoSearch(true)
              }}
              style={{ background: "#FFF" }}
              className="btn-search"
              href="#"
              title="Pencarian Mau Gowes">
              <IconSearch width={25} height={25} />
            </a>
          </div>
        </div>
        {/* end of right menus */}
      </div>
    </HeaderStyled>
  )
}

export default Header
