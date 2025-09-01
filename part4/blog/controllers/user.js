const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const saltRounds = 10
  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'password is required and must be at least 3 characters long' })
  }


  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, likes: 1 })
  response.json(users)
})

module.exports = usersRouter