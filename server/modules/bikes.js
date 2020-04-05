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
    const { page = 1, limit = 7, type, brand, q } = req.query

    let aggregate = [
      {
        // ref: https://docs.mongodb.com/manual/reference/operator/aggregation/sort/
        $sort: {
          // order by created_on desc
          updated_on: -1,
        },
      },
      {
        // join to bike brand using lookup
        $lookup: {
          from: "bikes_brands",
          localField: "brand_id",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        // join to bike type using lookup
        $lookup: {
          from: "bikes_types",
          localField: "type_id",
          foreignField: "_id",
          as: "type",
        },
      },
    ]

    // list by type
    if (type) {
      aggregate.push({
        $match: { type_id: ObjectId(type) },
      })
    }

    // list by brand
    if (brand) {
      aggregate.push({
        $match: { brand_id: ObjectId(brand) },
      })
    }

    // search by keyword
    if (q) {
      // search with ignore capital text, source: https://stackoverflow.com/a/9655186/2780875
      aggregate.push({
        $match: { name: { $regex: `.*${q}.*`, $options: "i" } },
      })
    }

    mongo(({ db, client }) => {
      let countAggregate = Object.assign([], aggregate)

      // get events total count
      countAggregate.push({
        $count: "total",
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
                    messages: "something wrong with mongo",
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
                    total: count && count[0] ? count[0].total : 0,
                  })
                } else {
                  // data not found
                  return callback({
                    status: 204,
                    message: "Sepeda tidak tersedia",
                    total: count && count[0] ? count[0].total : 0,
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
        $match: { _id: ObjectId(id) },
      },
      {
        // join to bike brand using lookup
        $lookup: {
          from: "bikes_brands",
          localField: "brand_id",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        // join to bike type using lookup
        $lookup: {
          from: "bikes_types",
          localField: "type_id",
          foreignField: "_id",
          as: "type",
        },
      },
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
            // bike is found

            if (req.no_count) return callback()
            return callback({
              status: 204,
              messages: "Sepeda tidak ditemukan",
            })
          }

          // transform result as standart format
          let bikeResults = bikeTransformer.bike(result[0])
          bikeResults.status == 200

          // get specs based on bike_id
          const bikeRelationsAggregate = [
            { $match: { bike_id: ObjectId(bikeResults.id) } },
            // join to bikes_specs table
            {
              $lookup: {
                from: "bikes_specs",
                localField: "spec_id",
                foreignField: "_id",
                as: "spec",
              },
            },
            // join to bikes_specs_group table
            {
              $lookup: {
                from: "bikes_specs_groups",
                localField: "spec.spec_group_id",
                foreignField: "_id",
                as: "spec_group",
              },
            },
          ]

          // join to bike specs group
          return db
            .collection("bikes_specs_relations")
            .aggregate(bikeRelationsAggregate)
            .toArray((err, bikeSpecsResults) => {
              if (err) {
                console.log("MongoDB Error", err)
              }

              // transform bike specs results to standart version
              if (bikeSpecsResults.length > 0)
                bikeSpecsResults = bikeTransformer.bikeSpecs(bikeSpecsResults)

              bikeResults.status = 200
              bikeResults.message = "Sepeda ditemukan"
              bikeResults.specs = bikeSpecsResults

              // transform result to standart version
              return callback(bikeResults)
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
              messages: "Merek sepeda tidak ditemukan",
            })
          }

          results.map((n, key) => {
            n.id = n._id
            delete n._id
          })

          // return as array
          return callback({
            status: 200,
            results,
          })
        })
    })
  },

  /**
   * function to fetch bike types
   * @param {*} req
   * @param {*} res
   * @param {*} callback
   */
  getBikeTypes(req, res, callback) {
    return mongo(({ db, client }) => {
      db.collection("bikes_types")
        .find({})
        .toArray((err, results) => {
          // found error on from database
          if (err) {
            console.log("MongoDB Error", err)
          }

          if (results.length < 1) {
            return callback({
              status: 204,
              messages: "Tipe sepeda tidak ditemukan",
            })
          }

          results.map((n, key) => {
            n.id = n._id
            delete n._id
          })

          // return as array
          return callback({
            status: 200,
            results,
          })
        })
    })
  },

  /**
   * function to list all specs groups
   */
  getBikeGroupSpecs(req, res, callback) {
    const aggregate = [
      {
        $lookup: {
          from: "bikes_specs_groups",
          localField: "spec_group_id",
          foreignField: "_id",
          as: "spec_group",
        },
      },
    ]
    return mongo(({ db, client }) => {
      db.collection("bikes_specs")
        .aggregate(aggregate)
        .toArray((err, results) => {
          if (err) {
            console.log("MongoDB Error", err)
          }

          // normalize array
          if (results.length > 1) {
            let nextSpecs = []
            let alreadyGroup = []
            let keysGroup = {}
            results.map((n) => {
              // request format is :
              // [{type: "spec group", list: ["spec_list"]}]
              const spec_group_name = n.spec_group[0].name
              if (!alreadyGroup.includes(spec_group_name)) {
                alreadyGroup.push(spec_group_name)
                keysGroup[spec_group_name] = nextSpecs.length
                nextSpecs.push({ name: spec_group_name, specs: [] })
              }
              nextSpecs[keysGroup[spec_group_name]].specs.push(n.name)
            })
            callback({
              status: 200,
              message: "data available",
              results: nextSpecs,
            })
          } else {
            // data not found
            return callback({
              status: 204,
              messages: "Bike specs not",
            })
          }
        })
    })
  },

  /**
   * function to create new bike
   * @param {string} req.params.title
   * @param {array} req.params.images , sample data ["image1","image2", "image3"]
   */
  createBike(req, res, callback) {
    const now = parseInt(new Date().getTime())

    let formdata = {
      name: req.body.name,
      brand_id: ObjectId(req.body.brand_id),
      type_id: ObjectId(req.body.type_id),
      estimated_price: req.body.estimated_price || 0,
      release_date: req.body.release_date || "-",
      images: JSON.parse(req.body.images) || [],
      geometry: req.body.geometry,
      source: req.body.source,
      created_on: now,
      updated_on: now,
    }

    // insert to database
    return mongo(({ db, client }) => {
      db.collection("bikes").insert(formdata)

      client.close()

      return callback({
        status: 201,
        message: "Bike Created",
      })
    })
  },

  /**
   * function to update bike
   * @param {string} req.params.bike_id
   */
  updateBike(req, res) {
    let { id } = req.params
    id = ObjectId(id)

    const now = parseInt(new Date().getTime())

    let formdata = {
      name: req.body.name,
      brand_id: ObjectId(req.body.brand_id),
      type_id: ObjectId(req.body.type_id),
      estimated_price: req.body.estimated_price || 0,
      release_date: req.body.release_date || "-",
      images: JSON.parse(req.body.images) || [],
      geometry: req.body.geometry,
      source: req.body.source,
      updated_on: now,
    }

    // update database
    return mongo(({ db, client }) => {
      db.collection("bikes").update({ _id: id }, { $set: formdata })

      client.close()

      return res.json({
        status: 200,
        message: "Update Bike Success",
      })
    })
  },
}
