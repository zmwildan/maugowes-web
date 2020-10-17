const ModalHeader = (props) => {
  return (
    <div className="modal-header">
      <div className="modal-header__title">{props.title}</div>
      <a
        onClick={(e) => {
          e.preventDefault()
          props.onClose()
        }}
        className="modal-header__btn-close"
        href="#"
        title="Close modal">
        (x)
      </a>
    </div>
  )
}

ModalHeader.defaultProps = {
  onClose: () => {},
  title: "Modal Title",
}

export default ModalHeader
