import DayJs from "../../../../modules/dayjs"
import { BlogRowStyled } from "./BlogRow"

export default props => {
  const { data } = props
  return (
    <BlogRowStyled className="table-row">
      {/* <a href={`/super/videos/edit/${data._id}`}>
        {data.title}
        {data && data.draft ? (
          <span style={{ fontWeight: 100 }} className="label-draft">
            - draft
          </span>
        ) : null}
      </a> */}
      {data.title}
      {data && data.draft ? (
        <span style={{ fontWeight: 100 }} className="label-draft">
          - draft
        </span>
      ) : null}
      <br />
      Diupdate {DayJs(data.updated_on * 1000).fromNow()}, Dipost{" "}
      {DayJs(data.publishedDate).fromNow()}
    </BlogRowStyled>
  )
}
