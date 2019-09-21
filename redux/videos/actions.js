export const GET_VIDEOS = "GET_VIDEOS"
export const GET_MORE_VIDEOS = "GET_MORE_VIDEOS"
export const SUBMIT_VIDEO = "SUBMIT_VIDEO"

import { CALL_API } from "../middlewares/requestApi"

import sealMiddleware from "seal-middleware"
import getConfig from "next/config"
import { objToQuery } from "string-manager"

const { publicRuntimeConfig } = getConfig()
const { API_KEY } = publicRuntimeConfig

const seal = new sealMiddleware(API_KEY, 60000)

/**
 * function to fetch video detail from api 
 * @param {string} filter  
 * @param {number} video_id 
 */
export function fetchVideoDetail(video_id) {
  return {
    [CALL_API]: {
      type: GET_VIDEOS,
      filter: video_id,
      endpoint: `/api/videos-db/${video_id}/${seal.generateSeal()}`
    }
  }
}

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

/**
 * @description function to add new video
 * @param {string} formdata.video_type
 * @param {string} formdata.video_id
 */
export function addVideo(formdata={}) {
  return {
    [CALL_API] : {
      type: SUBMIT_VIDEO,
      filter: "submit_video",
      method: "POST",
      endpoint: `/api/videos-db`,
      formdata
    }
  }
}

/**
 * @description function to update video
 * @param {string} formdata.video_type
 * @param {string} formdata.video_id
 * @param {string} id
 */
export function updateVideo(formdata={}, id) {
  return {
    [CALL_API] : {
      type: SUBMIT_VIDEO,
      filter: "submit_video",
      method: "PUT",
      endpoint: `/api/videos-db/${id}`,
      formdata
    }
  }
}