const { enc, AES, MD5 } = require("crypto-js")

const KEY = "maugowes-web"

/**
 * @description function to encrypt password
 * @param {string} string
 */
module.exports.encString = (plaintext = "") => {
  const enc = AES.encrypt(plaintext, KEY).toString()
  return enc
}

/**
 * @description function to decrypt script
 * @param {string} ciphertext
 */
module.exports.decString = (ciphertext = "") => {
  const dec = AES.decrypt(ciphertext, KEY).toString(enc.Utf8)
  return dec
}

/**
 * @description function to hash password with md5
 * @param {string} password as plain text
 */
module.exports.hashPassword = (password = "") => {
  const hash = MD5(password).toString()
  return hash
}
