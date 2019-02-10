
require('dotenv').config()


const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
var morgan = require('morgan')
const Person = require('./models/person')




const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } next(error)
}

// app.use(unknownEndpoint)
app.use(errorHandler)

morgan.token('json', function(req, res){ return JSON.stringify(req.body); })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))
app.use(express.static('front/build'))
app.use(cors())
app.use(bodyParser.json())

var persons = []

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(d => {
    d = d.map(x => {
      return {
        name: x.name,
        number: x.number,
        id: x._id
      }
    })
    console.log(d)
    res.json(d)
  }).catch(x => next(x))
})

app.get('/api/persons/:id', (req, res, next) => {
  // const id = req.params.id
  Person.findById(req.params.id).then(d => {
    console.log(d)
    d = {
      name: d.name,
      number: d.number,
      id: d._id
    }
    res.json(d)
  }).catch(x => next(x))
  // const p = persons.find(p => p.id == id)
  // p ? res.json(p) : res.status(404).send('no potatoes on the server')
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(x => {
    res.status(204).send('it hus been dalatat')
  }).catch(x => next(x))
})

app.put('/api/persons/:id', (req, res, next) => {
  const p = new Person({
    name: req.body.name,
    number: req.body.number
  })
  Person.findByIdAndUpdate(req.params.id, p, {new: true}).then(x => {
    res.status(200).end()
  }).catch(x => next(x))
})

app.post('/api/persons', (req, res, next) => {
  const person = req.body

  if(persons.find(x => x.name === person.name)){
    res.send('name unique must be')
    return -1
  }else if(person.name == '' || person.name == null){
    res.send('name not null can be')
    return -1
  }else if(person.number == '' || person.number == null){
    res.send('number not null can be')
    return -1
  }

  const p = new Person({
    name: person.name,
    number: person.number,
  })
  p.save().then(x => res.status(200).end()).catch(x => next(x))

})

app.get('/info', (req, res) => {
  res.send(`<p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p>` +
      `<p>${Date()}</p>`)
})




const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
