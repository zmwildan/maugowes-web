import React from "react"
import Styled from "styled-components"
import { color_gray_soft, color_black_main } from "../Const"
import initialDropdown from "../../modules/dropdown"

// components
import Dropdown from "../dropdown/index"
import Link from "next/link"

const HeaderStyled = Styled.header`
  .header-logo {
    text-align: center;
    padding: 20px 0; 
  }

  .header-top-menu {
    border-top: 2px solid ${color_gray_soft}; 
    border-bottom: 2px solid ${color_gray_soft};
    


    .header-top-menu_link {
      text-decoration: none;
      color: ${color_black_main};
      font-size: 18px;
      display: block;
      text-align: center;
      font-weight: bold;
      text-transform: uppercase;
    }

    .header-top-menu_group_left {
      border-right: 2px solid ${color_gray_soft}; 
    }

    .header-top-menu_group {
      margin: 0;
      padding: 0;
      display: inline-flex;
      padding: 25px 10px;
      li {
        width: 200px;
        list-style: none;
      }
    }
  }

  [class*=col-] {
    padding: 0;
  }
`

const AvailableMenu = [
  {
    name: "Roadbike",
    link: "/categories/roadbike",
    child: [
      {name: "accesories", link: "/categories/roadbike/accesories"},
      {name: "part", link: "/categories/roadbike/part"},
      {name: "frameset", link: "/categories/roadbike/frameset"},
    ]
  },
  {
    name: "MTB",
    link: "/categories/mtb",
    child: [
      {name: "accesories", link: "/categories/roadbike/mtb"},
      {name: "part", link: "/categories/mtb/part"},
      {name: "frameset", link: "/categories/mtb/frameset"},
    ]
  }
]

class Header extends React.Component {
  componentDidMount = () => {
    initialDropdown()
  }

  render = () => {
    return (
      <HeaderStyled>
        <div className="container">
          <div className="grid-center header-logo">
            <div className="col">
              <img src="/static/images/logo.png" alt="logo Mau Gowes" />
            </div>
          </div>

          <div className="grid header-top-menu">
            <div className="col-3_xs-6 header-top-menu_group header-top-menu_group_left">
              <Dropdown>
                <a
                  className="dropdown-btn header-top-menu_link"
                  href="javascript:;">
                  Categories
                </a>
                <div className="dropdown-content">this is dropdown...</div>
              </Dropdown>
            </div>
            <div className="col-3_xs-6"> 
              <ul className="header-top-menu_group">
                {
                  AvailableMenu.map((n, key) => {
                    return (
                      <li>
                        <Dropdown>
                          <a
                            className="dropdown-btn header-top-menu_link"
                            href="javascript:;">
                            {n.name}
                          </a>
                          <div className="dropdown-content">
                            <ul>
                              {
                                n.child.map((m, key) => {
                                  return (
                                    <li>
                                      <Link href={m.link}>{m.name}</Link>
                                    </li>
                                  )
                                })
                              }
                            </ul>
                          </div>
                        </Dropdown>
                      </li>
                    ) 
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </HeaderStyled>
    )
  }
}

export default Header
