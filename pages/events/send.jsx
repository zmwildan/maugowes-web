import Styled from "styled-components"
import { connect } from "react-redux"
import dynamic from "next/dynamic"

//modules
import Toast from "../../modules/toast"

// components
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import GA from "../../components/boxs/GA"

// dynamic compoent
const EventForm = dynamic(() =>
  import("../../components/form/Events/EventForm")
)

const Breadcrumb = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/events",
    title: "Events",
  },
  {
    link: "/events/send",
    title: "Kirim Event Sepeda",
  },
]

const SendCompetitionStyled = Styled.div`
`

const SendEvent = (props) => {
  const metadata = {
    title: "Kirim Event Sepeda",
    description: "Sebarkan event sepeda kamu lewat Mau Gowes",
  }
  const { status, message } = props.events.submit_post || {}
  if (status === 200 || status === 201) {
    Toast(true, message)
    setTimeout(() => {
      location.href = "/events"
    }, 800)
  }
  const locationSearchResults = props.location.search_location || {}

  return (
    <GlobalLayout metadata={metadata}>
      <DefaultLayout>
        <SendCompetitionStyled>
          <Header
            breadcrumb={Breadcrumb}
            title={metadata.title}
            text={metadata.description}
          />
          <GA adClient="ca-pub-4468477322781117" adSlot="4886894471" />

          {/* form send event */}
          <div className="grid-center">
            <div className="col-6_xs-12 super-login-wrapper">
              <EventForm
                dispatch={props.dispatch}
                locationSearchResults={locationSearchResults}
                submitResponse={props.events.submit_post || {}}
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

export default connect((state) => {
  return {
    events: state.Events,
    location: state.Location,
  }
})(SendEvent)
