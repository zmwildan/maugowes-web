import { useEffect, useState } from "react"
import Styled from "styled-components"
import {
  color_gray_soft,
  color_black_main,
  color_blue_main,
  color_gray_medium,
} from "../Const"
import initialDropdown from "../../modules/dropdown"

// components
import Link from "next/link"
// import Dropdown from "../dropdown/index"
// import IconBottomArrow from "../icons/bottom-arrow"
import IconSearch from "../icons/Search"
import SearchModal from "../modals/SearchInput"

const HeaderMobileStyle = `
font-size: 12px;

.header-menu {
  .header-menu__left {
    overflow-x: auto;
    overflow-y: hidden;
  }
  .header-menu__left__logo {
      margin-left: 10px;
      margin-right: 10px;
  }
  .header-menu__right {
    padding-left: 10px;
  }
}
`

const HeaderStyled = Styled.header`
    border-bottom: 1px solid ${color_gray_medium};
    margin-bottom: 50px;
    padding: 10px 0;
    font-size: 15px;

    .header-menu {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-transform: uppercase;
        font-weight: 600;

        a {
            color: ${color_black_main};
        }

        .header-menu__left, .header-menu__right {
            display: flex;
            align-items: center;
        }

        ul.header-menu__left__item {
            list-style: none;
            padding: 0;
            margin: 0;
            height: 100%;
            display: flex;
            align-items: center;
            padding:10px 0;
            li {
                margin-right: 30px;
                float:left;
                &.active {
                    a {
                        color: ${color_blue_main};
                        font-weight: bold;
                    }
                }
            }
        }

        .header-menu__left__logo {
            width: 45px;
            height: 45px;
            border-radius: 5px;
            margin-right: 30px;
        }

        .header-menu__right {
          padding-left: 30px;
        }
    }
  
    // responsiveness
    // gridlex _xs
    @media (max-width: 36em) {
        ${HeaderMobileStyle}
    }
    // gridlex _sm
    @media (max-width: 48em) {
      ${HeaderMobileStyle}
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

      <div className="container header-menu">
        <div className="header-menu__left">
          <Link href="/">
            <a href="/">
              <img
                className="header-menu__left__logo"
                src="/static/images/logos/maugowes-v2/icon-128x128.png"
                alt="Logo Mau Gowes"
              />
            </a>
          </Link>
          <div style={{ overflowX: "auto", overflowY: "hidden" }}>
            <ul className="header-menu__left__item">
              {AvailableMenu.map((n, key) => {
                return (
                  <li
                    className={n.pathname == pathname ? "active" : ""}
                    key={n.link}>
                    <Link href={n.link}>
                      <a href={n.link}>{n.name}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="header-menu__right">
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
    </HeaderStyled>
  )
}

export default Header
