
require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
var morgan = require('morgan')
const Person = require('./models/person')

morgan.token('json', function(req){ return JSON.stringify(req.body) })
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
		}); res.json(d)
	}).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id).then(d => {

		res.json(d).end()
	}).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id).then(
		res.status(204).send('it hus been dalatat')
	).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
	const p = {
		name: req.body.name,
		number: req.body.number
	}
	Person.findByIdAndUpdate(req.params.id, p, {new: true}).then(x => {
		res.send(x)
		res.status(200).end()
	}).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
	const person = req.body

	const p = new Person({
		name: person.name,
		number: person.number,
	})
	p.save().then(res.status(200).end()).catch(error => next(error))
})

app.get('/info', (req, res) => {
	res.send(`<p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p>` +
      `<p>${Date()}</p>`)
})


// errir handler
app.use((error, request, response, next) => {
	console.error(error.message)
	if (error.name === 'CastError' && error.kind == 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} next(error)
})

// uknown endpoint
app.use((request, response) => response.status(404).send({ error: 'unknown endpoint' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
