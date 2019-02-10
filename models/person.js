
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })
    .then(result => console.log('connected to MongoDB'))
    .catch((e) => console.log('error connection to MongoDB:', e.message))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

module.exports = mongoose.model('Person', personSchema)
