/**
 * 参数处理
 * 支持3层，参数如
 * queryParams.aaa=vvv
 * queryParams.params['aaa']=vvv
 * queryParams.aaa.bbb=vvv
 * queryParams.aaa.params['bbb']=vvv
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = ''
  if (!params) {
    return result
  }
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + '='
    // 第一层
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object' && propName === 'params') {
        for (const key of Object.keys(value)) {
          let value2 = value[key]
          // 第二层
          if (value2 !== null && value2 !== '' && typeof value2 !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value2) + '&'
          }
        }
      } else if (typeof value === 'object' && propName !== 'params') {
        for (const key of Object.keys(value)) {
          let value2 = value[key]
          // 第二层
          if (value2 !== null && value2 !== '' && typeof value2 !== 'undefined') {
            if (typeof value2 === 'object' && key === 'params') {
              for (const key2 of Object.keys(value2)) {
                let value3 = value2[key2]
                // 第三层
                if (value3 !== null && value3 !== '' && typeof value3 !== 'undefined') {
                  let params = propName + '.' + key + '[' + key2 + ']'
                  var subPart = encodeURIComponent(params) + '='
                  result += subPart + encodeURIComponent(value3) + '&'
                }
              }
            } else {
              let params = propName + '.' + key
              var subPart = encodeURIComponent(params) + '='
              result += subPart + encodeURIComponent(value2) + '&'
            }
          }
        }
      } else {
        // 第二层
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}
