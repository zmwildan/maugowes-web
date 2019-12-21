import React, { Component } from 'react'
import { validate } from '../../modules/validator'
import Styled from 'styled-components'
import { color_red_main, color_gray_medium, color_blue_main } from '../Const'

const InputFileStyled = Styled.div`
  &.error {
    color: ${color_red_main};
  }
`

export default class InputFile extends Component {
  static defaultProps = {
    type: 'file',
    max: 1000000,
    customStyle: {},
    customStylePreview: {
      maxWidth: '100%',
      width: 200,
      display: 'block',
      marginBottom: 10
    },
    accept: '',
    preview: '/static/images/image-placeholder.jpeg'
  }

  componentDidMount = () => {
    validate(this.props)
  }

  handleChange(e) {
    const { files } = e.target
    if (files[0]) {
      const file = files[0]
      // get preview if upload image
      if (this.props.accept.includes('image')) {
        const reader = new FileReader()

        reader.readAsDataURL(file)

        // after load data as url
        reader.onloadend = () => {
          // change parent value
          this.props.setState(
            {
              [this.props.name]: file,
              [`${this.props.name}_preview`]: reader.result
            },
            () => {
              this.validateInput()
            }
          )
        }
      }
    }
  }

  validateInput(props = this.props) {
    const result = validate(props)
    this.props.setState({
      [this.props.name + '_validate']: result
    })
  }

  render() {
    const { preview } = this.props
    const { max, label, name, validate, required } = this.props
    const is_valid = !(!validate.is_valid && validate.message)

    return (
      <InputFileStyled
        style={this.props.customStyle}
        className={`form-child ${!is_valid ? 'error' : ''}`}>
        {label ? (
          <label htmlFor={this.props.id || name}>
            {label} {required ? '*' : ''}
          </label>
        ) : null}
        {preview ? (
          <img
            style={this.props.customStylePreview}
            src={preview}
            alt="preview"
          />
        ) : null}

        <input
          name={name}
          type="file"
          id={this.props.id || name}
          onChange={e => this.handleChange(e)}
          onBlur={e => this.handleChange(e)}
          style={this.props.customStyleInput || {}}
          accept={this.props.accept}
        />

        <br />

        <span style={{ fontSize: 12 }}>maks {max / 1000000} MB</span>

        {!is_valid ? (
          <small>
            <br />
            {validate.message}
          </small>
        ) : null}
      </InputFileStyled>
    )
  }
}
