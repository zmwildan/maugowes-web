module.exports = author => {
  author.avatar = `${process.env.FRONT_HOST || "http://localhost:2019"}/media${author.avatar}`
  return author
}