import { currencyFormat } from "string-manager"

const CardCompareBike = ({
  bikeData,
  groupSpec,
  idx,
  removeBike,
  wrapperClassName,
}) => {
  return (
    <div className={wrapperClassName}>
      <div style={{ padding: "0 5px" }}>
        <div
          className="bike-compare-right__item__thumbnail"
          style={{
            backgroundImage: `url(${bikeData.images[0]})`,
          }}>
          {idx ? (
            <button
              type="button"
              className="btn-delete"
              onClick={() => removeBike(bikeData.id)}>
              x
            </button>
          ) : null}
        </div>
        <div className="bike-compare-right__item__title">
          <h4>{bikeData.name}</h4>
        </div>
      </div>
      <div className="bike-compare-right__item__content">
        <h2>Harga</h2>
        <ul className="list-data">
          <li>Rp {currencyFormat(bikeData.estimated_price)},-</li>
        </ul>
        {groupSpec.results.map((data, key) => {
          const specs = bikeData.specs[data.name] || []
          return (
            <React.Fragment key={key}>
              <h2>{data.name}</h2>
              <ul className="list-data">
                {data.specs.map((data, i) => {
                  const spec = specs.find((n) => n.id == data.id) || {}
                  return (
                    <li key={i}>{spec.description ? spec.description : "-"}</li>
                  )
                })}
              </ul>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default CardCompareBike
