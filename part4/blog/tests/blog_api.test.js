const { test, after, beforeEach, describe } = require('node:test')
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

  //  await Note.insertMany(helper.initialNotes)!!
  for (let blog of helper.initialBlog) {
    let blogObject = new blogModel(blog)
    await blogObject.save()
  }
  logger.info("save done")

})

test('blog are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all notes are returned HTTP GET', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlog.length)
})

test('a specific title is within the returned blog', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(e => e.title)
  // logger.info(titles)
  assert.strictEqual(titles.includes('test2'), true)
})

describe('addition of a new note', () => {
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

test('a valid note can be added HTTP POST', async () => {
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
test('a note have id property', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const noteToView = blogsAtStart[0]
  // logger.info(noteToView)
  assert.ok(noteToView.id)
})
test('note like default 0 ', async () => {
  const newBlog = {
    "title": "test4",
    "author": "String ba;a;",
    "url": " www.test2.com",
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('a note can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  // logger.info(blogToDelete)    
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)  
  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})