/**
 * @description 处理Next的内容
 * @param {String} str
 */
export const matchNextContent = (str) => {
  const contentMatch = str.match(/\((.+?)\):|;/)

  let result = null
  if (contentMatch == null) {
    return result
  }
  /**
   * @type {String}
   *
   */
  const [, matched] = contentMatch
  let _matched = eval(matched)
  if (matched.indexOf('/') >= 0) {
    result = _matched.slice(1)
  }
  // 替换空格
  if (matched.indexOf("'") >= 0) {
    result = matched.replace("'", '"').replace("'", '"')
  }
  if (matched.indexOf(`"`) >= 0) {
    result = matched
  }
  return eval(result)
}
