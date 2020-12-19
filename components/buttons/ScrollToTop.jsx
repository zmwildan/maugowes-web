import { useState, useEffect } from "react"
import Styled from "styled-components"

// components
import UpArrow from "../icons/UpArrow"

const ScrollToTopStyled = Styled.button`
    position: fixed;
    right: 15px;
    bottom: ${(props) => (props.show ? "15px" : "-60px")};
    border: none; 
    padding: 7px;
    transition: bottom .5s ease;
    cursor: pointer;
`

let Show = false

const ScrollToTop = () => {
  const [show, setShow] = useState(false)

  // function to to handleToggleBtn hide/show button scroll to top
  const handleToggleBtn = () => {
    if (window.pageYOffset > 500 && !Show) {
      Show = true
      setShow(Show)
    }

    if (window.pageYOffset <= 500 && Show) {
      Show = false
      setShow(Show)
    }
  }

  useEffect(() => {
    // component did mount
    if (typeof window !== "undefined") {
      // add scrool event listeners
      document.addEventListener("scroll", handleToggleBtn, false)
    }

    // component will unmount
    return () => {
      // remove scroll event listener
      document.removeEventListener("scroll", handleToggleBtn, false)
    }
  }, [])

  return (
    <ScrollToTopStyled
      show={show}
      title="Scroll to Top"
      onClick={() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }}>
      <UpArrow width="20px" height="10px" />
    </ScrollToTopStyled>
  )
}

export default ScrollToTop
