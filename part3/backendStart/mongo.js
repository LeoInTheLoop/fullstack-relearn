const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://klkolly7676:${password}@relearnfullstack.4kmabv6.mongodb.net/noteApp?retryWrites=true&w=majority&appName=relearnFullstack`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

//retrieve all notes
if (process.argv.length === 3) {
  Phonebook.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}else{

//add a new note
const phonebook = new Phonebook({
  name: process.argv[3],
  number: process.argv[4],
})

phonebook.save().then(result => {
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  mongoose.connection.close()
})

}


