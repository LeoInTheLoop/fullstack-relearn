import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1  }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
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
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={newNameHandler} />
        </div>
        <div>number: <input value={newNumber} onChange={newnumbrtHandler} /></div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name + "  "+ person.number}  </li>
        ))}
      </ul>
      <div>debug: {newName}</div>
      <div>debug: allperson: {JSON.stringify(persons)}</div>
    </div>
  )
}

export default App