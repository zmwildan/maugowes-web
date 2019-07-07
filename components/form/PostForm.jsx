import React from "react"
import Styled from "styled-components"
import InputText from "./InputText"
import InputFile from "./InputFile"
import InputTag from "./InputTag"
import Editor from "./Editor"
import Submit from "./Submit"
import FormStyled from "./FormStyled"

class BlogPage extends React.Component {
  state = {}

  submitHandler() {
    const {} = this.state
  }

  render() {
    const is_loading = false
    return (
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
    )
  }
}

export default BlogPage
