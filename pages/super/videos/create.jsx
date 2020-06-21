import React from "react"
import { connect } from "react-redux"

// components
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import PageHeader from "../../../components/boxs/PageHeader"
import VideoForm from "../../../components/form/VideoForm"

const Videos = ({ id, videos, dispatch }) => {
  const title = id ? "Update Video" : "Add Video"

  return (
    <GlobalLayout metadata={{ title }}>
      <DefaultLayout>
        <SuperLayout>
          <div className="p-t-b-30">
            <PageHeader title={title} />
            <VideoForm
              formResponse={videos.submit_video || {}}
              isEdit={typeof id != "undefined"}
              dispatch={dispatch}
            />
          </div>
        </SuperLayout>
      </DefaultLayout>
    </GlobalLayout>
  )
}

Videos.getInitialProps = ({ query }) => {
  const { id } = query
  return { id }
}

export default connect((state) => {
  return {
    videos: state.Videos,
  }
})(Videos)
