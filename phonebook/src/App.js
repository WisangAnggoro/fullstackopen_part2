import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      number: '082220486790'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('');

  const handleNoteChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).indexOf(newName)!==-1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      let newPerson = {
        name : newName,
        number : newNumber
      }
      setPersons([...persons, newPerson])
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
            onChange = {handleNoteChange} 
            value = {newName}
          />
        </div>
        <div>
          number: <input 
            onChange = {handleNumberChange} 
            value = {newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      {/* <div>debug: {newName}</div> */}
      <h2>Numbers</h2>
      {
        persons.map(person => <p>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App