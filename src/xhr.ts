import { AxiosRequestConfig } from './types'
export default function xhr(config: AxiosRequestConfig): void {
  let { url, method = 'get', data = null } = config

  let request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
