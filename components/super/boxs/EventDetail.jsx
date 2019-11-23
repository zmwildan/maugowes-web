// components
import Style from 'styled-components'
import InputLocation from '../../form/InputLocation'
import DayJs from '../../../modules/dayjs'
import Button from '../../buttons'
const EventDetailStyle = Style.div`
	.text-bold{
		font-weight: bold;
	}
	.d-flex{
		display: flex;
	}
`
export default props => {
  const { eventData } = props
  console.log(eventData)

  return (
    <EventDetailStyle>
      <div className="grid">
        <div className="col-3 text-bold">Title</div>
        <div className="col-9">{eventData.title}</div>
      </div>
      <div className="grid">
        <div className="col-3 text-bold">Status</div>
        <div className="col-9">{eventData.status}</div>
      </div>
      <div className="grid">
        <div className="col-3 text-bold">Note</div>
        <div className="col-9">
          <article dangerouslySetInnerHTML={{ __html: eventData.note }} />
        </div>
      </div>
      <div className="grid">
        <div className="col-3 text-bold">Event Date</div>
        <div className="col-9">
          {DayJs(eventData.start_time * 1000).format('DD MMMM YYYY HH:mm')}
        </div>
      </div>
      <div className="grid">
        <div className="col-3 text-bold">Event Link</div>
        <div className="col-9">
          {eventData.event_link ? (
            <a href={eventData.event_link} target="_blank">
              {eventData.event_link}
            </a>
          ) : (
            '-'
          )}
        </div>
      </div>
      <div className="grid">
        <div className="col-3 text-bold">Event Location</div>
        <div className="col-9">{eventData.location.address}</div>
      </div>
      <div className="grid">
        <div className="col-3 text-bold">Map</div>
        <div className="col-9">
          <InputLocation readOnly coordinate={eventData.location.coordinate} />
        </div>
      </div>
      <div className="d-flex">
        <Button text="Accept" style={{ marginRight: 10 }}></Button>
        <Button text="Reject" color="white"></Button>
      </div>
    </EventDetailStyle>
  )
}
