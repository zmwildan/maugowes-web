import InputText, { InputTextStyled } from "./InputText"
import Select, { SelectStyled } from "./Select"
import Editor from "./Editor"
import Submit from "./Submit"
import Button from "../buttons/index"
import FormStyled from "./FormStyled"
import Toast from "../../modules/toast"
import { stateValidatorChecker } from "../../modules/validator"

class BikeForm extends React.Component {
  state = {
    images: [""],
    specs: [""],
  }

  componentDidMount() {
    const { bikes } = this.props
  }

  render() {
    const bikeTypes = this.props.bikes.bike_types || {}
    const bikeBrands = this.props.bikes.bike_brands || {}
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
          value={this.state.released_date || ""}
          validate={this.state.released_date_validate || {}}
          setState={(n, cb) => this.setState(n, cb)}
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
              type="number"
              value={this.state[`image_${key}`] || ""}
              validate={this.state[`image_${key}_validate`] || {}}
              setState={(n, cb) => this.setState(n, cb)}
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
        />
        {/* end of input geometry */}

        <h2>Bike Specs</h2>
        {this.state.specs.map((n) => {
          return (
            <div className="grid">
              <div className="col-6">
                <SelectStyled>
                  <select name="" id="">
                    <option value="">Spec 1</option>
                    <option value="">Spec 2</option>
                  </select>
                </SelectStyled>
              </div>
              <div className="col-6">
                <InputTextStyled>
                  <input type="text" value="Input here..." />
                </InputTextStyled>
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
            specs.push("")
            this.setState({ specs })
          }}
          text="+ Add Spec"
        />
        <div style={{ marginBottom: 50 }} />
        <Button text="Submit Data" />
      </FormStyled>
    )
  }
}

BikeForm.defaultProps = {
  bikes: {},
}

export default BikeForm
