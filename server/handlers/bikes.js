const bikeModule = require("../modules/bikes")

module.exports = {
  // function to handle endpoint /api/bikes
  getBikes: (req, res) => {
    return bikeModule.getBikes(req, res, json => {
      res.json(json)
    })
  }
}
