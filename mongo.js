const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// asdf01
const url = `mongodb://asdf:${password}@ds221645.mlab.com:21645/fstack`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

// const Note = mongoose.model('Note', noteSchema)
//
// const note = new Note({
//   content: 'HTML on helppoa',
//   date: new Date(),
//   important: true,
// })
//
// note.save().then(response => {
//   console.log('note saved!');
//   mongoose.connection.close();
// })

const Person = mongoose.model('Person', personSchema)

if(process.argv.length > 3){
  const p = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  p.save().then(response => mongoose.connection.close())
}else{
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
