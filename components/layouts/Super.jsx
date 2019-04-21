import React from "react"
import Styled from "styled-components"
import Link from "next/link"
import { color_gray_dark, color_gray_medium } from "../Const"

const SuperStyled = Styled.div`
  .super-sidebar-child {
    border-bottom: 1px solid ${color_gray_medium};
    padding: 10px 5px;
    margin: 0 0 5px;
    strong {
      display: block;
      margin-bottom: 10px;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        line-height: 2;
        a {
          color: ${color_gray_dark};
          text-decoration: none;
        }
      }
    }
  }
`

class SuperLayout extends React.Component {
  render() {
    return (
      <SuperStyled>
        <div className="grid">
          <div className="col-2">
            <div className="super-sidebar">
              <div className="super-sidebar-child">
                <strong>Blog</strong>
                <ul>
                  <li>
                    <Link href="/super/blog">
                      <a href="/super/blog">+Tambah Post</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/super/blog">
                      <a href="/super/blog">Blog</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="super-sidebar-child">
                <strong>Akun</strong>
                <ul>
                  <li>
                    <Link href="/super/blog">
                      <a href="/super/blog">Keluar</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-8">{this.props.children}</div>
        </div>
      </SuperStyled>
    )
  }
}

export default SuperLayout
