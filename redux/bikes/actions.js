export const GET_BIKE = "GET_BIKE"

import { CALL_API } from "../middlewares/requestApi"

import sealMiddleware from "seal-middleware"
import getConfig from "next/config"
import { objToQuery } from "string-manager"

const { publicRuntimeConfig } = getConfig()
const { API_KEY } = publicRuntimeConfig

const seal = new sealMiddleware(API_KEY, 60000)

/**
 * function to fetch bikes
 * @param {string} query.brand_id filter list by bike brand
 * @param {string} query.type_id filter list by bike type
 * @param {number} query.page
 * @param {number} query.limit
 */
export function fetchBikes(filter = "bike_list", query = {}) {
  return {
    [CALL_API]: {
      type: GET_BIKE,
      filter,
      endpoint: `/api/bikes/${seal.generateSeal()}?${objToQuery(query)}`
    }
  }
}

/**
 * function to fetch bikes brands
 */
export function fetchBikeBrands(filter = "bike_brands") {
  return {
    [CALL_API]: {
      type: GET_BIKE,
      filter,
      endpoint: `/api/bike-brands/${seal.generateSeal()}`
    }
  }
}

/**
 * function to fetch bikes types
 */
export function fetchBikeTypes(filter = "bike_types") {
  return {
    [CALL_API]: {
      type: GET_BIKE,
      filter,
      endpoint: `/api/bike-types/${seal.generateSeal()}`
    }
  }
}
