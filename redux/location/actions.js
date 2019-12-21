export const GET_LOCATION = 'GET_LOCATION'
export const RESET_LOCATION = 'RESET_LOCATION'

import { CALL_API } from '../middlewares/requestApi'
import { objToQuery } from 'string-manager'

import sealMiddleware from 'seal-middleware'
import getConfig from 'next/config'

// generate seal
const { publicRuntimeConfig } = getConfig()
const { API_KEY } = publicRuntimeConfig

const seal = new sealMiddleware(API_KEY, 60000)

/**
 * @description function to search location from streetmap
 * @param {keyword} query.q keyword location to search
 */
export function searchLocation({ query }) {
  return {
    [CALL_API]: {
      method: 'GET',
      endpoint: `/api/location/search/${seal.generateSeal()}?${objToQuery(query)}`,
      filter: 'search_location',
      type: GET_LOCATION
    }
  }
}

/**
 * @description function to reset location data by filter
 * @param {string} filter filter to delete
 */
export function resetLocation(filter) {
  return {
    type: RESET_LOCATION,
    filter
  }
}
