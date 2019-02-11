
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

mongoose.set('useFindAndModify', true)

mongoose.connect(url, { useNewUrlParser: true })
	.then(console.log('connected to MongoDB'))
	.catch((e) => console.log('error connection to MongoDB:', e.message))

const personSchema = mongoose.Schema({
	name: {type: String, minlength: 3, unique: true, required: true},
	number: {type: String, minlength: 8, unique: false, required: true},
})
personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
