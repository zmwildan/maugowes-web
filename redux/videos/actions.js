export const GET_VIDEOS = "GET_VIDEOS"

/**
 * fucntion to fetch videos list from api
 * @param {string} filter , filter of store 
 * @param {object} params
 * @param {object} params.query query of request 
 */
export function fetchVideos(filter="",params={}) {
  return {
    type: GET_VIDEOS
  }
}