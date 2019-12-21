const request = require('request')

module.exports.searchLocation = (req, res) => {
  const keyword = req.query.q

  const options = {
    url: `https://nominatim.openstreetmap.org/search?q=${keyword}&format=json`,
    timeout: 30000,
    headers: {
      'User-Agent': 'HQQ-Go-Dashboard/0.1'
    }
  }

  return request.get(options, (err, response) => {
    if (err) {
      json = {
        status: 500,
        message: 'Sedang ada masalah dengan pencarian di open street'
      }
    } else {
      try {
        const responseBody = JSON.parse(response.body)
        json = {
          status: responseBody.length > 0 ? 200 : 204,
          message:
            responseBody.length > 0 ? 'Success' : 'Lokasi tidak ditemukan',
          results: responseBody
        }
      } catch (e) {
        json = {
          status: 500,
          message: 'Sedang ada masalah dengan pencarian di open street'
        }
      }
    }

    json.keyword = keyword

    return res.json(json)
  })
}
