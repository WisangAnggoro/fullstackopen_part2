import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNoteChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let newPerson = {name : newName}
    setPersons([...persons, newPerson])
    setNewName('')
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
          <button type="submit">add</button>
        </div>
      </form>
      {/* <div>debug: {newName}</div> */}
      <h2>Numbers</h2>
      {
        persons.map(person => <p>{person.name}</p>)
      }
    </div>
  )
}

export default App