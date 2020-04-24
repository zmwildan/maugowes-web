import React from "react"
import Styled from "styled-components"
import config from "../../../../config/index"
import fetch from "isomorphic-unfetch"
import Toast from "../../../../modules/toast"

// redux
import { connect } from "react-redux"
import { fetchEventDetail } from "../../../../redux/events/actions"

// components
import GlobalLayout from "../../../../components/layouts/Global"
import DefaultLayout from "../../../../components/layouts/Default"
import SuperLayout from "../../../../components/layouts/Super"
import PageHeader from "../../../../components/boxs/PageHeader"
import EventForm from "../../../../components/form/Events/EventForm"

const EditEventStyled = Styled.div`

`

class EditEvent extends React.Component {
  state = {}

  static async getInitialProps({ reduxStore, res, query }) {
    const { id } = query
    // if (typeof window == "undefined") {
    if (typeof id != "undefined" && typeof window == "undefined") {
      const { type, endpoint } = fetchEventDetail(id)["CALL_API"]
      //  only call in server side
      const postsResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${endpoint}`
      )
      const posts = await postsResponse.json()
      reduxStore.dispatch({
        type,
        filter: id,
        data: posts,
      })
    }

    return { id }
  }
  render() {
    const title = "Edit Event"
    const { id } = this.props
    const eventData = this.props.events[id] || {}
    const submitResponse = this.props.events.submit_post || {}
    const locationSearchResults = this.props.location.search_location || {}
    const { status, message } = this.props.events.submit_post || {}
    if (status === 200 || status === 201) {
      Toast(true, message)
      setTimeout(() => {
        location.href = `/super/events/detail/${id}`
      }, 800)
    }

    return (
      <GlobalLayout metadata={{ title }}>
        <DefaultLayout>
          <SuperLayout>
            <EditEventStyled className="p-t-b-30">
              <PageHeader title={title} />
              {eventData.is_loading ? (
                <Loading />
              ) : (
                <EventForm
                  dispatch={this.props.dispatch}
                  eventData={eventData}
                  locationSearchResults={locationSearchResults}
                  submitResponse={submitResponse}
                />
              )}
            </EditEventStyled>
          </SuperLayout>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect((state) => {
  return {
    events: state.Events,
    location: state.Location,
  }
})(EditEvent)
