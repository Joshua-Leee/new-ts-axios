import { isDate, isPlainObject } from './util'

// 此方法主要是编码成url能识别的字符
// 但http允许显示 '@'、','、'$'、':'、'['、']'、
// 其中空格需要转换成'+'
export function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 此方法主要处理get请求参数问题：
// 1、参数值为null或者undefind的不拼接到url中
// 2、参数值为数组类型的，则格式化为多个键值对形式，例：a=[1,2]，url中显示a[]=1&a[]=2
// 3、参数值为对象类型的，转换成json字符串，并以键值对形式拼接到url中
// 4、为数字类型，字符串类型的，以键值对形式拼接到url中
// 5、若url中有hash值的，只保留hash值前面部分
// 6、格式化后的参数字符串，需encode后再拼接到url中，主要处理特殊字符，保留的特殊字符可参照上方encode方法描述
// 7、若url中带有参数的，将格式化后的参数字符串拼接到原有参数后面
// ******注意：目前get方法考虑的传参比较简单，若传递的参数相对复杂，建议使用post方法
export function buildUrl(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]

    // 此处用typeof，可以检测未定义的变量，直接用'==='的话，未定义的变量会报错
    if (val === null || typeof val === 'undefined') {
      return
    }

    let values: any[] = []

    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(value => {
      if (isDate(value)) {
        value = value.toISOString()
      } else if (isPlainObject(value)) {
        value = JSON.stringify(value)
      }
      parts.push(`${encode(key)}=${encode(value)}`)
    })
  })

  let serializeParams = parts.join('&')

  if (serializeParams) {
    // 处理url中的hash值
    let markIndex = url.indexOf('#')
    if (url.indexOf('#') !== -1) {
      url = url.slice(0, markIndex)
    }

    // 判断url中是否已存在参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams
  }

  return url
}
