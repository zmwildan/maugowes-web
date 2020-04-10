const CLOUDINARY_IMAGE_KEY = "/dhjkktmal/image/upload/"

/**
 * @desc function to convert original cloudinary url to converted format
 * @param {string} cloudinaryUrl sample : https://res.cloudinary.com/dhjkktmal/image/upload/v1586501013/maugowes/2020/bikes/HELIOS_LT9X_ACE_P.png
 * @param {string} format sample: c_scale,w_100
 */
export function imageFormatUrl(cloudinaryUrl = "", format = "") {
  // is CLOUDINARY_IMAGE_KEY avalibale in url
  if (cloudinaryUrl.includes(CLOUDINARY_IMAGE_KEY)) {
    let cloudinaryUrlArr = cloudinaryUrl.split(CLOUDINARY_IMAGE_KEY)
    cloudinaryUrl = `${cloudinaryUrlArr[0]}${CLOUDINARY_IMAGE_KEY}${format}/${cloudinaryUrlArr[1]}`
  }

  return cloudinaryUrl
}
