module.exports = {
  videosList: response => {
    let nextResponse = {}
    if(response.error) {
      nextResponse = {
        status: response.error.code,
        message: response.error.message
      }
    } else if (response.items.length < 1) {
      nextResponse.status = 204
      nextResponse.message = "Data tidak ditemukan"
    } else {
      nextResponse.status = 200
      nextResponse.nextPageToken = response.nextPageToken
      // nextResponse.results = response.items
      nextResponse.stats = response.pageInfo
      nextResponse.results = []
      response.items.map((n, key) => {
        nextResponse.results.push(this.transformer(n))
      })
    }

    return nextResponse
  },

  transformer: n => {
    return {
      id: n.id || n.id.videoId,
      title: n.snippet.title,
      thumbnails: n.snippet.thumbnails,
      publishedDate: n.snippet.publishedAt,
      description: n.snippet.description
    }
  }
}
