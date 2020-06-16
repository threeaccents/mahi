import {get} from "../base";
import {BASE_URL} from "../../config";
import {UsagesQueryParam, UsagesResponse} from "./reqres";
import {generateParams} from "../../util/url";

export default function UsageService() {
  return Object.freeze({
    listUsages(params?: UsagesQueryParam): Promise<UsagesResponse> {
      return get(`${BASE_URL()}/usages${generateParams(params)}`)
    },
  })
}
