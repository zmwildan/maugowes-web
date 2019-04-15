export const GET_BLOG = "GET_BLOG"

/**
 * function to fetch blog list by filter
 * @param {string} filter 
 * @param {object} data 
 */
export function fetchBlog(filter="new", data = {}) {
  return {
    type: GET_BLOG,
    filter, 
    data
  }
}