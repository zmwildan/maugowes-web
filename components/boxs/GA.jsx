import React from "react"
import Styled from "styled-components"

const GAStyled = Styled.div`
    ins {
        display: block;
        width: 100%;
        margin: 50px 0;
        text-align: center;
    }
`

class GA extends React.Component {
  componentDidMount() {}

  render() {
    if (process.env.NODE_ENV === "production" || this.props.isDummy) {
      return (
        <GAStyled>
          <ins
            className="adsbygoogle"
            data-ad-client="ca-pub-4468477322781117"
            data-ad-slot="2131764851"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </GAStyled>
      )
    } else {
      return null
    }
  }
}

export default GA
