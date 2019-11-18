export const GET_EVENTS = "GET_EVENTS"
export const GET_MORE_EVENTS = "GET_MORE_EVENTS"

import {
  CALL_API
} from "../middlewares/requestApi"

import sealMiddleware from "seal-middleware"
import getConfig from "next/config"
import {
  objToQuery
} from "string-manager"

const {
  publicRuntimeConfig
} = getConfig()
const {
  API_KEY
} = publicRuntimeConfig

const seal = new sealMiddleware(API_KEY, 60000)

/**
 * function to fetch event detail from api 
 * @param {string} filter  
 * @param {number} event_id 
 */
export function fetchVideoDetail(event_id) {
  return {
    [CALL_API]: {
      type: GET_EVENTS,
      filter: event_id,
      endpoint: `/api/videos-db/${event_id}/${seal.generateSeal()}`
    }
  }
}

/**
 * function to fetch events list from api
 * @param {string} filter , filter of store
 * @param {object} params
 * @param {object} params.query query of request
 */
export function fetchEvents(filter = "", query = {}) {
  return {
    [CALL_API]: {
      type: GET_EVENTS,
      filter,
      endpoint: `/api/videos-db/${seal.generateSeal()}?${objToQuery(query)}`
    }
  }
}

/**
 * function to fetch more events from api
 * @param {string} filter, filter of store
 * @param {object} params
 * @param {object} params.query queryof request
 *
 */
export function fetchMoreEvents(filter = "", query = {}) {
  return {
    [CALL_API]: {
      type: GET_MORE_EVENTS,
      filter,
      endpoint: `/api/videos-db/${seal.generateSeal()}?${objToQuery(query)}`
    }
  }
}