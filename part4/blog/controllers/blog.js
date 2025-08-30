const blogRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

// blogRouter.get('/', (request, response) => {
//   Phonebook.find({}).then(phonebooks => {
//     response.json(phonebooks)
//   })
// })

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)

})
blogRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
  // .catch(error => next(error))
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = await User.findById(body.userId)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  try {
    savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }



})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    if (!deletedBlog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

//  "title": "test3",
//     "author": "String ba;a;",
//     "url": " www.test2.com",
//     "likes": 13

blogRouter.put('/:id', async (request, response, next) => {
  const { likes } = request.body
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }
    blog.likes = likes
    savedBlog = await blog.save()
    response.status(200).json(savedBlog)

  }
  catch (error) { next(error) }
}
)

module.exports = blogRouter