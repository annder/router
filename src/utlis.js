/**
 * @description 处理Next的内容
 * @param {String} str
 */
export const matchNextContent = (str) => {
  const contentMatch = str.match(/\((.+?)\)|\;/)
  if (contentMatch == null || contentMatch[1] === undefined) {
    return ''
  }
  const [, matched] = contentMatch

  /**
   * @type {String}
   * */
  let result = eval(matched)
  
  if (result.indexOf('/') >= 0) {
    result = result.slice(1)
  }
  return result
}
