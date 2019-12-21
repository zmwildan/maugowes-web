import React from "react"
import Styled from "styled-components"
import { validate } from "../../modules/validator"
import { color_red_main, color_gray_medium, color_blue_main, color_gray_dark, color_black_main } from "../Const"

const SelectStyled = Styled.div`
  text-align: left;
  margin-bottom: 20px;
  &.error {
    color: ${color_red_main};
    input {
      border-bottom: 2px solid ${color_red_main} !important;
    }
  }
  .validation-message {
    font-size: 12px;
  }
  select {
    border-radius: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    padding: 10px 0;
    font-size: 15px;
    color: ${color_gray_dark};
    border: none;
    border-bottom: 2px solid ${color_gray_medium};
    outline: 0;
    &:focus {
      border-bottom: 2px solid ${color_blue_main};
    }
  }
`

export default class Select extends React.Component {
  componentDidMount() {
    validate(this.props)
  }

  componentWillReceiveProps(np) {
    // validate on edit / set default value
    if (!this.props.value && np.value) validate(np)
  }

  handleChange(e) {
    const { value } = e.target
    this.props.setState(
      {
        [this.props.name]: value
      },
      () => {
        this.validateInput()
      }
    )
  }

  validateInput(props = this.props) {
    const result = validate(props)
    this.props.setState({
      [this.props.name + "_validate"]: result
    })
  }

  render() {
    const {
      value,
      label,
      name,
      validate,
      autoFocus,
      autoComplete
    } = this.props
    const is_valid = !(!validate.is_valid && validate.message)
    return (
      <SelectStyled className={`form-child ${!is_valid ? "error" : ""}`}>
        {label ? (
          <label htmlFor={this.props.id || name}>
            {label}{" "}
            {this.props.required ? <span className="text-red">*</span> : null}
          </label>
        ) : null}
        <select onChange={e => this.handleChange(e)}>
          {this.props.options.map((n, key) => {
            return (
              <option key={key} value={n.value}>
                {n.text}
              </option>
            )
          })}
        </select>
        {/* <input
          onChange={e => this.handleChange(e)}
          onBlur={e => this.handleChange(e)}
          type={type}
          name={name}
          id={this.props.id || name}
          value={value}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          placeholder={this.props.placeholder}
        /> */}
        {!is_valid ? (
          <small className="validation-message">{validate.message}</small>
        ) : null}
      </SelectStyled>
    )
  }
}

Select.defaultProps = {
  type: "text",
  required: false,
  autoFocus: false,
  autoComplete: "off",
  placeholder: ""
}
