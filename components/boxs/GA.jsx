import React, { useEffect } from "react"
import Styled from "styled-components"

const GAStyled = Styled.div`
    ins {
        display: block;
        width: 100%;
        margin: 50px 0;
        text-align: center;
        height: ${(props) => (props.isDummy ? "150px" : "auto")};
        background: ${(props) => (props.isDummy ? "lightgray" : "white")};
    }
`

const GA = (props) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (process.env.NODE_ENV === "production") {
        if (props.timeout) {
          setTimeout(() => {
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          }, props.timeout)
        } else {
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        }
      }
    }
  }, [])

  return (
    <GAStyled isDummy={process.env.NODE_ENV != "production"}>
      <ins
        style={props.style || {}}
        className="adsbygoogle"
        data-ad-client={props.adClient}
        data-ad-slot={props.adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </GAStyled>
  )
}

export default GA
