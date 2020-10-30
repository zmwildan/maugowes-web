const StorageConf = require("../../../config/storage")
const fs = require("fs")

const now = new Date()
const LogDir = StorageConf[process.env.NODE_ENV].log

/**
 * function to add log text
 * @param {Object} logObj, default value {}
 * @see https://www.tutorialkart.com/nodejs/create-file-in-nodejs-using-node-fs-module/
 */
const log = ({ req = {}, resp = {}, rt = 0 }) => {
  const logObj = {
    date: new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString(),
    path: req.originalUrl,
    method: req.method,
    payload: req.body || {},
    resp,
    rt,
  }

  const logText = `${JSON.stringify(logObj)}\n`

  const TargetFile = `${LogDir}/tdr_${now.getFullYear()}_${(
    "0" +
    (now.getMonth() + 1)
  ).slice(-2)}_${now.getDate()}.log`

  try {
    // create dir if not exist
    if (!fs.existsSync(LogDir)) {
      fs.mkdirSync(LogDir, { recursive: true }, (err) => {
        if (err) console.error("Create Log Dir Failed", err)
      })
    }

    if (fs.existsSync(TargetFile)) {
      // append log file
      fs.appendFile(TargetFile, logText, (err) => {
        if (err) console.error("Append Log Failed", err)
      })
    } else {
      // create new log file
      fs.writeFile(TargetFile, logText, (err) => {
        if (err) console.error("Write New Log Failed", err)
      })
    }
  } catch (err) {
    if (err) console.error("Log Writter Error:", err)
  }
}

module.exports = log
