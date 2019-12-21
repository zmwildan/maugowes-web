import Toast from './toast'

export let validator = {}

export function resetValidator() {
  validator = {}
}

export function validate(props) {
  const { name, max, value, required, type } = props
  if (required && (!value || value == 0)) {
    return generateResult(props, false, 'wajib diisi')
  } else if (max && value.length > max) {
    //handle max character
    return generateResult(
      props,
      false,
      'input melebihi batas maksimal karakter'
    )
  } else if (type == 'number' && !parseInt(value)) {
    //handle input type number
    return generateResult(props, false, 'inputan bukan angka')
  } else if (type == 'link' && !value.includes('http')) {
    //handle input type link
    return generateResult(
      props,
      false,
      'harus link valid yang dilengkapi dengan, http:// atau https://'
    )
  } else if (type == 'email' && !value.includes('@')) {
    //handle input type email
    return generateResult(props, false, 'harus email valid')
  } else if (type == 'file') {
    //handle input type file
    return handleFileValidator(props)
  }

  return generateResult(props, true)
}

export function validationChecker() {
  let is_valid = true
  Object.keys(validator).map(n => {
    is_valid = is_valid && validator[n].is_valid
  })
  return is_valid
}

export function validationSeter(keys) {
  keys.map(n => {
    if (!validator[n + '_validate']) {
      validator[n + '_validate'] = generateResult(
        { name: n },
        false,
        'wajib diisi'
      )
    }
  })

  return validator
}

function handleFileValidator(props) {
  const { max, value } = props
  if (value.size > max) {
    //melebihi max size
    return generateResult(
      props,
      false,
      'ukuran maksimum adalah ' + max / 1000000 + ' MB'
    )
  } else if (props.required && !value) {
    return generateResult(props, false, `${props.name} wajib diisi`)
  }
  return generateResult(props, true)
}

function generateResult(props, is_valid = true, message = '') {
  const { name } = props
  const result = {
    is_valid,
    message
  }
  validator[name + '_validate'] = result
  return result
}

/**
 * @desc function to validate form based on component state
 * @param {object} state state of React component
 * @param {function} setState setState from React component
 * @param {array} requiredInputs
 */
export function stateValidatorChecker({
  setState = () => {},
  state = {},
  requiredInputs = []
}) {
  let nextState = {}
  let is_valid = true
  let error_message = ''

  const stateKeys = Object.keys(state)

  stateKeys.map((n, key) => {
    // found not valid input
    if (n.includes('_validate') && !state[n].is_valid) {
      is_valid = false
      error_message += `${n.replace('_validate', '')} ${state[n].message ||
        'belum valid'}${key < stateKeys.length - 1 ? ', ' : ''}`
    }
  })

  // check based on required inputs in params
  requiredInputs.map((n, key) => {
    if (!state[n]) {
      is_valid = false
      nextState[`${n}_validate`] = {
        is_valid: false,
        message: 'input wajib diisi'
      }
      error_message += `${n} wajib diisi${
        key < requiredInputs.length - 1 ? ', ' : ''
      }`
    }
  })

  if (!is_valid) {
    Toast(true, error_message, 'error')
    console.warn('state validator', {
      state: nextState,
      is_valid,
      error_message
    })
  }

  setState(nextState, () => {
    const errorEl = document.getElementsByClassName('error')
    if(errorEl && errorEl[0]) {
      errorEl[0].scrollIntoView({ block: 'end', behavior: 'smooth' })
    }
  })

  return { is_valid, error_message }
}
