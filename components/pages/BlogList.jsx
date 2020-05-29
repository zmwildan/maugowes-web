import Styled from "styled-components"
import { connect } from "react-redux"
import { fetchBlog, fetchMoreBlog } from "../../redux/blog/actions"

// layouts
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"

// components
import Header from "../../components/boxs/FullWidthHeader"
import BlogBox from "../../components/boxs/BlogBox"

const BlogStyled = Styled.div`

`

const StoreFilter = "list"
const MaxResults = 6

class Blog extends React.Component {
  state = {
    page: 1,
  }

  static async getInitialProps({ req, reduxStore, query }) {
    if (req) {
      const reqQuery = requestQueryGenerator(query)
      await reduxStore.dispatch(fetchBlog(StoreFilter, reqQuery))
    }

    return {
      tag: query.tag || "",
      username: query.username,
      query,
    }
  }

  componentDidMount() {
    const blogState = this.props.blog[StoreFilter] || {}
    if (!blogState.status && !blogState.is_loading) {
      const reqQuery = requestQueryGenerator(this.props.query)
      this.props.dispatch(fetchBlog(StoreFilter, reqQuery))
    }
  }

  loadmoreHandler() {
    const blogState = this.props.blog[StoreFilter] || {}
    if (!blogState.is_loading && blogState.status == 200) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        async () => {
          let reqQuery = {
            limit: MaxResults,
            page: this.state.page,
          }
          if (this.props.tag) reqQuery.tag = this.props.tag

          return this.props.dispatch(fetchMoreBlog(StoreFilter, reqQuery))
        }
      )
    }
  }

  render() {
    const blog = this.props.blog[StoreFilter] || {}
    let title = "Blog - Mau Gowes"
    if (this.props.tag) {
      title = `Postingan Dengan Tag "${this.props.tag}"`
    } else if (this.props.username) {
      title = `Postingan dari "${this.props.username}"`
    }

    return (
      <GlobalLayout
        metadata={{
          title,
          description: "Baca postingan terupdate seputar dunia pergowesan",
        }}>
        <DefaultLayout>
          <BlogStyled>
            <Header
              title={title}
              text="Yuk berbagi cerita tentang sepeda di Mau Gowes Blog"
              backgroundImage="/static/images/cover/cover-blog.jpeg"
            />
            <BlogBox
              noHeaderTitle
              maxResults={MaxResults}
              data={blog}
              loadmoreHandler={() => this.loadmoreHandler()}
            />
          </BlogStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export function requestQueryGenerator(query = {}) {
  let reqQuery = {
    page: 1,
    limit: MaxResults,
  }

  if (query.tag) reqQuery.tag = query.tag
  if (query.username) reqQuery.username = query.username

  return reqQuery
}

export default connect((state) => {
  return {
    blog: state.Blog,
  }
})(Blog)
