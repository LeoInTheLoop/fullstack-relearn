const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// blogRouter.get('/', (request, response) => {
//   Phonebook.find({}).then(phonebooks => {
//     response.json(phonebooks)
//   })
// })

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})
blogRouter.get('/:id',async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
    // .catch(error => next(error))
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  savedBlog = await blog.save()

  blog.save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogRouter