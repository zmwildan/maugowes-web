import React from "react"
import Styled from "styled-components"

const GAStyled = Styled.div`
    ins {
        display: block;
        width: 100%;
        margin: 50px 0;
        text-align: center;
        height: ${props => (props.isDummy ? "150px" : "auto")};
        background: ${props => (props.isDummy ? "lightgray" : "white")};
    }
`

class GA extends React.Component {
  componentDidMount() {
    // call google ads script
    // render new Google Ads
    if (process.env.NODE_ENV === "production") {
      if (this.props.timeout) {
        setTimeout(() => {
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        }, this.props.timeout)
      } else {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    }
  }

  render() {
    return (
      <GAStyled
      isDummy={process.env.NODE_ENV != "production"}>
        <ins
          style={this.props.style || {}}
          className="adsbygoogle"
          data-ad-client={this.props.adClient}
          data-ad-slot={this.props.adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </GAStyled>
    )
  }
}

export default GA
