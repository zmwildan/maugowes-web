import React from 'react'
import Styled from 'styled-components'
import { connect } from 'react-redux'
import config from '../../config/index'
import fetch from 'isomorphic-unfetch'
import { objToQuery } from 'string-manager'

// components
import GlobalLayout from '../../components/layouts/Global'
import DefaultLayout from '../../components/layouts/Default'
import Header from '../../components/boxs/FullWidthHeader'
import GA from '../../components/boxs/GA'
import EventsBox from '../../components/boxs/EventsBox'

//actions
import { fetchEvents, fetchMoreEvents } from '../../redux/events/actions'

const EventsStyled = Styled.div`

`
const MaxResults = 6
const StoreFilter = 'list'
class Events extends React.Component {
  state = {
    page: 1
  }

  static async getInitialProps({ reduxStore, query }) {
    if (typeof window == 'undefined') {
      //  only call in server side
      const { endpoint, type } = fetchEvents()['CALL_API']
      const reqQuery = requestQueryGenerator(query)
      const postsResponse = await fetch(
        `${config[process.env.NODE_ENV].host}${endpoint}?${objToQuery(
          reqQuery
        )}`
      )
      const posts = await postsResponse.json()

      reduxStore.dispatch({
        type,
        filter: StoreFilter,
        data: posts
      })
    }

    return {
      tag: query.tag || '',
      username: query.username,
      query
    }
  }

  componentDidMount() {
    const eventState = this.props.events[StoreFilter] || {}
    if (!eventState.status && !eventState.is_loading) {
      const reqQuery = requestQueryGenerator(this.props.query)
      this.props.dispatch(fetchEvents(StoreFilter, reqQuery))
    }
  }

  loadMoreHandler() {
    const eventState = this.props.events[StoreFilter] || {}
    if (!eventState.is_loading && eventState.status == 200) {
      this.setState(
        {
          page: this.state.page + 1
        },
        async () => {
          let reqQuery = {
            limit: MaxResults,
            page: this.state.page
          }
          if (this.props.tag) reqQuery.tag = this.props.tag

          return this.props.dispatch(fetchMoreEvents(StoreFilter, reqQuery))
        }
      )
    }
  }

  render() {
    const events = this.props.events[StoreFilter] || {}
    const metadata = {
      title: 'Events - Mau Gowes',
      description:
        'Di halaman events ini kamu bisa mendapatkan informasi seputar ajakan gowes, tour, race maupun acara apapun yang berhubungan dengan sepeda'
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
              data={events}
              loadmoreHandler={() => this.loadmoreHandler()}
              noHeaderTitle
              maxResults={MaxResults}
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
    status: 'accept'
  }

  if (query.tag) reqQuery.tag = query.tag
  if (query.username) reqQuery.username = query.username

  return reqQuery
}

export default connect(state => {
  return {
    events: state.Events
  }
})(Events)
