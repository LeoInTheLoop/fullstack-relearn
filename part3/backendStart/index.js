const express = require('express')
var morgan = require('morgan')
const { v4: uuidv4 } = require('uuid')



const app = express()
app.use(assignId)
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':id :method :url :response-time :body'))

morgan.token('id', function getId (req) {
  return req.id
})

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   if (request.method === 'POST') {
//     console.log('body:    ', request.body)
//   }
//   next()
// }

// app.use(requestLogger)

const cors = require('cors')
app.use(cors())


app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
                <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
    if (person) {
    response.json(person)
    } else {
    response.status(404).end()
    }

})
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  // console.log(person)
    if (!person.name || !person.number) {
        return response.status(400).json({ error: 'name or number missing' })
    }   
    if (persons.find(p => p.name === person.name)) {    
        return response.status(400).json({ error: 'name must be unique' })
    }
  const newPerson = {
    id: (Math.random() * 10000).toFixed(0),
    name: person.name,
    number: person.number
  }
  persons = persons.concat(newPerson)
  response.json(newPerson)  


})



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
    if (note) {
    response.json(note)
    } else {
    response.status(404).end()
    }

})
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)
  response.json(note)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

function assignId (req, res, next) {
  req.id =  uuidv4()
  next()
}