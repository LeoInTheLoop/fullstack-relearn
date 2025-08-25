const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true
  },
  author: String,
  url: String,
  likes: Number,
})



module.exports = mongoose.model('Blog', blogSchema)