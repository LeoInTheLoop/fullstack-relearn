//require
const express = require('express')
var morgan = require('morgan')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()
const Phonebook = require('./models/phonebooks')


//difine some use

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  if (request.method === 'POST') {
    console.log('body:    ', request.body)
  }
  next()
}






//use
const app = express()
app.use(express.static('dist'))

app.use(express.json())
app.use(requestLogger)
app.use(assignId)


morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':id :method :url :response-time :body'))

morgan.token('id', function getId (req) {
  return req.id
})


// let persons = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]



const cors = require('cors')
app.use(cors())


app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then(phonebooks => {
    response.json(phonebooks)
  })
})
app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${Phonebook.find({}).length} people</p>
                <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  
  Phonebook.findById(request.params.id)
    .then(
      phonebook => {if (phonebook) {
              response.json(phonebook)
            } else {
              response.status(404).end()
            }
    })
    .catch(error => next(error))
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })

   
})
app.delete('/api/persons/:id', (request, response) => {
  Phonebook.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  // 查找是否存在同名记录
  Phonebook.findOne({ name })
    .then(existingPerson => {
      if (existingPerson) {
        // 更新已存在记录
        existingPerson.number = number
        return existingPerson.save()
          .then(updatedPerson => response.json(updatedPerson))
      } else {
        // 创建新记录
        const newPerson = new Phonebook({ name, number })
        return newPerson.save()
          .then(savedPerson => response.json(savedPerson))
      }
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Phonebook.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// app.get('/api/notes', (request, response) => {
//   response.json(notes)
// })
// app.get('/api/notes/:id', (request, response) => {
//   const id = request.params.id
//   const note = notes.find(note => note.id === id)
//     if (note) {
//     response.json(note)
//     } else {
//     response.status(404).end()
//     }

// })
// app.delete('/api/notes/:id', (request, response) => {
//   const id = request.params.id
//   notes = notes.filter(note => note.id !== id)

//   response.status(204).end()
// })

// app.post('/api/notes', (request, response) => {
//   const note = request.body
//   console.log(note)
//   response.json(note)
// })




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

function assignId (req, res, next) {
  req.id =  uuidv4()
  next()
}
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)