import React from 'react'
import Button from '../buttons/index'
import {
  validator,
  validationSeter,
  validationChecker
} from '../../modules/validator'
import Toast from '../../modules/toast'

export default class Submit extends React.Component {
  handleClick() {
    return this.props.onClick()
  }

  render() {
    let { style, className } = this.props
    return (
      <Button
        color={this.props.color}
        onClick={() => this.handleClick()}
        className={`${className} ${this.props.loading ? 'loading' : ''}`}
        disabled={this.props.disabled || this.props.loading}
        style={style}
        type={this.props.type}
        text={this.props.loading ? 'Memproses permintaan...' : this.props.text}
      />
    )
  }
}
