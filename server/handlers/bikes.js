const bikeModule = require("../modules/bikes")
const LogWritter = require("../modules/log")

module.exports = {
  // function to handle endpoint POST: /api/bikes/:seal
  createBike: (req, res) => {
    return bikeModule.createBike(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },

  // function to handle endpoint PUT: /api/bikes/:seal
  updateBike: (req, res) => {
    return bikeModule.updateBike(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },

  // function to handle endpoint /api/bikes/:seal
  getBikes: (req, res) => {
    return bikeModule.getBikes(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },

  // function to handle endpoint /api/bike/:id/:seal
  getBike: (req, res) => {
    return bikeModule.getBike(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },

  // function to handle endpoint /api/bike-types/:/id/:seal
  getBikeTypes: (req, res) => {
    return bikeModule.getBikeTypes(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },

  // function to handle endpoint /api/bike-brands/:/id/:seal
  getBikeBrands: (req, res) => {
    return bikeModule.getBikeBrands(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },

  // function to handle endpoint /api/bike-group-specs/:seal
  getBikeGroupSpecs: (req, res) => {
    return bikeModule.getBikeGroupSpecs(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      res.json(json)
    })
  },

  // function to update bike spec relation
  updateSpecRelation: (req, res) => {
    return bikeModule.updateSpecRelation(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },

  // function to delete bike spec relation
  deleteSpecRelation: (req, res) => {
    return bikeModule.deleteSpecRelation(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },
}
