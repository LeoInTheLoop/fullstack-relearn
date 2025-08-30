const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlog = [
  {
    "title": "test3",
    "author": "String ba;a;",
    "url": " www.test2.com",
    "likes": 13
  },
  {
    "title": "test2",
    "author": "String ba;a;",
    "url": " www.test2.com",
    "likes": 7
  },
]

const nonExistingId = async () => {
  const note = new Blog({
    "title": "willremovethissoon",
    "author": "String ba;a;",
    "url": " www.test2.com",
    "likes": 7
  })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
module.exports = {
  initialBlog, 
  nonExistingId, 
  blogsInDb, 
  usersInDb
}