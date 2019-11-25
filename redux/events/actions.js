export const GET_EVENTS = 'GET_EVENTS'
export const GET_MORE_EVENTS = 'GET_MORE_EVENTS'
export const SUBMIT_FORM = 'SUBMIT_FORM'

import { CALL_API } from '../middlewares/requestApi'

import sealMiddleware from 'seal-middleware'
import getConfig from 'next/config'
import { objToQuery } from 'string-manager'

const { publicRuntimeConfig } = getConfig()
const { API_KEY } = publicRuntimeConfig

const seal = new sealMiddleware(API_KEY, 60000)

/**
 * function to fetch event detail from api
 * @param {string} filter
 * @param {number} event_id
 */
export function fetchEventDetail(event_id) {
  return {
    [CALL_API]: {
      type: GET_EVENTS,
      filter: event_id,
      endpoint: `/api/events/${event_id}/${seal.generateSeal()}`
    }
  }
}

/**
 * function to fetch events list from api
 * @param {string} filter , filter of store
 * @param {object} params
 * @param {object} params.query query of request
 */
export function fetchEvents(filter = '', query = {}) {
  return {
    [CALL_API]: {
      type: GET_EVENTS,
      filter,
      endpoint: `/api/events/${seal.generateSeal()}?${objToQuery(query)}`
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
export function fetchMoreEvents(filter = '', query = {}) {
  return {
    [CALL_API]: {
      type: GET_MORE_EVENTS,
      filter,
      endpoint: `/api/events/${seal.generateSeal()}?${objToQuery(query)}`
    }
  }
}

/**
 * @description function to create event
 * @param {string} formdata.email eo email
 * @param {string} formdata.title title of event
 * @param {number || epochtime} formdata.start_time start time of event
 * @param {string} formdata.location_address location of event
 * @param {string} formdata.location_coordinate location coordinate of event
 * @param {string} formdata.link link of event
 * @param {string} formdata.note note of event
 * @param {object} formdata.poster location coordinate of event
 */
export function createEvent(formdata = {}) {
  return {
    [CALL_API]: {
      formdata,
      method: 'POST',
      endpoint: `/api/events/${seal.generateSeal()}`,
      filter: 'submit_post',
      type: SUBMIT_FORM
    }
  }
}

/**
 * @description function to change status of event
 * @param {string} formdata.status event status (accept || reject)
 * @param {string} formdata.note note status (only send if reject)
 */
export function setStatus(event_id, formdata = {}) {
  return {
    [CALL_API]: {
      formdata,
      method: 'POST',
      endpoint: `/api/events/action/${seal.generateSeal()}/${event_id}`,
      filter: 'submit_post',
      type: SUBMIT_FORM
    }
  }
}
