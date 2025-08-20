const phonesRouter = require('express').Router()
const Phonebook = require('../models/phonebooks')

phonesRouter.get('/', (request, response) => {
  Phonebook.find({}).then(phonebooks => {
    response.json(phonebooks)
  })
})

phonesRouter.get('/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then(phonebook => {
      if (phonebook) {
        response.json(phonebook)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

phonesRouter.post('/', (request, response, next) => {
  const body = request.body

  const phonebook = new Phonebook({
    content: body.content,
    important: body.important || false,
  })

  phonebook.save()
    .then(savedPhonebook => {
      response.json(savedPhonebook)
    })
    .catch(error => next(error))
})

phonesRouter.delete('/:id', (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

phonesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Phonebook.findById(request.params.id)
    .then(phonebook => {
      if (!phonebook) {
        return response.status(404).end()
      }

      phonebook.content = content
      phonebook.important = important

      return phonebook.save().then((updatedPhonebook) => {
        response.json(updatedPhonebook)
      })
    })
    .catch(error => next(error))
})

module.exports = phonesRouter