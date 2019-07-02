export const LOGIN = "LOGIN"

import { CALL_API } from "../middlewares/requestApi"

import sealMiddleware from "seal-middleware"
import getConfig from "next/config"
// import { objToQuery } from "string-manager"

const { publicRuntimeConfig } = getConfig()
const { API_KEY } = publicRuntimeConfig

const seal = new sealMiddleware(API_KEY, 60000)

/**
 * function to request login
 * @param {string} formdata.email
 * @param {string} formdata.password
 */
export function login(formdata = {}) {
  return {
    [CALL_API]: {
      type: LOGIN,
      method: "post",
      formdata,
      endpoint: `/api/login`
    }
  }
}


/**
 * function to request login
 * @param {string} formdata.email
 * @param {string} formdata.password
 */
export function logout() {
  return {
    [CALL_API]: {
      type: LOGIN,
      method: "post",
      endpoint: `/api/logout`
    }
  }
}
