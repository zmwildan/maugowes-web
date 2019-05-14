export const GET_VIDEOS = "GET_VIDEOS"
export const GET_MORE_VIDEOS = "GET_MORE_VIDEOS"

import { CALL_API } from "../middlewares/requestApi"

import sealMiddleware from "seal-middleware"
import getConfig from "next/config"
import { objToQuery } from "string-manager"

const { publicRuntimeConfig } = getConfig()
const { API_KEY } = publicRuntimeConfig

const seal = new sealMiddleware(API_KEY, 60000)

/**
 * function to fetch videos list from api
 * @param {string} filter , filter of store
 * @param {object} params
 * @param {object} params.query query of request
 */
export function fetchVideos(filter = "", query = {}) {
  return {
    [CALL_API]: {
      type: GET_VIDEOS,
      filter,
      endpoint: `/api/videos-db/${seal.generateSeal()}?${objToQuery(query)}`
    }
  }
}

/**
 * function to fetch more videos from api
 * @param {string} filter, filter of store
 * @param {object} params
 * @param {object} params.query queryof request
 *
 */
export function fetchMoreVideos(filter = "", query = {}) {
  return {
    [CALL_API] : {
      type: GET_MORE_VIDEOS,
      filter,
      endpoint: `/api/videos-db/${seal.generateSeal()}?${objToQuery(query)}`
    }
  }
}
