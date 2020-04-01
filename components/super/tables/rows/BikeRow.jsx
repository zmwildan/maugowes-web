import React from "react"
import Dayjs from "../../../../modules/dayjs"
import Styled from "styled-components"

const BikeRowStyled = Styled.div`

`

const BikeRow = ({ data }) => {
  return (
    <BikeRowStyled className="table-row">
      <a href={`/super/bikes/edit/${data.id}`}>{data.name}</a>
      <br />
      Diupdate {Dayjs(data.updated_on).fromNow()}, Dipost{" "}
      {Dayjs(data.created_on).fromNow()}
    </BikeRowStyled>
  )
}

export default BikeRow
