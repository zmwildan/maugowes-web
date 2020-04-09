import { currencyFormat } from "string-manager"

const CardCompareBike = ({
  bikeData,
  groupSpec,
  idx,
  removeBike,
  bikeTotal,
}) => {
  let wrapperClassName = "col-6_xs-12 bike-compare-right__item"
  if (bikeTotal == 3)
    wrapperClassName = "col-4_md-6_xs-12 bike-compare-right__item"
  if (bikeTotal == 4)
    wrapperClassName = "col-3_md-6_xs-12 bike-compare-right__item"

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
        <h3>Harga</h3>
        <ul className="list-data">
          <li>Rp {currencyFormat(bikeData.estimated_price)},-</li>
        </ul>
        {groupSpec.results.map((data, key) => {
          const specs = bikeData.specs[data.name] || []
          return (
            <React.Fragment key={key}>
              <h3>{data.name}</h3>
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
