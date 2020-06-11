/**
 * @description 处理Next的内容
 * @param {String} str
 */
export const matchNextContent = (str) => {
  const contentMatch = str.match(/\((.+?)\)/)
  let result = null
  if (contentMatch == null) {
    return result
  }
  /**
   * @type {String}
   *
   */
  const [, matched] = contentMatch

  if (matched.indexOf("'") >= 0) {
    result = matched.replace("'", '"').replace("'", '"')
  }
  if (matched.indexOf(`"`) >= 0) {
    result = matched
  }
  return eval(result)
}

export const supportPushState = () => {
  console.log(history)
  // const _history = history
  return true
}
