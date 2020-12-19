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

const Menus = [
  {
    name: "Blog",
    child: [
      {
        name: "+ Create Post",
        link: "/super/blog/create",
      },
      {
        name: "Posts",
        link: "/super/blog",
      },
    ],
  },
  {
    name: "Videos",
    child: [
      {
        name: "+ Create Video",
        link: "/super/videos/create",
      },
      {
        name: "Videos",
        link: "/super/videos",
      },
    ],
  },
  {
    name: "Bikes",
    child: [
      {
        name: "+ Create Bike",
        link: "/super/bikes/create",
      },
      {
        name: "Bikes",
        link: "/super/bikes",
      },
    ],
  },
  {
    name: "Events",
    child: [
      // {
      //   name: "+ Create Event",
      //   link: "/super/events/create",
      // },
      {
        name: "Events",
        link: "/super/events",
      },
    ],
  },
  {
    name: "Akun",
    child: [
      {
        name: "Keluar",
        onClick: (e, dispatch) => {
          e.preventDefault()
          dispatch(logout())
          setTimeout(() => location.reload(), 1200)
        },
      },
    ],
  },
]

const SuperLayout = (props) => {
  return (
    <SuperStyled>
      <div className="grid m-t-b-30">
        <div className="col-2_md-3_xs-12" data-push-right="off-1_md-0">
          <div className="super-sidebar">
            {Menus.map((n, key) => {
              return (
                <div key={key} className="super-sidebar-child">
                  <strong>{n.name}</strong>
                  {n.child ? (
                    <ul>
                      {n.child.map((m, mkey) => {
                        return (
                          <li key={mkey}>
                            <a
                              href={m.onClick ? "#" : m.link || ""}
                              onClick={(e) => {
                                if (m.onClick)
                                  return m.onClick(e, props.dispatch)
                              }}>
                              {m.name}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  ) : null}
                </div>
              )
            })}
            {/* <div className="super-sidebar-child">
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
                <strong>Bikes</strong>
                <ul>
                  <li>
                    <a href="/super/bikes/create">+Tambah Bike</a>
                  </li>
                  <li>
                    <a href="/super/bikes">Bikes</a>
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
                        props.dispatch(logout())
                        setTimeout(() => location.reload(), 2000)
                      }}
                      href="javascript:;">
                      Keluar
                    </a>
                  </li>
                </ul>
              </div> */}
          </div>
        </div>
        <div className="col-8_md-9_xs-12">{props.children}</div>
      </div>
    </SuperStyled>
  )
}

export default connect((state) => {
  return { auth: state.Auth }
})(SuperLayout)
