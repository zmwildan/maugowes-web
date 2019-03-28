import Styled from "styled-components"
import Card from "../cards/CardVideo"

const VideoBox = Styled.div`

`

export default props => {
  return (
    <VideoBox>
      {
        props.noHeaderTitle ? (
          <div className="grid-center">
            <h2 className="blog-box-title">
              {props.title || "Yang Baru di Blog"}
            </h2>
          </div>
        ) : null
      }

      <div className="grid">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </VideoBox>
  )
}