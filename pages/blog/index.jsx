import React from "react"
import Styled from "styled-components"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import BlogBox from "../../components/boxs/BlogBox"
import Pagination from "../../components/navigations/Pagination"

import { connect } from "react-redux"
import { fetchBlog } from "../../redux/blog/actions"

const BlogStyled = Styled.div`

`

const Dummy = [
  {
    id: 1,
    title: "title 1"
  },
  {
    id: 2,
    title: "title 2"
  }
]

class Blog extends React.Component {
  static async getInitialProps({ reduxStore, req }) {
    reduxStore.dispatch(fetchBlog("new"))
    console.log(reduxStore)
    reduxStore.dispatch(fetchBlog("new", Dummy))
    return {}
  }

  render() {
    return (
      <GlobalLayout>
        <DefaultLayout>
          <BlogStyled>
            <Header
              title="Mau Gowes Blog"
              text="Yuk berbagi cerita tentang sepeda di Mau Gowes Blog"
              backgroundImage="/static/images/background/bg-bike-store.jpg"
            />
            <BlogBox noHeaderTitle />
            <div className="grid-center">
              <div className="col">
                <Pagination />
              </div>
            </div>
          </BlogStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect()(Blog)
