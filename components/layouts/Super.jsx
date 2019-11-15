import React from "react"
import Styled from "styled-components"
// import Link from "next/link"
import { logout } from "../../redux/auth/actions"
import { connect } from "react-redux"
import { color_gray_dark, color_gray_medium } from "../Const"

const SuperStyled = Styled.div`
  .super-sidebar-child {
    &:last-child {
      border-bottom: none;
    }
    border-bottom: 1px solid ${color_gray_medium};
    padding: 30px 5px;
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
                    <a href="/super/blog/create">+Tambah Post</a>
                  </li>
                  <li>
                    <a href="/super/blog">Blog</a>
                  </li>
                </ul>
              </div>

              <div className="super-sidebar-child">
                <strong>Videos</strong>
                <ul>
                  <li>
                    <a href="/super/videos/create">+Tambah Video</a>
                  </li>
                  <li>
                    <a href="/super/videos">Videos</a>
                  </li>
                </ul>
              </div>

              <div className="super-sidebar-child">
                <strong>Events</strong>
                <ul>
                  <li>
                    <a href="/super/events">Events</a>
                  </li>
                </ul>
              </div>

              <div className="super-sidebar-child">
                <strong>Akun</strong>
                <ul>
                  <li>
                    <a
                      onClick={() => {
                        this.props.dispatch(logout())
                        setTimeout(() => location.reload(), 2000)
                      }}
                      href="javascript:;">
                      Keluar
                    </a>
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

export default connect(state => {
  return { auth: state.Auth }
})(SuperLayout)
