import { transformRequest, transformResponse } from './helpers/data'
import { processHeader } from './helpers/header'
import { buildUrl } from './helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => transformResponseData(res))
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  // console.log(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildUrl(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  let { headers = {}, data } = config
  return processHeader(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios
