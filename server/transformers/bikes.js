const { generateCustomUrl } = require("../modules/cloudinary")
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
      release_date: n.release_date
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
      estimated_price: n.estimated_price
    }
  }
}
