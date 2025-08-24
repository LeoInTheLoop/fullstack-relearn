const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const blogs = [
    {
"_id": "68a64ac8227825d79b1ddfd2",
"title": "String",
"author": "String",
"url": "String",
"likes": 10,
"__v": 0
},
{
"_id": "68a7a4d47ab72f45e3c1f85b",
"title": "aaaString",
"author": "String",
"url": "String",
"likes": 10,
"__v": 0
},
{
"_id": "68a7a4e47ab72f45e3c1f85d",
"title": "bbaaaString",
"author": "String",
"url": "String",
"likes": 10,
"__v": 0
},
{
"_id": "68a7a4f27ab72f45e3c1f85f",
"title": "ccbbaaaString",
"author": "String",
"url": "9",
"likes": 9,
"__v": 0
}
]      
emptyList = [] 




describe('totalLikes', () => {
  test('of empty  list is 0', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('of list have one ', () => {
    assert.strictEqual(listHelper.totalLikes([{
"_id": "68a7a4e47ab72f45e3c1f85d",
"title": "bbaaaString",
"author": "String",
"url": "String",
"likes": 10,
"__v": 0
}]), 10)
  })

  test('of bigger list', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 39)
  })
})