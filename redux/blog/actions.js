export const GET_BLOG = "GET_BLOG"

export function fetchBlog(filter="new", data) {
  return {
    type: GET_BLOG,
    filter, 
    data
  }
}