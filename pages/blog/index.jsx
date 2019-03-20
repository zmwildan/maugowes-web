import Styled from "styled-components"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import BlogBox from "../../components/boxs/BlogBox"
import Pagination from "../../components/navigations/Pagination"

const BlogStyled = Styled.div`

`

export default props => {
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
