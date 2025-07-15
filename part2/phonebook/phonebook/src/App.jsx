import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'






const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])



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

      //   2.12: The Phonebook step 7
      // Let's return to our phonebook application.

      // Currently, the numbers that are added to the phonebook are not saved to a backend server. Fix this situation.
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })


    }


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