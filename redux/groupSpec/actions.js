export const GET_GROUP_SPEC = "GET_GROUP_SPEC"

import { CALL_API } from "../middlewares/requestApi"

import sealMiddleware from "seal-middleware"
import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()
const { API_KEY } = publicRuntimeConfig

const seal = new sealMiddleware(API_KEY, 60000)

/**
 * function to fetch group spec lists
 */
export function fetchGroupSpec(filter) {
  return {
    [CALL_API]: {
      type: GET_GROUP_SPEC,
      filter,
      endpoint: `/api/bike-group-specs/${seal.generateSeal()}`
    }
  }
}
