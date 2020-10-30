const eventModule = require("../modules/events")
const LogWritter = require("../modules/log")

module.exports = {
  createEvent: (req, res) => {
    return eventModule.addEvent(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },
  updateEvent: (req, res) => {
    return eventModule.updateEvent(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },
  fetchEvents: (req, res) => {
    return eventModule.fetchEvents(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },
  fetchEventDetail: (req, res) => {
    return eventModule.fetchEventDetail(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },
  actionEvent: (req, res) => {
    return eventModule.actionEvent(req, res, (json) => {
      LogWritter({ req, resp: json, rt: 0 })
      return res.json(json)
    })
  },
}
