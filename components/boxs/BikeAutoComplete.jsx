import React, { useState, useEffect } from "react"
import Styled from "styled-components"

import Loader from "../Loader"
import Error from "../cards/CardError"

const Wrapper = Styled.div`
  position: absolute;
  width: calc(100% - 15px);
  border: 1px solid #000;

  .bike-lists{
    font-size: 14px;
    padding: 6px 12px;
  }

  .selected{
    background-color: #999;
  }
`
class BikeAutoComplete extends React.Component {
  state = {
    selected: 0,
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey, false)
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.data.results &&
      this.props.data.results &&
      this.props.data.results.length !== prevProps.data.results.length
    ) {
      this.setState({ selected: 0 })
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey, false)
  }

  handleKey = (e) => {
    const { results } = this.props.data
    const { selected } = this.state
    const key = e.keyCode
    if (key === 40) {
      if (selected < results.length - 1) {
        this.setState({ selected: selected + 1 })
      }
    } else if (key === 38) {
      if (this.state.selected > 0) {
        this.setState({ selected: selected - 1 })
      }
    } else if (key === 13 && results.length) {
      this.props.setSuggestion(results[selected].id)
    }
  }
  render() {
    const { setSuggestion, data } = this.props
    const { status, results, message, is_loading } = data
    return (
      <Wrapper onKeyDown={this.handleKey}>
        {status ? (
          status == 200 ? (
            results.map((n, key) => {
              return (
                <div
                  className={`bike-lists ${
                    this.state.selected === key ? "selected" : ""
                  }`}
                  onClick={() => setSuggestion(n.id)}
                  key={key}>
                  {n.name}
                </div>
              )
            })
          ) : (
            <Error text={message} />
          )
        ) : null}
        {!status || is_loading ? <Loader /> : null}
      </Wrapper>
    )
  }
}

export default BikeAutoComplete
