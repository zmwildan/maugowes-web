import React from "react"
import Styled from "styled-components"
import { requestQueryGenerator } from "../../blog/index"
import { connect } from "react-redux"
import { fetchBlog, fetchMoreBlog } from "../../../redux/blog/actions"
import config from "../../../config/index"
import { objToQuery } from "string-manager"
import fetch from "isomorphic-unfetch"

// components
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import PageHeader from "../../../components/boxs/PageHeader"
import BlogBox from "../../../components/super/boxs/BlogBox"

const BlogPageStyled = Styled.div`

`
const MaxResults = 6
let StoreFilter = "super"

class BlogPage extends React.Component {
  state = {
    page: 1
  }

  static async getInitialProps({ reduxStore, query }) {
    if (typeof window == "undefined") {
      //  only call in server side
      const { endpoint, type } = fetchBlog()["CALL_API"]
      const reqQuery = requestQueryGenerator(query)
      reqQuery.showDraft = true

      const postsResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${endpoint}?${objToQuery(
          reqQuery
        )}`
      )
      const posts = await postsResponse.json()

      reduxStore.dispatch({
        type,
        filter: StoreFilter,
        data: posts
      })
    }

    return {
      tag: query.tag || "",
      username: query.username,
      query
    }
  }

  componentDidMount() {
    const blogState = this.props.blog[StoreFilter] || {}
    if (!blogState.status && !blogState.is_loading) {
      const reqQuery = requestQueryGenerator(this.props.query)
      reqQuery.showDraft = true
      this.props.dispatch(fetchBlog(StoreFilter, reqQuery))
    }
  }

  loadmoreHandler() {
    const blogState = this.props.blog[StoreFilter] || {}
    if (!blogState.is_loading && blogState.status == 200) {
      this.setState(
        {
          page: this.state.page + 1
        },
        async () => {
          let reqQuery = {
            limit: MaxResults,
            page: this.state.page,
            showDraft: true
          }
          if (this.props.tag) reqQuery.tag = this.props.tag

          return this.props.dispatch(fetchMoreBlog(StoreFilter, reqQuery))
        }
      )
    }
  }

  render() {
    const blogState = this.props.blog[StoreFilter] || {}
    // const { is_loading } = blogState
    return (
      <GlobalLayout metadata={{ title: "Blog Management" }}>
        <DefaultLayout>
          <SuperLayout>
            <BlogPageStyled className="p-t-b-30">
              <PageHeader title="Blog Management" />
              <BlogBox
                data={blogState}
                maxResults={MaxResults}
                loadmoreHandler={() => this.loadmoreHandler()}
                isSuper
              />
            </BlogPageStyled>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect(state => {
  return {
    blog: state.Blog
  }
})(BlogPage)
