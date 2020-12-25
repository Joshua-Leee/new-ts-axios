import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig): void {
  let { url, method = 'get', data = null, headers } = config

  let request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(key => {
    if (data === null && key.toLowerCase() === 'content-type') {
      delete headers[key]
    } else {
      request.setRequestHeader(key, headers[key])
    }
  })

  request.send(data)
}
