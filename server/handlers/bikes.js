const bikeModule = require("../modules/bikes")

module.exports = {
  // function to handle endpoint /api/bikes/:seal
  getBikes: (req, res) => {
    return bikeModule.getBikes(req, res, json => {
      res.json(json)
    })
  },

  // function to handle endpoint /api/bike/:id/:seal
  getBike: (req, res) => {
    return bikeModule.getBike(req, res, json => {
      res.json(json)
    })
  },

  // function to handle endpoint /api/bike-types/:/id/:seal
  getBikeTypes: (req, res) => {
    return bikeModule.getBikeTypes(req, res, json => {
      res.json(json)
    })
  },

  // function to handle endpoint /api/bike-brands/:/id/:seal
  getBikeBrands: (req, res) => {
    return bikeModule.getBikeBrands(req, res, json => {
      res.json(json)
    })
  }
}
