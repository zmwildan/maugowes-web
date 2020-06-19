import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
import { progressBar } from "../../modules/loaders"

// components
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import EventsBox from "../../components/boxs/EventsBox"

//actions
import { fetchEvents, fetchMoreEvents } from "../../redux/events/actions"

const EventsStyled = Styled.div`

`
const MaxResults = 20
const StoreFilter = "list"
class Events extends React.Component {
  state = {
    page: 1,
  }

  static async getInitialProps({ req, reduxStore, query }) {
    if (req) {
      const reqQuery = requestQueryGenerator(query)
      await reduxStore.dispatch(fetchEvents(StoreFilter, reqQuery))
    }

    return {
      query,
    }
  }

  state = {
    query: this.props.query,
  }

  componentDidMount() {
    progressBar.start()
    const eventState = this.props.events[StoreFilter] || {}
    this.setState(this.props.query)
    if (!eventState.status && !eventState.is_loading) {
      const reqQuery = requestQueryGenerator(this.props.query)
      this.props.dispatch(fetchEvents(StoreFilter, reqQuery))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query.show_all !== this.props.query.show_all) {
      const reqQuery = requestQueryGenerator(this.props.query)
      this.props.dispatch(fetchEvents(StoreFilter, reqQuery))
    }
  }

  _loadMoreHandler() {
    const eventState = this.props.events[StoreFilter] || {}
    if (!eventState.is_loading && eventState.status == 200) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        async () => {
          let reqQuery = {
            limit: MaxResults,
            page: this.state.page,
          }
          if (this.props.tag) reqQuery.tag = this.props.tag

          return this.props.dispatch(fetchMoreEvents(StoreFilter, reqQuery))
        }
      )
    }
  }

  render() {
    const events = this.props.events[StoreFilter] || {}

    if (events.status) progressBar.stop()

    const metadata = {
      title: "Events - Mau Gowes",
      description:
        "Dapatkan informasi seputar ajakan gowes, tour, race maupun acara apapun yang berhubungan dengan sepeda",
    }

    return (
      <GlobalLayout metadata={metadata}>
        <DefaultLayout>
          <EventsStyled>
            <Header
              title="Events - Mau Gowes"
              text={metadata.description}
              stats={{
                suffix: "events",
                total: events.total || 0,
                show:
                  events.results && events.results.length
                    ? events.results.length
                    : 0,
              }}
            />
            <EventsBox
              data={events}
              loadmoreHandler={() => this._loadmoreHandler()}
              noHeaderTitle
              maxResults={MaxResults}
              useFilter
              setState={(n, cb) => this.setState(n, cb)}
              query={this.state.query}
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
    limit: MaxResults,
    status: "accept",
    show_all: query.show_all || 0,
  }

  if (query.tag) reqQuery.tag = query.tag
  if (query.username) reqQuery.username = query.username

  return reqQuery
}

export default connect((state) => {
  return {
    events: state.Events,
  }
})(Events)
