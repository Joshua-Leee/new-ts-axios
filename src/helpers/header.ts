import { isPlainObject } from './util'

// 判断headers中是否含有字段一样，但仅存在字母大小写差异的key，如果有，则使用默认字段名称
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(key => {
    if (key !== normalizeName && key.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[key]
      delete headers[key]
    }
  })
}

export function processHeader(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json,charset=utf-8'
    }
  }
  return headers
}
