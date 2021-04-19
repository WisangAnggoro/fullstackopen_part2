import React, { useState, useEffect } from 'react'
import phonebookService from './phonebookService'


const Filter = ({handleChange}) => {
  return(
    <div>
      filter shown with
      <input type="text" 
        onChange = {handleChange}
      />
    </div>
  )
}

const PersonForm = ({handleSubmit, handleNoteChange, newName, handleNumberChange, newNumber}) => {
  return (
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
  )
}

const Numbers = ({persons, handleDelete}) => {
  return (
    <div>
      {
        persons.map(person => 
          <p key={person.id}>{person.name} {person.number} 
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </p>
        )
      }
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('');  
  const [ filter, setFilter] = useState('');

  const filteredPersons = filter!==''
  ? persons.filter(person => person.name.indexOf(filter)!==-1)
  : persons
  
  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name).indexOf(newName)!==-1) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name : newName,
        number : newNumber,
        id : 0
      }
      phonebookService
        .create(newPerson)
        .then(response => {
          newPerson.id = response.id
          setPersons([...persons, newPerson])
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('error happened');
        })
    }
  }

  const handleDelete = (id) => {
    console.log(id);
    const newPersons = [...persons.filter(person => person.id!==id)]
    window.confirm(`delete ${persons.find(person => person.id===id).name}?`)
    console.log(persons);
    console.log(newPersons);
    phonebookService
      .del({id:id})
      .then(response => {
        setPersons(newPersons)
      })
      .catch(error => {
        console.log();
      })
  }

  useEffect(() => {
    phonebookService
      .getAll()
      .then((response) => {
        setPersons(response)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        handleChange={handleFilter}
      />
      <h3>add a new</h3>
      <PersonForm 
        handleSubmit = {handleSubmit}
        handleNoteChange = {handleNoteChange}
        handleNumberChange = {handleNumberChange}
        newName = {newName}
        newNumber = {newNumber}
      />
      
      {/* <div>debug: {newName}</div> */}
      <h3>Numbers</h3>
      <Numbers 
        persons={filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App