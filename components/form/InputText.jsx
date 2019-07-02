import React from "react"
import Styled from "styled-components"
import { validate } from "../../modules/validator"
import { color_red_main, color_gray_medium, color_blue_main } from "../Const"

const InputTextStyled = Styled.div`
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
  input {
    width: calc(100% - 20px);
    padding: 10px 0;
    font-size: 15px;
    border: none;
    border-bottom: 2px solid ${color_gray_medium};
    outline: 0;
    &:focus {
      border-bottom: 2px solid ${color_blue_main};
    }
  }
`

export default class InputText extends React.Component {
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
      min,
      max,
      value,
      label,
      name,
      type,
      validate,
      autoFocus,
      autoComplete
    } = this.props
    const is_valid = !(!validate.is_valid && validate.message)
    return (
      <InputTextStyled className={`form-child ${!is_valid ? "error" : ""}`}>
        {label ? (
          <label htmlFor={this.props.id || name}>
            {label}{" "}
            {this.props.required ? <span className="text-red">*</span> : null}
          </label>
        ) : null}
        <input
          onChange={e => this.handleChange(e)}
          onBlur={e => this.handleChange(e)}
          type={type}
          name={name}
          id={this.props.id || name}
          value={value}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          placeholder={this.props.placeholder}
        />
        {max ? (
          <small className="validation-message">
            {value.length || 0}/{max} karakter <br />
          </small>
        ) : null}
        {!is_valid ? (
          <small className="validation-message">{validate.message}</small>
        ) : null}
      </InputTextStyled>
    )
  }
}

InputText.defaultProps = {
  type: "text",
  required: false,
  autoFocus: false,
  autoComplete: "off",
  placeholder: ""
}
