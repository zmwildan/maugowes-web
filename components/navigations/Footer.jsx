import Styled from "styled-components"

const Footer = Styled.div`

`

export default props => {
  return (
    <Footer className="grid">
      <div className="col-4">
        <img src="/static/images/logo.png" alt="Logo Mau Gowes"/>
        <p>
          Mau Gowes - Adalah platform online yang dibuat untuk kamu para pecinta sepeda. Disini kamu bisa dapat konten menarik dan sekalian belanja pula.
        </p>
      </div>
      <div className="col-8">
        ...
      </div>
    </Footer>
  )
}