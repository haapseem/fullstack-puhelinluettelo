const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')

app.use(bodyParser.json())

morgan.token('json', function(req, res){ return JSON.stringify(req.body); })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

app.use(express.static('front/build'))

var persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Martti Tienari",
      number: "040-123456",
      id: 2
    },
    {
      name: "Arto Järvinen",
      number: "040-123456",
      id: 3
    },
    {
      name: "Lea Kutvonen",
      number: "040-123456",
      id: 4
    }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const p = persons.find(p => p.id == id)
  p ? res.json(p) : res.status(404).send('no potatoes on the server')
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  console.log(persons)
  res.status(204).send('it hus been dalatat')
})

app.post('/api/persons', (req, res) => {
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

  persons.push({
    name: person.name,
    number: person.number,
    id: persons.reduce((x,y) => Math.max(x ? x : 0,y.id)) + 1,
  })
  res.status(200).end()
})

app.get('/info', (req, res) => {
  res.send(`<p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p><p>${Date()}</p>`)
})




const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
