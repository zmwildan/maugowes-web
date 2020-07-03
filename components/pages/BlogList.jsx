import Styled from "styled-components"
import { connect } from "react-redux"
import { fetchBlog, fetchMoreBlog } from "../../redux/blog/actions"
import { toSlug } from "string-manager"
import { progressBar } from "../../modules/loaders"

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
    const Filter = filterGenerator(query)

    if (req) {
      const reqQuery = requestQueryGenerator(query)
      await reduxStore.dispatch(fetchBlog(Filter, reqQuery))
    }

    return {
      tag: query.tag || "",
      username: query.username,
      query,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      filterGenerator(prevProps.query) !== filterGenerator(this.props.query)
    ) {
      this.fetchData()
    }
  }

  fetchData(query = this.props.query) {
    const Filter = filterGenerator(query)
    const blogState = this.props.blog[Filter] || {}
    if (!blogState.status && !blogState.is_loading) {
      progressBar.start()
      const reqQuery = requestQueryGenerator(query)
      this.props.dispatch(fetchBlog(Filter, reqQuery))
    }
  }

  loadmoreHandler() {
    const Filter = filterGenerator(this.props.query)
    const blogState = this.props.blog[Filter] || {}
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

          return this.props.dispatch(fetchMoreBlog(Filter, reqQuery))
        }
      )
    }
  }

  render() {
    const Filter = filterGenerator(this.props.query)
    const blog = this.props.blog[Filter] || {}

    if (blog.status) progressBar.stop()

    let title = "Blog - Mau Gowes"
    if (this.props.tag) {
      title = `Postingan Dengan Tag "${this.props.tag}" - Mau Gowes`
    } else if (this.props.username) {
      title = `Postingan dari "${this.props.username}" - Mau Gowes`
    }

    return (
      <GlobalLayout
        metadata={{
          title,
          description: `${title}. Baca postingan terupdate seputar dunia pergowesan`,
        }}>
        <DefaultLayout>
          <BlogStyled>
            <Header
              title={title}
              text="Yuk berbagi cerita tentang sepeda di Mau Gowes Blog"
              stats={{
                suffix: "post",
                total: blog.total || 0,
                show:
                  blog.results && blog.results.length ? blog.results.length : 0,
              }}
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

export function filterGenerator(query = {}) {
  let filter = StoreFilter

  if (query.tag) filter = toSlug(query.tag)
  if (query.username) filter = toSlug(query.username)

  return filter
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
