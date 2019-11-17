const eventModule = require("../modules/events")

module.exports = {
  createEvent: (req, res, next) => {
    return eventModule.addEvent(req, res, json => {
      res.json(json)
    })
  },
  fetchEvents: (req, res, next) => {
    return eventModule.fetchEvents(req, res, json => {
      res.json(json)
    })
  },
  fetchEventDetail: (req, res, next) => {
    return eventModule.fetchEventDetail(req, res, json => {
      res.json(json)
    })
  }
}