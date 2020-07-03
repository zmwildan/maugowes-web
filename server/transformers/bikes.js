const { toSlug } = require("string-manager")

module.exports = {
  /**
   * function to transform bikes from database to standart version
   */
  bike: (n = {}) => {
    let brand = n.brand[0]
    let type = n.type[0]

    brand.id = brand._id
    type.id = type._id

    delete brand._id
    delete type._id

    return {
      id: n._id,
      images: n.images,
      brand,
      type,
      name: n.name,
      estimated_price: n.estimated_price,
      release_date: n.release_date,
      geometry: n.geometry,
      source: n.source,
      created: n.created_on,
      updated_on: n.updated_on,
    }
  },
  /**
   * function to transform bikes from database to standart small version
   */
  smallBike: (n = {}) => {
    let brand = n.brand[0]
    let type = n.type[0]

    brand.id = brand._id
    type.id = type._id

    delete brand._id
    delete type._id

    return {
      id: n._id,
      images: n.images[0],
      brand,
      type,
      name: n.name,
      estimated_price: n.estimated_price,
      created: n.created_on,
      updated_on: n.updated_on,
      link: `/bikes/${toSlug(n.name)}-${n._id}`,
    }
  },
  /**
   * function to transform list specs from database to standart version
   */
  bikeSpecs: (specs = []) => {
    let newSpecs = {}
    specs.map((n) => {
      if (!newSpecs[n.spec_group[0].name]) newSpecs[n.spec_group[0].name] = []
      newSpecs[n.spec_group[0].name].push({
        id: n.spec[0]._id,
        spec: n.spec[0].name,
        description: n.description,
      })
    })

    return newSpecs
  },
}
