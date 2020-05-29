import React from "react"
import { stateValidatorChecker } from "../../../modules/validator"

// redux
import { createEvent, updateEvent } from "../../../redux/events/actions"

// components
import FormStyled from "../FormStyled"
import InputText from "../InputText"
import Textarea from "../Textarea"
import InputFile from "../InputFile"
import InputLocation from "../InputLocation"
import InputDateTime from "../InputDateTime"
import Submit from "../Submit"

class EventForm extends React.Component {
  constructor(props) {
    super(props)

    let initialState = {
      event_time: new Date(),
    }

    const { eventData } = props
    if (eventData) {
      initialState = {
        email: eventData.email,
        title: eventData.title,
        link: eventData.event_link,
        address: eventData.location.address || "",
        note: eventData.note || "",
        coords: eventData.location.coordinate || {},
        poster_preview: eventData.poster[600],
        event_time: eventData.start_time,
      }
    }

    this.state = initialState
  }

  submitHandler() {
    const { is_valid } = stateValidatorChecker({
      setState: (ns, cb) => this.setState(ns, cb),
      state: this.state,
      requiredInputs: ["email", "title", "link"],
    })
    const { eventData } = this.props

    if (is_valid) {
      let params = {
        email: this.state.email,
        title: this.state.title,
        link: this.state.link,
        start_time:
          typeof this.state.event_time == "number"
            ? this.state.event_time
            : this.state.event_time.getTime(),
      }

      if (this.state.poster) params.poster = this.state.poster
      if (this.state.address) params.location_address = this.state.address
      if (this.state.coords)
        params.location_coordinate = JSON.stringify(this.state.coords)
      if (this.state.note) params.note = this.state.note
      if (this.state.gpx) params.gpx = this.state.gpx

      // console.log("send events", params)
      if (eventData && eventData.id) {
        // update event
        console.log("updating event...", params)
        this.props.dispatch(updateEvent(params, eventData.id))
      } else {
        // create new event
        console.log("creating event...", params)
        this.props.dispatch(createEvent(params))
      }
    }
  }

  render() {
    const { eventData } = this.props
    const { status, is_loading } = this.props.submitResponse || {}
    return (
      <FormStyled>
        <h2>Data Kamu (kami akan menjaga kerahasiaan data ini)</h2>
        <InputText
          label="Email kamu (untuk pemberitahuan status event ini)"
          type="email"
          value={this.state.email || ""}
          validate={this.state.email_validate || {}}
          setState={(ns, cb) => this.setState(ns, cb)}
          name="email"
          required
        />

        <h2>Tentang Event Gowes</h2>
        <InputFile
          label="Poster Event Gowes"
          name="poster"
          id="input-poster"
          value={this.state.poster || ""}
          validate={this.state.poster_validate || {}}
          preview={this.state.poster_preview}
          setState={(n, cb) => this.setState(n, cb)}
          accept="image/*"
        />
        <InputText
          label="Judul Event Gowes"
          type="text"
          value={this.state.title || ""}
          validate={this.state.title_validate || {}}
          setState={(ns, cb) => this.setState(ns, cb)}
          name="title"
          required
        />
        <InputDateTime
          label="Waktu Event Gowes"
          name="event_time"
          defaultValue={this.state.event_time}
          setState={(ns, cb) => this.setState(ns, cb)}
          required
        />
        <InputLocation
          address={this.state.address}
          coordinate={this.state.coords}
          dispatch={this.props.dispatch}
          searchResults={this.props.locationSearchResults || {}}
          name="location"
          label="Lokasi Start / Meetpoint Gowes"
          setState={(n, cb) => this.setState(n, cb)}
        />
        <InputFile
          label="Upload GPX untuk menampilkan rute"
          name="gpx"
          max={5000000}
          value={this.state.gpx || ""}
          validate={this.state.gpx_validate || {}}
          setState={(n, cb) => this.setState(n, cb)}
          accept="*.gpx"
        />
        <InputText
          label="Link website / sosial media"
          type="url"
          value={this.state.link || ""}
          validate={this.state.link_validate || {}}
          setState={(ns, cb) => this.setState(ns, cb)}
          name="link"
          required
        />
        <Textarea
          label="Catatan untuk peserta"
          type="text"
          value={this.state.note || ""}
          validate={this.state.note_validate || {}}
          setState={(ns, cb) => this.setState(ns, cb)}
          name="note"
        />
        <Submit
          onClick={() => this.submitHandler()}
          loading={is_loading || status == 200 || status == 201}
          text={eventData && eventData.id ? "Update Event" : "Kirim Event"}
        />
      </FormStyled>
    )
  }
}

export default EventForm
