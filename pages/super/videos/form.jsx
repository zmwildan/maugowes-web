import React from "react"
import { connect } from "react-redux"

// components
import GlobalLayout from "../../../components/layouts/Global"
import DefaultLayout from "../../../components/layouts/Default"
import SuperLayout from "../../../components/layouts/Super"
import PageHeader from "../../../components/boxs/PageHeader"
import VideoForm from "../../../components/form/VideoForm"

class Videos extends React.Component {
  static async getInitialProps({ reduxStore, res, query }) {
    const { id } = query
    return { id }
  }

  componentDidMount() {
  
  }

  render() {
    const { id } = this.props
    const title = id ? "Update Video" : "Add Video"
    return (
      <GlobalLayout metadata={{ title }}>
        <DefaultLayout>
          <SuperLayout>
            <div className="p-t-b-30">
              <PageHeader title={title} />
              <VideoForm formResponse={{}} isEdit={typeof id != "undefined"} />
            </div>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect()(Videos)
