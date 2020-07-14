import { stateValidatorChecker } from "../../modules/validator"

// redux
import {
  createBike,
  updateBike,
  updateBikeSpecsRelation,
  deleteBikeSpecsRelation,
} from "../../redux/bikes/actions"

// components
import InputText, { InputTextStyled } from "./InputText"
import Select, { SelectStyled } from "./Select"
import Submit from "./Submit"
import Button from "../buttons/index"
import FormStyled from "./FormStyled"

let isInitial = true

class BikeForm extends React.Component {
  state = {
    images: [],
    specs: [],
    specsName: [],
  }

  componentDidMount() {
    const { bikes, id } = this.props
    if (id && bikes[id]) {
      // convert bike detail to state
      const bikeData = bikes[id]
      let nextState = {
        name: bikeData.name,
        brand: bikeData.brand.id,
        type: bikeData.type.id,
        release_date: bikeData.release_date,
        estimated_price: bikeData.estimated_price,
        geometry: bikeData.geometry,
        source: bikeData.source,
        specs: [],
      }

      // convert bike images to state
      if (bikeData.images && bikeData.images.length > 0) {
        nextState.images = bikeData.images
      }

      this.setState(nextState)
    }
  }

  componentDidUpdate() {
    const { id, bikes } = this.props
    const bikeData = bikes[id]

    // create specs state
    if (bikeData && bikeData.specs && isInitial) {
      isInitial = false
      let specs = []
      const groupSpecKey = Object.keys(bikeData.specs)
      if (groupSpecKey && groupSpecKey.length > 0) {
        groupSpecKey.map((n, key) => {
          if (bikeData.specs[n]) {
            bikeData.specs[n].map((m) => {
              specs.push({
                spec_id: m.id,
                description: m.description,
              })
            })
          }

          if (key == groupSpecKey.length - 1) {
            this.setState({ specs })
          }
        })
      }
    }

    // convert bike group specs to state
    let { specsName } = this.state
    const groupSpecsData = this.props.bikes.group_specs || {}
    if (specsName.length == 0 && id && groupSpecsData.status == 200) {
      console.log("group_sepcs", groupSpecsData)
      groupSpecsData.results.map((n, key) => {
        if (n.specs) {
          n.specs.map((m) => {
            specsName.push({
              id: m.id,
              name: m.name,
            })

            if (key == groupSpecsData.results.length - 1) {
              this.setState({ specsName })
            }
          })
        }
      })
    }
  }

  submitHandler() {
    let requiredInputs = [
      "name",
      "brand",
      "type",
      "release_date",
      "estimated_price",
      "geometry",
      "source",
    ]
    const { id } = this.props
    const { is_valid } = stateValidatorChecker({
      setState: (ns, cb) => this.setState(ns, cb),
      state: this.state,
      requiredInputs,
    })

    if (is_valid) {
      let formdata = {
        name: this.state.name,
        brand_id: this.state.brand,
        type_id: this.state.type,
        release_date: this.state.release_date,
        estimated_price: this.state.estimated_price,
        geometry: this.state.geometry,
        images: JSON.stringify(this.state.images),
        source: this.state.source,
      }
      console.log("formdata", formdata)

      if (id) {
        // submit update bike
        this.props.dispatch(updateBike(formdata, id))
      } else {
        // submit create a new bike
        this.props.dispatch(createBike(formdata))
      }
    }
  }

  componentWillReceiveProps(np) {
    const formResponse = this.props.bikes.submit_bike || {}
    if (formResponse.status == 200 || formResponse.status == 201) {
      location.href = "/super/bikes"
    }
  }

