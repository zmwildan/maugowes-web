import Styled from "styled-components"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import VideoBox from "../../components/boxs/VideoBox"
import Pagination from "../../components/navigations/Pagination"

const BlogStyled = Styled.div`

`

export default props => {
  return (
    <GlobalLayout>
      <DefaultLayout>
        <BlogStyled>
          <Header
            title="Mau Gowes Video"
            text="Nikmati tontonan Dari Mau Gowes. Semoga kamu semakin termotivasi setelah menonton ini ya."
            backgroundImage="/static/images/background/bg-bike-store.jpg"
          />
          <VideoBox noHeaderTitle />
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
