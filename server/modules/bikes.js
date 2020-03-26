const mongo = require("./mongodb")
const { ObjectId } = require("mongodb")
const cloudinary = require("./cloudinary")
const bikeTransformer = require("../transformers/bikes")

module.exports = {
  /**
   * function to fetch bikes
   * @param {number} req.query.page number of page
   * @param {number} req.query.limit nuber of limit
   * @param {string} req.query.type id of type
   * @param {string} req.query.brand id of brand
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
  },

  /**
   * function to fetch bike by bikes id
   */
  getBike(req, res, callback) {
    const { id } = req.params
    // id validation
    if (id && id.length != 24) {
      return callback({ status: 204, messages: "Sepeda tidak ditemukan" })
    }

    let aggregate = [
      {
        $match: { _id: ObjectId(id) }
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

    return mongo(({ db, client }) => {
      // request bike by bike id
      db.collection("bikes")
        .aggregate(aggregate)
        .toArray((err, result) => {
          // found error from database
          if (err) {
            console.log("MongoDB Error", err)
          }

          if (result.length < 1) {
            if (req.no_count) return callback()
            return callback({
              status: 204,
              messages: "Sepeda tidak ditemukan"
            })
          }

          // transform result to standart version
          return callback({
            status: 200,
            results: bikeTransformer.bike(result[0])
          })
        })
    })
  },

  /**
   * function to fetch bike brands
   */
  getBikeBrands(req, res, callback) {
    return mongo(({ db, client }) => {
      db.collection("bikes_brands")
        .find({})
        .toArray((err, results) => {
          // found error on from database
          if (err) {
            console.log("MongoDB Error", err)
          }

          if (results.length < 1) {
            return callback({
              status: 204,
              messages: "Sepeda tidak ditemukan"
            })
          }

          results.map((n, key) => {
            n.id = n._id
            delete n._id
          })

          // return as array
          return callback({
            status: 200,
            results
          })
        })
    })
  },

  /**
   * function to list all specs groups
   */
  getSpecsGroup(req, res, callback) {
    return mongo(({ db, client }) => {
      db.collection("bikes_specs_groups")
    })
  }
}