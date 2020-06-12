import { matchNextContent } from './../src/utlis'

test('it should parse next() function  ', () => {
  const _emptyNull = matchNextContent('next()')
  const _obliquePath = matchNextContent("next('/1')")
  const _singleQuotePath = matchNextContent(`next('1')`)
  // const _doubleQuotePath = matchNextContent(`next("1")`)
  // const _singleQuotePathObject = matchNextContent(`next({path:'1'})`)
  // const _doubleQuotePathObject = matchNextContent(`next({path:"1"})`)

  expect(_emptyNull).toBe(null)
  expect(_singleQuotePath).toBe('1')
  // expect(_doubleQuotePath).toBe('1')
  // expect(_singleQuotePathObject).toBe('1')
  // expect(_doubleQuotePathObject).toBe('1')
})

