import sealMiddleware from "seal-middleware"
import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()
const { API_KEY } = publicRuntimeConfig

// redux
import { FETCH_SEARCH } from "./types"
import { CALL_API } from "../middlewares/requestApi"

const seal = new sealMiddleware(API_KEY, 60000)

/**
 * function to fetch search
 * @param {Object} params.query
 * @param {String} params.query.keyword
 */
export function fetchSearch(params = {}) {
  const query = params.query || {}

  return {
    [CALL_API]: {
      type: FETCH_SEARCH,
      filter: query.keyword || "all",
      endpoint: `/api/search/${seal.generateSeal()}?keyword=${
        query.keyword || ""
      }`,
    },
  }
}
