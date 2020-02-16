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

const InputLocation = Styled.div`
position: relative;
margin-bottom: 20px;
.render-map {
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
    this.Markers = []
    this.MyMap = null
    this.MarkerLayer = null
    this.state = {
      locationStatus: null,
      coords: null,
      onSearchTyping: false,
      searchResults: {}
    }
    this.savePositionToState = this.savePositionToState.bind(this)
    this.renderMap = this._renderMap.bind(this)
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
          this._renderMap({
            lat: coordinate.lat,
            lng: coordinate.lng || coordinate.lon,
            readOnly
          }),
        1500
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

  componentWillUnmount() {
    // reset this.MyMap initial
    this.MyMap = null
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

  _renderMap({ lat, lng, readOnly = false }) {
    // only render map one time
    if (!this.MyMap) {
      // ref: https://leafletjs.com/
      // set lat, lng and zoom
      // map focus and zoom
      this.MyMap = L.map(this.props.name || "render-map", {
        scrollWheelZoom: false
      }).setView([lat, lng], 17)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.MyMap)

      // render geo json (if available)
      if (this.props.geoJSON) {
        this._renderGeoJSON(this.props.geoJSON)
      } else {
        // render marker
        this.renderMarker({ lat, lng })
      }

      // render markers from props
      if (this.props.markers) {
        this._renderMarkers(this.props.markers)
      }

      // click event listener
      if (!readOnly) {
        this.MyMap.on("click", e => {
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
      this.MyMap.setView([lat, lng])
      if (this.props.geoJSON) {
        // render geo json (if available)
        this._renderGeoJSON(geoJSON)
      } else {
        // default render marker
        this.renderMarker({ lat, lng })
      }
    }
  }

  renderMarker({ lat, lng }) {
    if (this.MarkerLayer) this.MyMap.removeLayer(this.MarkerLayer)

    return (this.MarkerLayer = L.marker([lat, lng]).addTo(this.MyMap))
  }

  _renderGeoJSON(geoJSONData) {
    this.geoJSON = L.geoJSON(geoJSONData).addTo(this.MyMap)

    // focus map to the geoJSON bounds
    // ref: https://stackoverflow.com/a/33261633
    const bounds = this.geoJSON.getBounds()
    this.MyMap.fitBounds(bounds)

    // add start and finish marker
    // const lineString = geoJSONData.features[0].geometry.coordinates
  }

  _renderMarkers(markerData = []) {
    markerData.map((n, key) => {
      const marker = L.marker([n.coordinate.lat, n.coordinate.lng]).addTo(
        this.MyMap
      )
      if (key == 0) marker.bindPopup(n.name).openPopup()
      else marker.bindPopup(n.name)
      this.Markers.push(marker)
    })
  }

  savePositionToState(coords) {
    this.setState(
      {
        coords
      },
      () => {
        this.props.setState({ coords })
        setTimeout(() => this._renderMap(coords), this.MyMap ? 0 : 1500)
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

        <div className="render-map" id={this.props.name || "render-map"} />
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
