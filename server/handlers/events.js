const eventModule = require("../modules/events")

module.exports = {
  createEvent: (req, res) => {
    return eventModule.addEvent(req, res, (json) => {
      return res.json(json)
    })
  },
  updateEvent: (req, res) => {
    return eventModule.updateEvent(req, res, (json) => {
      return res.json(json)
    })
  },
  fetchEvents: (req, res) => {
    return eventModule.fetchEvents(req, res, (json) => {
      return res.json(json)
    })
  },
  fetchEventDetail: (req, res) => {
    return eventModule.fetchEventDetail(req, res, (json) => {
      return res.json(json)
    })
  },
  actionEvent: (req, res) => {
    return eventModule.actionEvent(req, res, (json) => {
      return res.json(json)
    })
  },
}
