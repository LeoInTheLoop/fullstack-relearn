const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const logger = require('../utils/logger')
const blogModel = require('../models/blog')
const { initialBlog } = require('./test_helper')

const api = supertest(app)



beforeEach(async () => {
  await blogModel.deleteMany({})
  let blogObject = new blogModel(initialBlog[0])
  await blogObject.save()
  blogObject = new blogModel(initialBlog[1])
  await blogObject.save()
})

test.only('blog are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test.only('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlog.length)
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

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlog.length)
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

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)


  assert.strictEqual(response.body.length, initialBlog.length + 1)

  assert(contents.includes('test4'))
})

after(async () => {
  await mongoose.connection.close()
})