  render() {
    const { id } = this.props
    const bikeTypes = this.props.bikes.bike_types || {}
    const bikeBrands = this.props.bikes.bike_brands || {}
    const bikeResponse = this.props.bikes.submit_bike || {}
    return (
      <FormStyled method="post" action="javascript:;">
        <h2>Bike Description</h2>

        {/* bike name */}
        <InputText
          label="Bike Name"
          placeholder="sample : Pinarello F12 Disc Brakes"
          name="name"
          type="text"
          value={this.state.name || ""}
          validate={this.state.name_validate || {}}
          setState={(n, cb) => this.setState(n, cb)}
          required
        />
        {/* end of bike name */}

        {/* select bike brands */}
        {bikeBrands.status == 200 ? (
          <Select
            label="Brand"
            name="brand"
            value={this.state.brand || ""}
            placeholder="Choose bike brands"
            options={bikeBrands.results.map((n) => {
              return {
                text: n.name,
                value: n.id,
              }
            })}
            validate={this.state.brand_validate || {}}
            setState={(n, cb) => this.setState(n, cb)}
            required
          />
        ) : (
          <div className="m-t-b-30">
            <small>Fetching bike types...</small>
          </div>
        )}
        {/* end of select brands */}

        {/* select bike types */}
        {bikeTypes.status == 200 ? (
          <Select
            label="Type"
            name="type"
            value={this.state.type || ""}
            placeholder="Choose bike types"
            options={bikeTypes.results.map((n) => {
              return {
                text: n.name,
                value: n.id,
              }
            })}
            validate={this.state.type_validate || {}}
            setState={(n, cb) => this.setState(n, cb)}
            required
          />
        ) : (
          <div className="m-t-b-30">
            <small>Fetching bike types...</small>
          </div>
        )}
        {/* end of select types */}

        {/* bike released date */}
        <InputText
          label="Release Date (tulis dalam string)"
          placeholder="sample: 20 Desember 2020"
          name="release_date"
          type="text"
          value={this.state.release_date || ""}
          validate={this.state.release_date_validate || {}}
          setState={(n, cb) => this.setState(n, cb)}
          required
        />
        {/* end of bike released date */}

        {/* bike estimated price */}
        <InputText
          label="Estimated Price (number only)"
          placeholder="sample: 100000000"
          name="estimated_price"
          type="number"
          value={this.state.estimated_price || ""}
          validate={this.state.estimated_price || {}}
          setState={(n, cb) => this.setState(n, cb)}
          required
        />
        {/* end of bike estimated price */}

        <h2>Bike Images (Max 4)</h2>
        {/* input images */}
        {this.state.images.map((n, key) => {
          return (
            <InputText
              containerStyle={
                key == this.state.images.length - 1 ? { marginBottom: 20 } : {}
              }
              key={key}
              label="Image Url"
              placeholder="sample: https://image.url"
              name={`image_${key}`}
              type="text"
              value={this.state.images[key] || ""}
              setState={(n, cb) => {
                let { images } = this.state
                images[key] = n[`image_${key}`]
                this.setState({ images })
              }}
            />
          )
        })}
        {this.state.images.length < 4 ? (
          <Button
            size="small"
            color="white"
            type="button"
            onClick={() => {
              let { images } = this.state
              images.push("")
              this.setState({ images })
            }}
            text="+ Add Image"
          />
        ) : null}
        <div style={{ marginBottom: 50 }} />
        {/* end of input images */}

        <h2>Bike Geometry</h2>
        {/* input geometry */}
        <InputText
          label="Geometry URL"
          placeholder="sample : https://image.url"
          name="geometry"
          type="text"
          value={this.state.geometry || ""}
          validate={this.state.geometry_validate || {}}
          setState={(n, cb) => this.setState(n, cb)}
          required
        />
        {/* end of input geometry */}

        {/* bike source link */}
        <InputText
          label="Link Source"
          placeholder="sample : https://source.com/path"
          name="source"
          type="text"
          value={this.state.source || ""}
          validate={this.state.source_validate || {}}
          setState={(n, cb) => this.setState(n, cb)}
          required
        />
        {/* end of bike source link */}

        {id ? (
          this.state.specsName.length > 0 ? (
            <React.Fragment>
              <h2>Bike Specs</h2>
              {this.state.specs.map((n, key) => {
                return (
                  <div key={key} className="grid">
                    <div className="col-4">
                      <SelectStyled>
                        <select
                          name={`spec_name_${key}`}
                          value={this.state.specs[key].spec_id || ""}
                          onChange={(e) => {
                            let { specs } = this.state
                            specs[key].spec_id = e.target.value
                            this.setState({ specs })
                          }}>
                          <option value="">-- Choose spec</option>
                          {this.state.specsName.map((n) => {
                            return (
                              <option key={n.id} value={n.id}>
                                {n.name}
                              </option>
                            )
                          })}
                        </select>
                      </SelectStyled>
                    </div>
                    <div className="col-3">
                      <InputTextStyled>
                        <input
                          name={`spec_value_${key}`}
                          type="text"
                          value={this.state.specs[key].description || ""}
                          onChange={(e) => {
                            let { specs } = this.state
                            specs[key].description = e.target.value
                            this.setState({ specs })
                          }}
                        />
                      </InputTextStyled>
                    </div>
                    <div className="col-5">
                      <Button
                        size="small"
                        isDisabled={
                          !this.state.specs[key].spec_id ||
                          !this.state.specs[key].description
                        }
                        color="white"
                        type="button"
                        onClick={() => {
                          console.log("saving spec...")
                          this.props.dispatch(
                            updateBikeSpecsRelation({
                              bike_id: id,
                              spec_id: this.state.specs[key].spec_id,
                              description: this.state.specs[key].description,
                            })
                          )
                        }}
                        containerStyle={{
                          marginRight: 10,
                          display: "inline-block",
                        }}
                        text="Save"
                      />
                      <Button
                        size="small"
                        isDisabled={
                          !this.state.specs[key].spec_id ||
                          !this.state.specs[key].description
                        }
                        color="red"
                        type="button"
                        onClick={() => {
                          console.log("deleting spec...")
                          let { specs } = this.state
                          this.props.dispatch(
                            deleteBikeSpecsRelation({
                              bike_id: id,
                              spec_id: this.state.specs[key].spec_id,
                            })
                          )
                          specs.splice(key, 1)
                          this.setState({ specs })
                        }}
                        containerStyle={{ display: "inline-block" }}
                        text="x"
                      />
                    </div>
                  </div>
                )
              })}
              <Button
                size="small"
                color="white"
                type="button"
                onClick={() => {
                  let { specs } = this.state
                  specs.push({
                    spec_id: "",
                    description: "",
                  })
                  this.setState({ specs })
                }}
                text="+ Add Spec"
              />
            </React.Fragment>
          ) : (
            <p>Loading specs...</p>
          )
        ) : null}

        <div style={{ marginBottom: 50 }} />
        <Submit
          text={id ? "Update Bike" : "Create Bike"}
          onClick={() => this.submitHandler(true)}
          loading={
            bikeResponse.is_loading ||
            bikeResponse.status == 200 ||
            bikeResponse.status == 201
          }
          setState={(n, cb) => this.setState(n, cb)}
        />
      </FormStyled>
    )
  }
}

BikeForm.defaultProps = {
  bikes: {},
}

export default BikeForm
