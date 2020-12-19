import { useState, useEffect } from "react"
import Styled from "styled-components"

import Loader from "../Loader"
import {
  color_gray_medium,
  color_white_main,
  color_gray_soft,
} from "../../components/Const"
import Error from "../cards/CardError"

const Wrapper = Styled.div`
  position: absolute;
  width: calc(100% - 15px);
  border-top: none;
  border: 1px solid ${color_gray_medium};
  background: ${color_white_main};
  z-index: 1;

  .bike-lists{
    font-size: 14px;
    padding: 6px 12px;
    cursor: pointer;
  }

  .selected{
    background-color: ${color_gray_soft};
  }
`
const BikeAutoComplete = (props) => {
  const [selected, setSelected] = useState(0)

  const { setSuggestion, data } = props
  const { status, results, message, is_loading } = data

  useEffect(() => {
    if (typeof window !== "undefined")
      document.addEventListener("keydown", handleKey, false)
    return () => {
      if (typeof window !== "undefined")
        document.removeEventListener("keydown", handleKey, false)
    }
  }, [])

  useEffect(() => {
    if (data.results && data.results.length) {
      setSelected({ selected: 0 })
    }
  }, [data])

  const handleKey = (e) => {
    const { results } = props.data
    const key = e.keyCode
    if (key === 40) {
      if (selected < results.length - 1) {
        setSelected({ selected: selected + 1 })
      }
    } else if (key === 38) {
      if (selected > 0) {
        setSelected({ selected: selected - 1 })
      }
    } else if (key === 13 && results.length) {
      setSuggestion(results[selected].id)
    }
  }

  return (
    <Wrapper onKeyDown={handleKey}>
      {!status || is_loading ? (
        <Loader size="small" />
      ) : status == 200 ? (
        results.map((n, key) => {
          return (
            <div
              className={`bike-lists ${selected === key ? "selected" : ""}`}
              onClick={() => setSuggestion(n.id)}
              key={key}>
              {n.name}
            </div>
          )
        })
      ) : (
        <Error text={message} />
      )}
    </Wrapper>
  )
}

export default BikeAutoComplete
