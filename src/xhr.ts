import { parseHeaders } from './helpers/header'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    let { url, method = 'get', data = null, headers, responseType } = config

    let request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      let responseData = responseType === 'text' ? request.responseText : request.response
      let responseHeaders = request.getAllResponseHeaders()
      let { status, statusText } = request

      let response: AxiosResponse = {
        data: responseData,
        status,
        statusText,
        headers: parseHeaders(responseHeaders),
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach(key => {
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      } else {
        request.setRequestHeader(key, headers[key])
      }
    })

    request.send(data)
  })
}
