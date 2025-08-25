const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const logger = require('../utils/logger')
const blogModel = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)



beforeEach(async () => {
  await blogModel.deleteMany({})
  logger.info("clear")
  // helper.initialBlog.forEach(async (note) => {

  //   let blogObject = new blogModel(blog)
  //   await blogObject.save()
  //   logger.info("save")
  // });
  // logger.info("done")
  for (let blog of helper.initialBlog) {
    let blogObject = new blogModel(blog)
    await blogObject.save()
  }
  logger.info("save done")

})

test.only('blog are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test.only('all notes are returned HTTP GET', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlog.length)
})

test('a specific title is within the returned blog', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)
  // logger.info(titles)
  assert.strictEqual(titles.includes('test2'), true)
})

test('blog without title is not added', async () => {
  const newblog = {
    "title": "5",
    "author": "String ba;a;",
    "url": " www.test2.com",
    "likes": 13
  }

  await api
    .post('/api/blogs')
    .send(newblog)
    .expect(400)

  
  const blogAtEnd = await helper.blogsInDb()
  

  assert.strictEqual(blogAtEnd.length, helper.initialBlog.length)
})

test('a valid note can be added ', async () => {
  const newBlog = {
    "title": "test4",
    "author": "String ba;a;",
    "url": " www.test2.com",
    "likes": 13
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()

  const contents = blogAtEnd.map(n => n.title)
  assert.strictEqual(blogAtEnd.length, helper.initialBlog.length + 1)

  assert(contents.includes('test4'))
})

// test('a specific note can be viewed', async () => {
//   const blogsAtStart = await helper.blogsInDb()
//   const noteToView = blogsAtStart[0]

//   const resultNote = await api
//     .get(`/api/blogs/${noteToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   assert.deepStrictEqual(resultNote.body, noteToView)
// })


after(async () => {
  await mongoose.connection.close()
})