import React from "react"
import Styled from "styled-components"

// components
import InputText from "./InputText"
import Select from "./Select"
import Submit from "./Submit"
import FormStyled from "./FormStyled"
import Toast from "../../modules/toast"
import { addVideo } from "../../redux/videos/actions"

const VideoFormStyled = Styled(FormStyled)`
  iframe {
    border: none;
    margin-bottom: 50px;
  }
`

class VideoForm extends React.Component {
  state = {
    video_type: "youtube"
  }

  submitHandler() {
    const { video_id, video_type } = this.state
    let formdata = { video_id, video_type }
    this.props.dispatch(addVideo(formdata))
  }

  componentWillReceiveProps(np) {
    const { formResponse } = np
    if(formResponse.status != this.props.formResponse.status) {
      if (formResponse.status == 200 || formResponse.status == 201) {
        if(formResponse.messages) Toast(true, formResponse.messages, "success")
        location.href = "/super/videos"
      } else {
        if(formResponse.messages) Toast(true, formResponse.messages, "error")
      }
    }
  }

  // componentDidMount() {
  //   if (this.props.is_edit) {
  //   }
  // }

  // componentWillReceiveProps(np) {

  // }

  render() {
    const { is_loading, status } = this.props.formResponse
    const { video_type, video_id } = this.state
    return (
      <VideoFormStyled method="post" action="javascript:;">
        <Select
          label="Video Type"
          name="video_type"
          value={video_type || "youtube"}
          validate={this.state.video_type_validate || {}}
          options={[{ value: "youtube", text: "Youtube" }]}
          setState={(n, cb) => this.setState(n, cb)}
          required
        />
        <InputText
          label="Video id"
          placeholder="Video id"
          type="text"
          value={video_id || ""}
          validate={this.state.video_id_validate || {}}
          setState={(n, cb) => this.setState(n, cb)}
          name="video_id"
          required
        />
        {/* preview box */}
        {video_type && video_id ? (
          <React.Fragment>
            <div>
              <strong>
                <small>Preview: </small>
              </strong>
            </div>
            <div>
              <iframe
                className="video-preview"
                src={`https://youtube.com/embed/${video_id}`}
              />
            </div>
          </React.Fragment>
        ) : null}
        {/* end of preview box */}
        <br />
        <Submit
          style={{ display: "inline", marginRight: 10 }}
          onClick={() => this.submitHandler(true)}
          loading={is_loading || status == 200 || status == 201}
          text={this.props.is_edit ? "Edit Video" : "Tambah Video"}
          requiredInputs={["video_id", "video_type"]}
          setState={(n, cb) => this.setState(n, cb)}
        />
      </VideoFormStyled>
    )
  }
}

export default VideoForm
