const eventModule = require("../modules/events")

module.exports = {
  createEvent: (req, res, next) => {
    return eventModule.addEvent(req, res, result => {
      res.json(result)
    })
  }
}