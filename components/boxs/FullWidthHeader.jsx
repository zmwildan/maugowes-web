import React from "react"
import Styled from "styled-components"
import { color_gray_soft } from "../Const"

const FullWidthHeaderStyled = Styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  background-size: cover !important;
  background-position: center! important;
  padding: 150px 0;
  color: #FFF;
  text-align: center;
  h1{
    margin: auto;  
    font-weight: 600;
    text-transform: uppercase;
    font-size: 24px;
    letter-spacing: .6px;
    padding-bottom: 5px;
  }
  h2 {
    font-weight: 400;
    font-size: 14px;
    color: ${color_gray_soft};
  }
`

class FullWidthHeader extends React.Component {
  componentDidMount() {
    this.spacerHeightSetter()

    // listen window resize
    document.addEventListener("resize", this.spacerHeightSetter)

  }

  componentWillUnmount(){
    // remove resize event listener
    document.removeEventListener("resize", this.spacerHeightSetter)
  }

  spacerHeightSetter(){
    console.log("handle set spacer height...")
    const HeaderEl = document.getElementById("full-width-header")
    const SpacerEl = document.getElementById("full-width-spacer")
    SpacerEl.style.height = `${HeaderEl.offsetHeight}px`
  }

  render() {
    return (
      <React.Fragment>
        <FullWidthHeaderStyled
          id={this.props.id || "full-width-header"}
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
              this.props.backgroundImage
            })`
          }}>
          <div className="container">
            <h1>{this.props.title}</h1>
            <h2 dangerouslySetInnerHTML={{ __html: this.props.text }} />
          </div>
        </FullWidthHeaderStyled>
        {/* spacers */}
        <div id="full-width-spacer" />
      </React.Fragment>
    )
  }
}

export default FullWidthHeader
