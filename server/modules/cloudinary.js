const cloudinary = require("cloudinary")

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

/**
 * @description function to generate custom url param
 * @param {string} url
 * @param {string} arg based on cloudinary docs
 * @see  https://cloudinary.com/cookbook/resize_an_image
 */
module.exports.generateCustomUrl = (url, arg) => {
  return url.replace(/upload.*maugowes/, `upload/${arg}/maugowes`)
}

/**
 * @description function to upload image to cloudinary directory
 * @param {object} file file object from input type file
 * @param {string} dir directory target
 */
module.exports.upload = (file, target, callback) => {
  cloudinary.v2.uploader.upload(
    file,
    { use_filename: true, public_id: target },
    (err, result) => {
      if (err) console.error("Cloudinary error", e)
      callback(err, result)
    }
  )
}
