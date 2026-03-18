const express = require('express')
const morgan = require('morgan')
const app = express()
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const Contact = require('./models/Contact')

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
app.use(express.static('dist'))

app.get('/api/persons', (request, response, next) => {
    Contact.find({})
        .then(contacts => {
            response.json(contacts)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id)
        .then(contact => {
            response.json(contact)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if ((!body.name) || (!body.number)){
        return response.status(400).json({
            error: `name or number invalid/missing`
        })
    }

    Contact.find({name:body.name})
        .then(contacts => {
            if (contacts.length > 0) {
                response.status(400).json({
                    error: "name already exists"
                })
            }
            else {
                const contact = new Contact({
                    name: body.name,
                    number: body.number
                })

                contact.save().then(savedContact => {
                    response.json(savedContact).catch(error => next(error))
                })
            }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body

    Contact.findById(request.params.id)
        .then(contact => {
            if (!contact) {
                return response.status(404).end()
            }

            contact.name = name
            contact.number = number

            return contact.save().then((updatedContact) => {
                response.json(updatedContact)
            })
        })
        .catch(error => next(error))
})

app.get('/api/info', (request, response) => {
    const currentDate = new Date();
    response.send(
        `<div>Phonebook has info for ${contacts.length}</div>
        <div>${currentDate}</div>`
    )
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError'){
        return response.status(400).send({error:'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})