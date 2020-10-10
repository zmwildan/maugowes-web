// components
import Button from "../../buttons/index"
import Table from "../tables/TableWrapper"
import BlogRow from "../tables/rows/BlogRow"
import Loader from "../../Loader"

const SuperBlogBox = (props) => {
  const { results, status, message, stats, is_loading, total } = props.data

  return (
    <React.Fragment>
      {results && results.length && total && !props.noStats ? (
        <React.Fragment>
          Menampilkan <strong>{results.length || 0}</strong> dari{" "}
          <strong>{total}</strong> post
        </React.Fragment>
      ) : null}

      <Table>
        {status
          ? results && results.length > 0
            ? results.map((n, key) => <BlogRow key={key} data={n} />)
            : null
          : null}
      </Table>

      {is_loading || !status ? <Loader /> : null}

      {props.loadmoreHandler &&
      !is_loading &&
      status === 200 &&
      results &&
      results.length >= props.maxResults ? (
        <div className="grid-center m-t-30">
          <Button
            type="button"
            isDisabled={is_loading}
            text={!is_loading ? "Postingan Berikutnya" : "Loading..."}
            size="large"
            onClick={() => {
              props.loadmoreHandler()
            }}
          />
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default SuperBlogBox
