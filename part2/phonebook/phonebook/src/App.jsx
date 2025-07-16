import { useState, useEffect } from 'react'
// import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import teleService from './services/teles'





const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    teleService
      .getAll()
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
  const addOrUpdatePerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id:  String(persons.length + 1)
    }
    if (persons.some(person => person.name === newName)) {
      // update
      if(persons.some(person => person.number == newNumber)) {
        alert(`${newName} is already added to phonebook`)
        return
      }
      const personToUpdate = persons.find(person => person.name === newName)
      personObject.id = personToUpdate.id
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        teleService
          .update(personToUpdate.id, personObject)
          .then(response => {
            setPersons(
              persons.map(person => person.id !== personToUpdate.id ? person : response.data)
             )
            setNewName('')
            setNewNumber('')
          })
          // eslint-disable-next-line no-unused-vars
          .catch(error => {
            alert(`Information of ${newName} update failed`)
            
          })
      }

    } else {

      //   2.12: The Phonebook step 7
      // Let's return to our phonebook application.

      // Currently, the numbers that are added to the phonebook are not saved to a backend server. Fix this situation.
      teleService
        .create(personObject)
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
  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      teleService
        .delete(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          alert(`Information of ${persons.find(p => p.id === id).name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onChange={filterHandler} />
      <h2>add a new  </h2>
      <PersonForm
        onSubmit={addOrUpdatePerson}
        newName={newName}
        newNumber={newNumber}
        onNameChange={newNameHandler}
        onNumberChange={newnumbrtHandler}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />

    </div>
  )
}

export default App