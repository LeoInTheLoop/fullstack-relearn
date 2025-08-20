import { useState, useEffect } from 'react'
// import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import teleService from './services/teles'





const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationCss, setNotificationCss] = useState('error')

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
      // id:  String(persons.length + 1)
    }
    // 2.16: Phonebook step 11
    // Use the improved error message example from part 2 as a guide to show a notification that lasts for a few seconds after a successful operation is executed (a person is added or a number is changed):

    if (persons.some(person => person.name === newName)) {
      // update
      if (persons.some(person => person.number == newNumber)) {
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

            setNotification(`Updated ${newName}'s number`)
            setNotificationCss('notification')
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
          setNotification(`Added ${newName}`)
          setNotificationCss('notification')
        })
        .catch(error => {
          console.error('Create failed:', error)
          setNotification(`Failed to add because ${error.response.data.error}`)
          setNotificationCss('error')
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

          setNotification(`Deleted ${persons.find(p => p.id === id).name}`)
          setNotificationCss('error')
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
      <h2>Phonebook fly</h2>
      <Notification message={notification} notificationCss={notificationCss} />
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