const express = require('express')
var morgan = require('morgan')
const app = express()
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))
app.use(requestLogger)

let contacts = [
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

app.get('/', (request, response) => {
  response.send('<h1>Base Page</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(contacts)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const contact = contacts.find(contact => contact.id = id)

    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    contacts = contacts.filter(contact => contact.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.random() * (100000000000)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)

    if ((!body.name) || (!body.number)){
        return response.status(400).json({
            error: `name or number invalid/missing`
        })
    }

    if (contacts.some(contact => contact.name === body.name)) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const contact = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    contacts = contacts.concat(contact)
    response.json(contact)
})



app.get('/api/info', (request, response) => {
    const currentDate = new Date();
    response.send(
        `<div>Phonebook has info for ${contacts.length}</div>
        <div>${currentDate}</div>`
    )
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})