import React from "react"
import Toast from "../../modules/toast"
import Styled from "styled-components"
import { pushScript, pushStyle } from "../../modules/dom"
import PropTypes from "prop-types"

// components
import InputText from "./InputText"

// redux
import { searchLocation, resetLocation } from "../../redux/location/actions"

// default focus coordinat if user not give location access
// monas Jakarta
const DEFAULT_LOCATION = {
  lat: -6.1754,
  lng: 106.8272
}

let MyMap = null
let MarkerLayer

const InputLocation = Styled.div`
position: relative;
margin-bottom: 20px;
#render-map {
  height: 400px;
}
.location-recomendation  {
  top: 69px;
  position: absolute;
  width: 100%;
  z-index: 1001;
  background: #fffc;
  font-size: 14px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: 10px 5px;
      border-bottom: 1px solid #cccccc;
    }
  }
}
`

let reqSearchTimeout = null

class LocationPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationStatus: null,
      coords: null,
      onSearchTyping: false,
      searchResults: {}
    }
    this.savePositionToState = this.savePositionToState.bind(this)
  }

  componentDidMount() {
    const { readOnly, coordinate } = this.props
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

    if (readOnly) {
      setTimeout(
        () =>
          this.renderMap({
            lat: coordinate.lat,
            lng: coordinate.lng || coordinate.lon,
            readOnly
          }),
        1000
      )
    } else {
      this.getLocation()
    }
  }

  componentDidUpdate() {
    const { searchResults } = this.props
    if (searchResults.status) {
      this.props.dispatch(resetLocation("search_location"))
      this.setState({ searchResults, onSearchTyping: false })
    }
  }

  getLocation() {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then(result => {
        // get location status
        this.setState({ locationStatus: result.state })
        if (result.state == "granted") {
          navigator.geolocation.getCurrentPosition(position =>
            this.savePositionToState({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            })
          )
        } else if (result.state == "prompt") {
          navigator.geolocation.getCurrentPosition(
            position =>
              this.savePositionToState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }),
            () => {
              // location denied
              this.savePositionToState(DEFAULT_LOCATION)
            }
          )
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

  _searchLocationHandler(e) {
    clearTimeout(reqSearchTimeout)
    const { value } = e.target
    this.setState(
      { onSearchTyping: value.trim() != "", searchResults: {} },
      () => {
        if (value) {
          reqSearchTimeout = setTimeout(() => {
            this.props.dispatch(
              searchLocation({
                query: {
                  q: value
                }
              })
            )
          }, 1000)
        }
      }
    )
  }

  _clickSearchLocationHandler(locationData) {
    // reset search location state

    this.setState(
      {
        searchResults: {},
        onSearchTyping: false,
        address: locationData.display_name
      },
      () => {
        // set parrent address
        this.props.setState({
          address: locationData.display_name
        })

        // change map focus
        const coords = {
          lat: locationData.lat,
          lng: locationData.lon
        }
        this.savePositionToState(coords)
      }
    )
  }

  renderMap({ lat, lng, readOnly = false }) {
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
      if (!readOnly) {
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
              this.props.setState({
                coords: {
                  lat,
                  lng
                }
              })
              this.renderMarker({ lat, lng })
            }
          )
        })
      }
    } else {
      MyMap.setView([lat, lng])
      this.renderMarker({ lat, lng })
    }
  }

  renderMarker({ lat, lng }) {
    if (MarkerLayer) MyMap.removeLayer(MarkerLayer)

    return (MarkerLayer = L.marker([lat, lng]).addTo(MyMap))
  }

  savePositionToState(coords) {
    this.setState(
      {
        coords
      },
      () => {
        this.props.setState({ coords })
        setTimeout(() => this.renderMap(coords), MyMap ? 0 : 1500)
      }
    )
  }

  render() {
    const { onSearchTyping, searchResults } = this.state
    const { readOnly } = this.props
    return (
      <InputLocation className="location-picker form-child">
        {readOnly ? null : (
          <React.Fragment>
            <label
              htmlFor="render"
              style={{ marginBottom: 10, display: "block" }}>
              {this.props.label}
            </label>

            <InputText
              name="address"
              containerStyle={{ marginBottom: 10 }}
              placeholder="Masukan alamat disini"
              type="text"
              value={this.state.address || ""}
              onChange={e => this._searchLocationHandler(e)}
              setState={(n, cb) => {
                this.setState(n, cb)
                this.props.setState(n, cb)
              }}
            />

            {onSearchTyping || searchResults.status ? (
              <div className="location-recomendation">
                <ul>
                  {onSearchTyping || !searchResults.status ? (
                    <li>Mencari lokasi...</li>
                  ) : (
                    <React.Fragment>
                      {searchResults.status == 200 &&
                      searchResults.results.length > 0 ? (
                        searchResults.results.map((n, key) => {
                          return (
                            <li key={key}>
                              <a
                                href="javascript:;"
                                onClick={() =>
                                  this._clickSearchLocationHandler(n)
                                }>
                                {n.display_name}
                              </a>
                            </li>
                          )
                        })
                      ) : (
                        <li>
                          {searchResults.message || "Lokasi tidak ditemukan"}
                        </li>
                      )}
                      <li>
                        <a
                          style={{ color: "#d91421" }}
                          href="javascript:;"
                          onClick={() => {
                            // force hide recomendation
                            this.setState({
                              onSearchTyping: "",
                              searchResults: {}
                            })
                          }}>
                          (x) Sembunyikan rekomendasi
                        </a>
                      </li>
                    </React.Fragment>
                  )}
                </ul>
              </div>
            ) : null}
          </React.Fragment>
        )}

        <div id="render-map" />
      </InputLocation>
    )
  }
}

LocationPicker.propTypes = {
  searchResults: PropTypes.object,
  readOnly: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

LocationPicker.defaultProps = {
  readOnly: false,
  searchResults: {},
  dispatch: () => {}
}

export default LocationPicker
