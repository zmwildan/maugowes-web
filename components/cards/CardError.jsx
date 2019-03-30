import Styled from "styled-components"
import { color_gray_dark } from "../Const"

const LoaderStyled = Styled.div`
  padding: 20px 0;
  margin: 20px 0;
  color: ${color_gray_dark};
  font-weight: 100;
`

export default props => {
  return (
    <LoaderStyled className="grid-center">
      <div dangerouslySetInnerHTML={{__html: props.text}} />
    </LoaderStyled>
  )
}
