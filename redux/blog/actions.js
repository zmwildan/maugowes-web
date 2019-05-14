export const GET_BLOG = "GET_BLOG"
export const GET_MORE_BLOG = "GET_MORE_BLOG"

import { CALL_API } from "../middlewares/requestApi"

import sealMiddleware from "seal-middleware"
import getConfig from "next/config"
import { objToQuery } from "string-manager"

const { publicRuntimeConfig } = getConfig()
const { API_KEY } = publicRuntimeConfig

const seal = new sealMiddleware(API_KEY, 60000)

/**
 * function to fetch blog detail by blog id
 * @param {integer} blog_id id of blog
 */
export function fetchBlogDetail(blog_id) {
  return {
    [CALL_API]: {
      type: GET_BLOG,
      fiter: blog_id,
      endpoint: `/api/post/${blog_id}/${seal.generateSeal()}`
    }
  }
}

/**
 * function to fetch blog list by filter
 * @param {string} filter
 * @param {object} data
 */
export function fetchBlog(filter = "", query = {}) {
  return {
    [CALL_API]: {
      type: GET_BLOG,
      filter,
      endpoint: `/api/posts/${seal.generateSeal()}?${objToQuery(query)}`
    }
  }
}

/**
 * function to fetch more blog list by filter
 */
export function fetchMoreBlog(filter = "new", query = {}) {
  return {
    [CALL_API]: {
      type: GET_MORE_BLOG,
      filter,
      endpoint: `/api/posts/${seal.generateSeal()}?${objToQuery(query)}`
    }
  }
}
