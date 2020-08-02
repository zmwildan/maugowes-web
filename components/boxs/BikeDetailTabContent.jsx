import { useState, useRef, useEffect } from "react"
import BikeSpecsBox from "../../components/boxs/BikeSpecsBox"
import Share from "../../components/boxs/Share"
import DisqusBox from "../../components/boxs/Disqus"
import Error from "../../components/cards/CardError"

const BikeDetailTabContent = ({ data, activeTab = 0 }) => {
  const [windowReady, setWindowReady] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") setWindowReady(true)
  }, [])

  switch (activeTab) {
    case 0:
      return data.specs ? (
        <React.Fragment>
          <BikeSpecsBox data={data.specs} />
          <br />
          {data.source ? (
            <a target="_blank" rel="noopener noreferer" href={data.source}>
              Sumber Data
            </a>
          ) : null}
        </React.Fragment>
      ) : (
        <Error text="Spesifikasi belum tersedia" />
      )
    case 1:
      return data.geometry && data.geometry != "undefined" ? (
        <div className="bike-detail__geometry">
          <img src={data.geometry} alt="bike geometry" />
        </div>
      ) : (
        <Error text="Geometri belum tersedia" />
      )
    case 2:
      return windowReady ? (
        <DisqusBox
          url={`https://maugowes.com/bikes/${data.id}`}
          identifier={`maugowes-bikes-${data.id}`}
        />
      ) : null
    case 3:
      return <Share url={`https://maugowes.com/bikes/${data.id}`} />
    default:
      return null
  }
}

export default BikeDetailTabContent
