import React from "react"
import { connect } from "react-redux"
import Style from "styled-components"

//actions
import { setStatus } from "../../../redux/events/actions"
// components
import InputLocation from "../../form/InputLocation"
import DayJs from "../../../modules/dayjs"
import Button from "../../buttons"
import Label from "../../labels"
const EventDetailStyle = Style.div`
	.text-bold{
		font-weight: bold;
	}
	.d-flex{
		display: flex;
  }
  
  .mb-25{
    margin-bottom: 25px;
  }
`
class EventDetail extends React.Component {
  componentDidUpdate(prevProps) {
    const { formResponse, eventData } = this.props
    if (formResponse.status === 200 || formResponse.status === 201) {
      location.href = `/super/events/detail/${eventData.id}`
    }
  }
  handleClick = status => {
    let note = ""
    if (status === "reject") {
      const prompt = window.prompt("Alasan ditolak")
      if (prompt !== null) {
        note = prompt
      }
    }
    const formData = {
      status,
      note
    }
    this.props.dispatch(setStatus(this.props.eventData.id, formData))
  }
  render() {
    const { eventData } = this.props
    return (
      <EventDetailStyle>
        <div className="grid mb-25">
          <div className="col-3 text-bold">Title</div>
          <div className="col-9">{eventData.title}</div>
        </div>
        <div className="grid mb-25">
          <div className="col-3 text-bold">Status</div>
          <div className="col-9">
            <Label status={eventData.event_status} />
          </div>
        </div>
        <div className="grid mb-25">
          <div className="col-3 text-bold">Note</div>
          <div className="col-9">{eventData.note || "-"}</div>
        </div>
        <div className="grid mb-25">
          <div className="col-3 text-bold">Event Date</div>
          <div className="col-9">
            {DayJs(eventData.start_time).format("DD MMMM YYYY HH:mm")}
          </div>
        </div>
        <div className="grid mb-25">
          <div className="col-3 text-bold">Event Link</div>
          <div className="col-9">
            {eventData.event_link ? (
              <a href={eventData.event_link} target="_blank">
                {eventData.event_link}
              </a>
            ) : (
              "-"
            )}
          </div>
        </div>
        <div className="grid mb-25">
          <div className="col-3 text-bold">Event Location</div>
          <div className="col-9">{eventData.location.address || "-"}</div>
        </div>
        <div className="grid mb-25">
          <div className="col-3 text-bold">Map</div>
          <div className="col-9">
            <InputLocation
              readOnly
              coordinate={eventData.location.coordinate}
            />
            <a
              href={`https://maps.google.com/maps?q=${eventData.location.coordinate.lat},${eventData.location.coordinate.lng}`}
              target="_blank"
              rel="noopener noreferer">
              Lihat di Google Maps
            </a>
          </div>
        </div>
        {eventData.event_status === "waiting" ? (
          <div className="grid">
            <div className="col-9 d-flex" data-push-left="off-3">
              <Button
                text="Accept"
                style={{ marginRight: 10 }}
                onClick={() => this.handleClick("accept")}
              />
              <Button
                text="Reject"
                color="white"
                onClick={() => this.handleClick("reject")}
              />
            </div>
          </div>
        ) : null}
      </EventDetailStyle>
    )
  }
}
export default connect(state => {
  return {}
})(EventDetail)
