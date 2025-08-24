const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')



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
    "likes": 8,
    "__v": 0
  },
  {
    "_id": "68a7a4e47ab72f45e3c1f85d",
    "title": "bbaaaString",
    "author": "String",
    "url": "String",
    "likes": 11,
    "__v": 0
  },

]
emptyList = []




describe('favoriteBlog', () => {
  test('of empty  list is 0', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('of list have one ', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([{
      "_id": "68a7a4e47ab72f45e3c1f85d",
      "title": "bbaaaString",
      "author": "String",
      "url": "String",
      "likes": 10,
      "__v": 0
    }]),
      {
        "_id": "68a7a4e47ab72f45e3c1f85d",
        "title": "bbaaaString",
        "author": "String",
        "url": "String",
        "likes": 10,
        "__v": 0
      })
  })

  test('of bigger list', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), 
      {
        "_id": "68a7a4e47ab72f45e3c1f85d",
        "title": "bbaaaString",
        "author": "String",
        "url": "String",
        "likes": 11,
        "__v": 0
      })
  })
})