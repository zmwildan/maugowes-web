const mongoV2 = require("../../modules/mongodb/v2")

const BikesModel = {
  async searchPosts(req) {
    const { page = 1, limit = 10, showDraft, keyword = "" } = req.query

    // start mongo query
    const { err, db, client } = await mongoV2()

    return new Promise((resolve) => {
      if (err) {
        // error on mongo db connection
        resolve({
          status: 500,
          message: "Something wrong, please try again",
        })
      }

      // start mongo query
      let aggregate = []

      // search by keyword
      if (keyword) {
        // search with ignore capital text, source: https://stackoverflow.com/a/9655186/2780875
        aggregate.push({
          $match: { title: { $regex: `.*${keyword}.*`, $options: "i" } },
        })
      }

      db.collection("posts", { _id: 0 })
        .aggregate(aggregate)
        .skip(parseInt((page - 1) * limit))
        .limit(parseInt(limit))
        .toArray((err, results) => {
          // close mongo db connection
          client.close()
          if (err) {
            console.log(err)
            resolve([])
          } else {
            resolve(results)
          }
        })
    })
  },
}

module.exports = BikesModel
