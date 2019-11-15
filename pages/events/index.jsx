import React from "react"
import Styled from "styled-components"

// components
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import GA from "../../components/boxs/GA"
import EventsBox from "../../components/boxs/EventsBox"

const EventsStyled = Styled.div`

`
const MaxResults = 6
class Events extends React.Component {
  loadMoreHandler() {}

  render() {
    const metadata = {
      title: "Events - Mau Gowes",
      description:
        "Di halaman events ini kamu bisa mendapatkan informasi seputar ajakan gowes, tour, race maupun acara apapun yang berhubungan dengan sepeda"
    }

    return (
      <GlobalLayout metadata={metadata}>
        <DefaultLayout>
          <EventsStyled>
            <Header
              title="Kirim Events"
              text={metadata.description}
              backgroundImage="https://images.unsplash.com/photo-1558009525-29a300db7b7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
            />
            <GA adClient="ca-pub-4468477322781117" adSlot="4886894471" />
            <EventsBox
              noHeaderTitle
              loadmoreHandler={() => this.loadmoreHandler()}
            />
          </EventsStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

export function requestQueryGenerator(query = {}) {
  let reqQuery = {
    page: 1,
    limit: MaxResults
  }

  if (query.tag) reqQuery.tag = query.tag
  if (query.username) reqQuery.username = query.username

  return reqQuery
}

export default Events
