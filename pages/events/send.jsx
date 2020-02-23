import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
// components
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import GA from "../../components/boxs/GA"
import EventForm from "../../components/form/Events/EventForm"

//modules
import Toast from "../../modules/toast"

const SendCompetitionStyled = Styled.div`
`

class SendEvent extends React.Component {
  render() {
    const metadata = {
      title: "Kirim Events - Mau Gowes",
      description:
        "Yuk sebarkan event sepeda di form ini, event akan tampil setelah mendapatkan persetujuan dari moderator"
    }
    const { status, message } = this.props.events.submit_post || {}
    if (status === 200 || status === 201) {
      Toast(true, message)
      setTimeout(() => {
        location.href = "/events"
      }, 800)
    }

    const locationSearchResults = this.props.location.search_location || {}

    return (
      <GlobalLayout metadata={metadata}>
        <DefaultLayout>
          <SendCompetitionStyled>
            <Header
              title="Events"
              text={metadata.description}
              backgroundImage="https://images.unsplash.com/photo-1558009525-29a300db7b7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
            />
            <GA adClient="ca-pub-4468477322781117" adSlot="4886894471" />

            {/* form send event */}
            <div className="grid-center">
              <div className="col-6_xs-12 super-login-wrapper">
                <EventForm
                  dispatch={this.props.dispatch}
                  locationSearchResults={locationSearchResults}
                  submitResponse={this.props.events.submit_post || {}}
                />
              </div>
            </div>
            {/* end of form send event */}

            <GA adClient="ca-pub-4468477322781117" adSlot="4886894471" />
          </SendCompetitionStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export default connect(state => {
  return {
    events: state.Events,
    location: state.Location
  }
})(SendEvent)
