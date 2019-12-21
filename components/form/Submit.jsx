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

    if (Object.keys(validator).length < 1) {
      //no data input
      Toast(true, 'beberapa input wajib diisi', 'error')
      this.props.setState(validationSeter(this.props.requiredInputs), () => {
        const errorEl = document.getElementsByClassName('error')[0]
        errorEl.scrollIntoView({ block: 'end', behavior: 'smooth' })
      })
    } else if (!validationChecker()) {
      Toast(true, 'beberapa input belum valid', 'error')
      console.warn('FORM NOT VALID', validator)
      this.props.setState(validationSeter(this.props.requiredInputs), () => {
        const errorEl = document.getElementsByClassName('error')[0]
        errorEl.scrollIntoView({ block: 'end', behavior: 'smooth' })
      })
    } else {
    }
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
