import React from "react"
import Button from "../buttons/index"

const Submit = (props) => {
  const { style, className } = props
  return (
    <Button
      color={props.color}
      onClick={() => props.onClick()}
      className={`${className} ${props.loading ? "loading" : ""}`}
      disabled={props.disabled || props.loading}
      style={style}
      type={props.type}
      text={props.loading ? "Memproses permintaan..." : props.text}
    />
  )
}

export default Submit
