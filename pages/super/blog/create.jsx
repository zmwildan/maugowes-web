import React from "react"
import Styled from "styled-components"
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import PageHeader from "../../../components/boxs/PageHeader"
import FormStyled from "../../../components/form/FormStyled"
import InputText from "../../../components/form/InputText"
import InputFile from "../../../components/form/InputFile"
import InputTag from "../../../components/form/InputTag"
import Editor from "../../../components/form/Editor"
import Submit from "../../../components/form/Submit"

const BlogCreateStyled = Styled.div`

`

class BlogPage extends React.Component {
  state = {}

  render() {
    const title = "Blog Create"
    const is_loading = false
    return (
      <GlobalLayout metadata={{ title }}>
        <DefaultLayout>
          <SuperLayout>
            <BlogCreateStyled className="p-t-b-30">
              <PageHeader title={title} />
              <FormStyled method="post" action="javascript:;">
                <InputFile
                  label="Poster Kompetisi"
                  name="poster"
                  id="input-poster"
                  value={this.state.poster || ""}
                  validate={this.state.poster_validate || {}}
                  setState={(n, cb) => this.setState(n, cb)}
                  required
                />
                <InputText
                  label="Video"
                  placeholder="Video Embed Url"
                  type="text"
                  value={this.state.video || ""}
                  validate={this.state.video_validate || {}}
                  setState={(n, cb) => this.setState(n, cb)}
                  name="video"
                />
                <InputText
                  label="title"
                  placeholder="Judul postingan"
                  type="text"
                  value={this.state.title || ""}
                  validate={this.state.title_validate || {}}
                  setState={(n, cb) => this.setState(n, cb)}
                  name="title"
                  required
                />
                <Editor
                  label="content"
                  name="content"
                  setState={(n, cb) => this.setState(n, cb)}
                  required
                />
                <InputTag
                  label="Tags / Labels"
                  name="tags"
                  tags={this.state.tags || []}
                  initialValue={this.state.tags}
                  setState={(n, cb) => this.setState(n, cb)}
                />
                <br />
                <Submit
                  onClick={() => {}}
                  loading={is_loading}
                  text="Simpan Post"
                  requiredInputs={["title", "content"]}
                  setState={(n, cb) => this.setState(n, cb)}
                />
              </FormStyled>
            </BlogCreateStyled>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default BlogPage
