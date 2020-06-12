import { matchNextContent } from './../src/utlis'
import { _supportPushState, _stateKey } from './../src/index'

test('Not semi next contents', () => {
  //  测试用例
  const notSemiEmptyNext = matchNextContent('next()')
  const notSemiValueSingleNext = matchNextContent(`next('1')`)
  const notSemiValueDoubleNext = matchNextContent(`next("1")`)
  const notSemiValueDoublePathNext = matchNextContent(`next({path:"1"})`)
  const notSemiValueSinglePathNext = matchNextContent(`next({path:'1'})`)
})

test('Semi next Content', () => {
  const SemiNext = matchNextContent(`next();`)
  const SemiSingleNext = matchNextContent(`next('1');`)
  const SemiDoubleNext = matchNextContent(`next("1");`)
  const SemiDoubleDoubleNext = matchNextContent(`next({path:"1"});`)
  const SemiSingPathleNext = matchNextContent(`next({path:'1'});`)
})

test('Has slash contents', () => {
  const NotSemiSingle = matchNextContent(`next('/1')`)
  const NotSemiDouble = matchNextContent(`next("/1")`)
  const NotSemiSinglePath = matchNextContent(`next({path:'/1'})`)
  const NotSemiDoublePath = matchNextContent(`next({path:"/1"})`)
})

test('Has slash and Semi', () => {
  const SemiSingleSlash = matchNextContent(`next('/1');`)
  const SemiDoubleSlash = matchNextContent(`next("/1");`)
  const SemiDoublePathSlash = matchNextContent(`next({path:"/1"});`)
  const SemiSinglePathSlash = matchNextContent(`next({path:'/1'});`)
})

test('Is support history', () => {
  const isSupport = _supportPushState()
  expect(isSupport).toBe(true)
})

// 是否为最新
test('has performace time', () => {
  const performaceKey = _stateKey()
  expect(performaceKey).toBeString()
  expect(+performaceKey).toBeNumber()
})

