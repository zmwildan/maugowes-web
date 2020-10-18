import { useEffect } from "react"
import Styled from "styled-components"
import { connect } from "react-redux"

// redux
import { fetchSearch } from "../../redux/search/actions"

// layouts
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"

// components
import Header from "../../components/boxs/FullWidthHeader"
import BlogBox from "../../components/boxs/BlogBox"

const SearchStyled = Styled.div`

`
const Search = (props) => {
  const { keyword, search } = props
  const searchResults = search[keyword] || {}

  useEffect(() => {
    console.log("keyword is changes...", keyword)
    const result = search[keyword] || {}
    if (!result.status && !result.is_loading) {
      props.dispatch(fetchSearch({ query: { keyword } }))
    }
  }, [keyword])

  let title = `Pencarian "${keyword}"`,
    description = `Berikut adalah hasil pencarian "${keyword}" di Mau Gowes`

  const blogResponse = {
    is_loading: searchResults.is_loading,
    message:
      searchResults.data && searchResults.data.posts.length === 0
        ? "Hasil tidak ditemukan"
        : "",
    status:
      searchResults.data && searchResults.data.posts.length === 0 ? 204 : 200,
    results: searchResults.data ? searchResults.data.posts : [],
  }

  return (
    <GlobalLayout metadata={{ title, description }}>
      <DefaultLayout>
        <SearchStyled>
          <Header title={title} text={description} />
          {/* search box */}
          <BlogBox title="Hasil di Blog" data={blogResponse} />
          {/* end of search box */}
        </SearchStyled>
      </DefaultLayout>
    </GlobalLayout>
  )
}

Search.getInitialProps = async ({ req, query, reduxStore }) => {
  const { keyword } = query

  if (req) {
    // server side request
    await reduxStore.dispatch(fetchSearch({ query }))
  }

  return {
    keyword,
  }
}

Search.defaultProps = {
  keyword: "",
}

export default connect((state) => {
  return {
    search: state.Search,
  }
})(Search)
