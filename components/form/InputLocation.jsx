import React from "react"
import Toast from "../../modules/toast"
import Styled from "styled-components"
import InputText from "./InputText"
import { pushScript, pushStyle } from "../../modules/dom"

let MyMap = null
let Marker

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
          navigator.geolocation.getCurrentPosition(this.savePositionToState)
        } else if (result.state == "prompt") {
          navigator.geolocation.getCurrentPosition(this.savePositionToState)
        } else if (result.state == "denied") {
          Toast(
            true,
            "Kamu tidak memberikan akses lokasi untuk Mau Gowes",
            "error"
          )
        }
      })
    } else {
      Toast(true, "Browser Anda Tidak Support Geo Location", "error")
    }
  }

  renderMap(position) {
    console.log("postition", position)

    // only render map one time
    if (!MyMap) {
      // ref: https://leafletjs.com/
      // set lat, lng and zoom
      // map focus and zoom
      MyMap = L.map("render-map").setView(
        [position.coords.latitude, position.coords.longitude],
        15
      )

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(MyMap)

      // map marker
      Marker = L.marker([
        position.coords.latitude,
        position.coords.longitude
      ]).addTo(MyMap)
      // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      // .openPopup();

      // map click event
      MyMap.on("click", e => {
        this.setState({
          coords: {
            lat: e.latlng.lat,
            lng: e.latlng.lng
          }
        })

        // delete old marker
        MyMap.removeLayer(Marker)
        Marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(MyMap)
      })
    } else {
      this.setState({
        locationStatus: "Browser Anda Tidak Support Geo Location"
      })
    }
  }

  savePositionToState(position) {
    this.setState(
      {
        coords: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      },
      () => {
        this.props.setState({ coords: this.state.coords })
        setTimeout(() => this.renderMap(position), 1500)
      }
    )
  }

  render() {
    const { locationStatus } = this.state
    return (
      <InputLocation className="location-picker">
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

        {locationStatus == "granted" ? (
          <div id="render-map" />
        ) : locationStatus == "denied" ? (
          <small>:( Kamu tidak memberikan akses lokasi untuk Mau Gowes</small>
        ) : (
          <small>{locationStatus || "Mendapatkan posisi...."}</small>
        )}
      </InputLocation>
    )
  }
}

export default LocationPicker
