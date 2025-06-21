import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'






const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const filterHandler = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const newnumbrtHandler = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const newNameHandler = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      
    } else {
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )
  const personsToShow = newFilter ? filteredPersons : persons



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onChange={filterHandler} />
      <h2>add a new  </h2>
      <PersonForm 
        onSubmit={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        onNameChange={newNameHandler} 
        onNumberChange={newnumbrtHandler}
      />
      <h2>Numbers</h2>
    <Persons persons={personsToShow} />

    </div>
  )
}

export default App