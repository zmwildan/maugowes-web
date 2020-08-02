const express = require("express")
const Router = express.Router()
const { ObjectId } = require("mongodb")

const mongoV2 = require("../../../modules/mongodb/v2")

Router.get("/patch/parse-bike-price", async (req, res, next) => {
  const { err, db, client } = await mongoV2()
  const bikes = db
    .collection("bikes")
    .find({})
    .limit(100)
    .toArray((err, results) => {
      if (!err) {
        // start looping and update data
        results.map((n, key) => {
          // update one by one
          db.collection("posts").updateOne(
            { _id: ObjectId(n._id) },
            { $set: { estimated_price: parseInt(n.estimated_price) } }
          )

          if (key == results.length - 1) {
            res.send({ message: "done" })
          }
        })
      }
    })
})

module.exports = Router
