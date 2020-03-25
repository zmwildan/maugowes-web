const mongo = require("./mongodb")
const { ObjectId } = require("mongodb")
const cloudinary = require("./cloudinary")
const bikeTransformer = require("../transformers/bikes")

module.exports = {
  /**
   * function to fetch bikes
   * @param {string}
   */
  getBikes(req, res, callback) {
    const { page = 1, limit = 7, type, brand } = req.query

    let aggregate = [
      {
        // ref: https://docs.mongodb.com/manual/reference/operator/aggregation/sort/
        $sort: {
          // order by created_on desc
          created_on: -1
        }
      },
      {
        // join to bike brand using lookup
        $lookup: {
          from: "bikes_brands",
          localField: "brand_id",
          foreignField: "_id",
          as: "brand"
        }
      },
      {
        // join to bike type using lookup
        $lookup: {
          from: "bikes_types",
          localField: "type_id",
          foreignField: "_id",
          as: "type"
        }
      }
    ]

    // list by type
    if (type) {
      aggregate.push({
        $match: { type_id: ObjectId(type) }
      })
    }

    // list by brand
    if (brand) {
      aggregate.push({
        $match: { brand_id: ObjectId(brand) }
      })
    }

    console.log("aggregate", aggregate)

    mongo(({ db, client }) => {
      let countAggregate = Object.assign([], aggregate)

      // get events total count
      countAggregate.push({
        $count: "total"
      })

      // count total bikes
      db.collection("bikes")
        .aggregate(countAggregate)
        .toArray((err, count) => {
          // close mongo db connection
          client.close()

          // open new connection
          mongo(({ db, client }) => {
            db.collection("bikes")
              .aggregate(aggregate)
              .skip(parseInt((page - 1) * limit))
              .limit(parseInt(limit))
              .toArray((err, results) => {
                if (err) {
                  console.log(err)
                  return callback({
                    status: 500,
                    messages: "something wrong with mongo"
                  })
                }

                // close connection if mongo db
                client.close()

                // mongo query success
                if (results && results.length > 0) {
                  // data available
                  // transform to standart response
                  results.map((n, key) => {
                    results[key] = bikeTransformer.smallBike(n)
                  })

                  // return as json
                  return callback({
                    status: 200,
                    message: "success",
                    results,
                    total: count && count[0] ? count[0].total : 0
                  })
                } else {
                  // data not found
                  return callback({
                    status: 204,
                    message: "Sepeda tidak tersedia",
                    total: count && count[0] ? count[0].total : 0
                  })
                }
              })
          })
        })
    })
  }
}
