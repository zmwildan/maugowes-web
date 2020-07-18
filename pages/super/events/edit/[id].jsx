import React, { useEffect } from "react"
import Router from "next/router"
import Styled from "styled-components"
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

const EditEvent = ({ events, id, location, dispatch }) => {
  const title = "Edit Event"
  const eventData = events[id] || {}
  const submitResponse = events.submit_post || {}
  const { status, message } = events.submit_post || {}
  const locationSearchResults = location.search_location || {}

  useEffect(() => {
    if (status === 200 || status === 201) {
      Toast(true, message)
      Router.push(`/super/events/detail/${id}`)
    }
  }, [events])

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
                dispatch={dispatch}
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

EditEvent.getInitialProps = async ({ reduxStore, query }) => {
  const { id } = query
  await reduxStore.dispatch(fetchEventDetail(id))

  return { id }
}

export default connect((state) => {
  return {
    events: state.Events,
    location: state.Location,
  }
})(EditEvent)
