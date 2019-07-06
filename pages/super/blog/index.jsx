import React from "react"
import Styled from "styled-components"

// components
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import PageHeader from "../../../components/boxs/PageHeader"
import Table from "../../../components/tables/TableWrapper"
import BlogRow from "../../../components/tables/rows/BlogRow"
import Button from "../../../components/buttons/index"

const BlogPageStyled = Styled.div`

`

class BlogPage extends React.Component {
  render() {
    const is_loading = false
    return (
      <GlobalLayout metadata={{ title: "Blog Management" }}>
        <DefaultLayout>
          <SuperLayout>
            <BlogPageStyled className="p-t-b-30">
              <PageHeader title="Blog Management" />
              <Table>
                <BlogRow />
                <BlogRow />
                <BlogRow />
                <BlogRow />
              </Table>
              <div className="grid-center" style={{ margin: "20px 0 40px" }}>
                <Button
                  type="button"
                  isDisabled={is_loading}
                  text={!is_loading ? "Postingan Berikutnya" : "Loading..."}
                  size="large"
                  onClick={() => {}}
                />
              </div>
            </BlogPageStyled>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default BlogPage
