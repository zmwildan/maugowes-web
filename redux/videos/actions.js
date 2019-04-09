export const GET_VIDEOS = "GET_VIDEOS"
export const GET_MORE_VIDEOS = "GET_MORE_VIDEOS"

/**
 * function to fetch videos list from api
 * @param {string} filter , filter of store
 * @param {object} params
 * @param {object} params.query query of request
 */
export function fetchVideos(filter = "", data = {}) {
  return {
    type: GET_VIDEOS,
    filter,
    data
  }
}

/**
 * function to fetch more videos from api
 * @param {string} filter, filter of store
 * @param {object} params
 * @param {object} params.query queryof request
 *
 */
export function fetchMoreVideos(filter = "", data = {}) {
  return {
    type: GET_MORE_VIDEOS,
    filter, 
    data
  }
}
