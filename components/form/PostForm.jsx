import React from "react"
// import Styled from "styled-components"
import { createPost, updatePost } from "../../redux/blog/actions"

// components
import InputText from "./InputText"
import InputFile from "./InputFile"
import InputTag from "./InputTag"
import Editor from "./Editor"
import Submit from "./Submit"
import FormStyled from "./FormStyled"
import Toast from "../../modules/toast"

class BlogPage extends React.Component {
  state = {}

  submitHandler() {
    const {} = this.state
  }

  componentDidMount() {
    if (this.props.isEdit) {
      const { blogData } = this.props
      this.setState({
        title: blogData.title,
        content: blogData.content,
        tags: blogData.tags,
        video: blogData.video
      })
    }
  }

  componentWillReceiveProps(np) {
    const { formResponse } = np
    console.log("response", formResponse)
    if (formResponse.status == 200) {
      location.href = "/super/blog"
    }
  }

  submitHandler(draft = false) {
    if (!this.state.content) return Toast(true, "Konten wajib diisi", "error")

    if (!this.props.isEdit && !this.state.image)
      return Toast(true, "Wajib upload gambar", "error")

    let formdata = {
      title: this.state.title,
      content: this.state.content,
      tags:
        this.state.tags && this.state.tags.length > 0
          ? this.state.tags.toString()
          : "blog"
    }

    if (this.state.video) formdata.video = this.state.video
    if (this.state.image) formdata.image = this.state.image

    if (this.props.isEdit) {
      this.props.dispatch(updatePost(formdata, this.props.blogData.id))
    } else {
      this.props.dispatch(createPost(formdata))
    }

    console.log("submit data", formdata)
  }

  render() {
    const { is_loading, status } = this.props.formResponse
    return (
      <FormStyled method="post" action="javascript:;">
        <InputFile
          label="Gambar Utama"
          name="image"
          id="input-image"
          value={this.state.image || ""}
          validate={this.state.image_validate || {}}
          setState={(n, cb) => this.setState(n, cb)}
          required={!this.props.isEdit}
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
          value={this.state.content}
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
          onClick={() => this.submitHandler()}
          loading={is_loading || status == 200 || status == 201}
          text="Simpan Post"
          requiredInputs={["title"]}
          setState={(n, cb) => this.setState(n, cb)}
        />
      </FormStyled>
    )
  }
}

export default BlogPage
