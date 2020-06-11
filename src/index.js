import { matchNextContent } from './utlis'
/**
 * @type {Boolean}
 * */

let hasHash = (value) => {
  const { hash } = location
  return hash.indexOf(value) > 0
}
/**
 * @type {Boolean}
 */

export const _supportPushState =
  (window || window.history) && typeof window.history.pushState === 'function'

export const _stateKey =
  window && (window.performance || performance) && performance.now
    ? window.performance.now().toFixed(3)
    : Date.now().toFixed(3)

class HistoryRouter {
  constructor() {
    this.history = window.history || history
    window.location.href = '#/'
  }

  /**
   * @param {String} url
   * @return {Boolean}
   */
  _resolvePath(url) {
    const isBoolean = typeof url === 'boolean'
    const isObject = typeof url === 'object'
    const isUndefined = typeof url === 'undefined'
    const isNull = url != url
    if (isUndefined) url = ''
    if (isNull) return
    if (isBoolean && !url) return
    if (isObject && !isNull && !'path' in url) return

    return url.path ? url.path : url
  }
  /**
   * @param {String} url
   * @param {boolean} repalce
   * */

  pushState(url, repalce) {
    if (repalce) {
      this.history.replaceState({ key: this._stateKey }, null, url)
    } else {
      history.pushState({ key: this._stateKey }, '', url)
    }
  }
  /**
   * @param {String} url
   * */

  replaceState(url) {
    this.pushState(url, true)
  }
}

class Router extends HistoryRouter {
  constructor() {
    super()
    const { hash } = location
    this.route = {
      fullPath: hash,
      path: hash,
    }

    this._cachePath = null
    this._hash = window.location.hash || location.hash
    this.beforeHooks = []
    this.afterHooks = []
    const interceptorFns = ['go', 'forward', 'back']
    for (let index = 0; index < interceptorFns.length; index++) {
      const element = interceptorFns[index]
      const _element = this[element]
      this[element] = (...arg) => {
        _element(...arg)
      }
    }

    const _beforeEach = this.beforeEach
    this.beforeEach = (next) => {
      const nextContent = matchNextContent(next)
      console.log(nextContent)
      // TODO 提取Next
    }
    const _push = this.push

    /**
     * @param {string} path
     * @param {Object} entry
     * @param {Function} entry.beforeEntry
     * @param {Function} entry.afterEntry
     */

    this.push = (path, entry) => {
      this._cachePath = path
      if (entry && (entry.beforeEntry || entry.afterEntry)) {
        const { afterEntry, beforeEntry } = entry
        const _queeu_ = [afterEntry, path, beforeEntry]
        for (let index = 0; index < _queeu_.length; index++) {
          const element = _queeu_[index]
          const type = typeof element
          if (type === 'function') {
            if (element.name === 'beforeEntry') {
              const next = this._isEmptyNext(entry, element.name)
              next
                ? _push(path)
                : element.call(this, path, this.route.path, _push)
            }
            if (element.name === 'afterEntry') {
              element.call(this, path, this.route.path)
            }
          }
        }
      } else {
        _push(path)
      }
    }

    this.init()
  }
  _isEmptyNext(entry, name) {
    return entry[name].toString().match(/next\(\)+.?/)
  }

  /**
   * @description 注册进入的hook
   *
   */
  registerEntryHook() {}
  getRoute() {
    return this.route
  }
  //   全局监听的话，需要从这里动手脚
  init() {
    window.addEventListener('hashchange', this.refresh, false)
  }
  /**
   * @param {Function} cb
   * */

  refresh(cb) {
    if (typeof cb === 'function') {
      cb.call(null, this.getRoute)
    }
  }
  /**
   * @param {Number} n
   */
  go(n) {
    super.history.go(n)
  }
  forward() {
    super.history.go(1)
  }
  back() {
    super.history.go(-1)
  }
  /**
   * @param {String|Boolean|Object} url
   * @param {String} url.path
   * @param {Object} entry
   * @param {Function} entry.beforeEntry
   * @param {Function} entry.afterEntry
   */

  push(url, event) {
    const { hash } = location
    const _url = super._resolvePath(url)
    super.pushState(hash + _url)
  }
  /**
   * @param {string}
   */
  replace(path) {
    super.replaceState(location.hash + path)
  }
  /**
   * @param {Array}
   */
  beforeEach(cb) {
    cb.call(this, this.route, this.route, this.push)
  }
}

const router = new Router()
router.push('123', {
  beforeEntry(to, from, next) {
    next()
  },
})
router.push('/1231')
router.push('/1231324')
router.go(1)
router.beforeEach((to, from, next) => {
  next('/1')
})
