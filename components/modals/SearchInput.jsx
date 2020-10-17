import { useState } from "react"
import Styled from "styled-components"
import Router from "next/router"

// components
import Modal from "./Modal"
import ModalHeader from "./ModalHeader"

const SearchInputStyled = Styled.div`
    width: 100%;
    background: #FFF;
    padding: 50px 10px;
    input[type="search"] {
        width: 100%;
        font-size: 25px;
        border: none;
        border-bottom: 2px solid #000;
        outline: none;
        color: #757575;
    }
`

const SearchInput = (props) => {
  const [value, setValue] = useState("")

  return (
    <Modal>
      <SearchInputStyled>
        <div className="container">
          <ModalHeader onClose={props.onClose} title="Pencarian Mau Gowes" />
          <div className="modal-body">
            <input
              onChange={(e) => {
                setValue(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  return Router.push(
                    `/search?keyword=${value}`,
                    `/search?keyword=${value}`
                  )
                }
              }}
              type="search"
              placeholder="Ketik dan enter"
              autoFocus
            />
          </div>
        </div>
      </SearchInputStyled>
    </Modal>
  )
}

export default SearchInput
