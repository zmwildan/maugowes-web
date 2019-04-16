export const GET_BLOG = "GET_BLOG"
export const GET_MORE_BLOG = "GET_MORE_BLOG"

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

/**
 * function to fetch more blog list by filter
 */
export function fetchMoreBlog(filter = "new", data = {}) {
  return {
    type: GET_MORE_BLOG,
    filter,
    data
  }
}