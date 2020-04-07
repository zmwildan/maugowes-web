import React from "react"

const CardCompareBike = ({ bikeData, groupSpec, idx, removeBike }) => {
  return (
    <div className="col-3_md-6_xs-12 bike-compare-right__item">
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
      <div className="bike-compare-right__item__content">
        {groupSpec.results.map((data, key) => {
          const specs = bikeData.specs[data.name] || []
          return (
            <React.Fragment key={key}>
              <h3>{data.name}</h3>
              <ul className="list-data">
                {data.specs.map((data, i) => {
                  const spec = specs[data.name] || {}
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
