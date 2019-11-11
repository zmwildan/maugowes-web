import React from "react"
import Toast from "../../modules/toast"
import Styled from "styled-components"
import InputText from "./InputText"
import { pushScript, pushStyle } from "../../modules/dom"

// default focus coordinat if user not give location access
// monas Jakarta
const DEFAULT_LOCATION = {
  lat: -6.1754,
  lng: 106.8272
}

let MyMap = null
let MarkerLayer

const InputLocation = Styled.div`
margin-bottom: 20px;
#render-map {
  height: 400px;
}
`

class LocationPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationStatus: null,
      coords: null
    }
    this.savePositionToState = this.savePositionToState.bind(this)
  }

  componentDidMount() {
    pushStyle("https://unpkg.com/leaflet@1.5.1/dist/leaflet.css", {
      integrity:
        "sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==",
      crossorigin: "true"
    })

    pushScript("https://unpkg.com/leaflet@1.5.1/dist/leaflet.js", {
      integrity:
        "sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==",
      crossorigin: "true"
    })

    this.getLocation()
  }

  getLocation() {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then(result => {
        // get location status
        this.setState({ locationStatus: result.state })
        if (result.state == "granted") {
          navigator.geolocation.getCurrentPosition(position => this.savePositionToState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }))
        } else if (result.state == "prompt") {
          
          navigator.geolocation.getCurrentPosition(position => this.savePositionToState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }), () => {
            // location denied
            this.savePositionToState(DEFAULT_LOCATION)
          })
        } else if (result.state == "denied") {
          Toast(
            true,
            "Kamu tidak memberikan akses lokasi untuk Mau Gowes",
            "error"
          )
          this.savePositionToState(DEFAULT_LOCATION)
        }
      })
    } else {
      Toast(true, "Browser Anda Tidak Support Geo Location", "error")
      // save position on old browser
      this.savePositionToState(DEFAULT_LOCATION)
    }
  }

  renderMap({ lat, lng }) {
    console.log("rendering map", { lat, lng })

    // only render map one time
    if (!MyMap) {
      // ref: https://leafletjs.com/
      // set lat, lng and zoom
      // map focus and zoom
      MyMap = L.map("render-map", {
        scrollWheelZoom: false
      }).setView([lat, lng], 17)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(MyMap)

      // render marker
      this.renderMarker({ lat, lng })

      // click event listener
      MyMap.on("click", e => {
        const lat = e.latlng.lat
        const lng = e.latlng.lng

        this.setState(
          {
            coords: {
              lat,
              lng
            }
          },
          () => {
            // render marker
            this.renderMarker({ lat, lng })
          }
        )
      })
      
    } else {
      MyMap.setView([lat, lng])
    }
  }

  renderMarker({lat, lng}) {
    if (MarkerLayer) MyMap.removeLayer(MarkerLayer)

    return MarkerLayer = L.marker([lat, lng]).addTo(MyMap)
  }

  savePositionToState(coords) {
    this.setState(
      {
        coords
      },
      () => {
        this.props.setState({ coords })
        setTimeout(() => this.renderMap(coords), 1500)
      }
    )
  }

  render() {
    const { locationStatus } = this.state
    return (
      <InputLocation className="location-picker form-child">
        <label htmlFor="render" style={{ marginBottom: 10, display: "block" }}>
          {this.props.label}
        </label>

        <InputText
          name="address"
          containerStyle={{ marginBottom: 10 }}
          placeholder="Masukan alamat disini"
          type="text"
          value={this.state.address || ""}
          setState={(n, cb) => {
            this.setState(n, cb)
            this.props.setState(n, cb)
          }}
        />

        <div id="render-map" />
        
      </InputLocation>
    )
  }
}

export default LocationPicker
