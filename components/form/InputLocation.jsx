import React from "react"
import Toast from "../../modules/toast"
import Styled from "styled-components"
import { pushScript, pushStyle } from "../../modules/dom"

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
      crossorigin: "true",
      callback: () => this.renderMap()
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

  renderMap() {
    const mymap = L.map("render-map", {
      center: [20.0, 5.0],
      minZoom: 2,
      zoom: 2
    })
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      subdomains: ["a", "b", "c"]
    }).addTo(mymap)
  }

  savePositionToState(position) {
    this.setState({
      coords: position.coords
    })
  }

  render() {
    console.log("state", this.state)
    const { locationStatus } = this.state
    return (
      <InputLocation className="location-picker">
        {this.props.label}
        <br />
        {locationStatus == "granted" ? (
          <div id="render-map" />
        ) : locationStatus == "denied" ? (
          <small>:( Kamu tidak memberikan akses lokasi untuk Mau Gowes</small>
        ) : (
          <small>Mendapatkan posisi....</small>
        )}
      </InputLocation>
    )
  }
}

export default LocationPicker
