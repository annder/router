import { matchNextContent } from './../src/utlis'

test('Not semi next contents', () => {
  //  测试用例
  const notSemiEmptyNext = matchNextContent('next()')
  const notSemiValueSingleNext = matchNextContent(`next('1')`)
  const notSemiValueDoubleNext = matchNextContent(`next("1")`)
  const notSemiValueDoublePathNext = matchNextContent(`next({path:"1"})`)
  const notSemiValueSinglePathNext = matchNextContent(`next({path:'1'})`)

  expect(notSemiEmptyNext).toBe('')
  expect(notSemiValueSingleNext).toBe('1')
  expect(notSemiValueDoubleNext).toBe('1')
  expect(notSemiValueDoublePathNext).toBe('1')
  expect(notSemiValueSinglePathNext).toBe('1')
})

test('Semi next Content', () => {
  const SemiNext = matchNextContent(`next();`)
  const SemiSingleNext = matchNextContent(`next('1');`)
  const SemiDoubleNext = matchNextContent(`next("1");`)
  const SemiDoubleDoubleNext = matchNextContent(`next({path:"1"});`)
  const SemiSingPathleNext = matchNextContent(`next({path:'1'});`)

  expect(SemiNext).toBe('')
  expect(SemiSingleNext).toBe('1')
  expect(SemiDoubleDoubleNext).toBe('1')
  expect(SemiDoubleNext).toBe('1')
  expect(SemiSingPathleNext).toBe('1')
})

test('Has slash contents', () => {
  const NotSemiSingle = matchNextContent(`next('/1')`)
  const NotSemiDouble = matchNextContent(`next("/1")`)
  const NotSemiSinglePath = matchNextContent(`next({path:'/1'})`)
  const NotSemiDoublePath = matchNextContent(`next({path:"/1"})`)

  expect(NotSemiSingle).toBe('1')
  expect(NotSemiDouble).toBe('1')
  expect(NotSemiSinglePath).toBe('1')
  expect(NotSemiDoublePath).toBe('1')
})

test('Has slash and Semi', () => {
  const SemiSingleSlash = matchNextContent(`next('/1');`)
  const SemiDoubleSlash = matchNextContent(`next("/1");`)
  const SemiDoublePathSlash = matchNextContent(`next({path:"/1"});`)
  const SemiSinglePathSlash = matchNextContent(`next({path:'/1'});`)

  expect(SemiDoublePathSlash).toBe('1')
  expect(SemiSinglePathSlash).toBe('1')
  expect(SemiDoubleSlash).toBe('1')
  expect(SemiSingleSlash).toBe('1')
})
