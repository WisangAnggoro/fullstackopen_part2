import React, { useState, useEffect } from 'react'
import phonebookService from './phonebookService'
import './index.css'

const Notification = ({ message, status }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={status}>
      {message}
    </div>
  )
}

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
  const [ notifMessage, setNotifMessage] = useState('');
  const [ notifStatus, setNotifStatus] = useState('');

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
    const newPerson = {
      name : newName,
      number : newNumber,
      id : 0
    }
    if(persons.map(person => person.name).indexOf(newName)!==-1) {
      const updateConfirm = window.confirm(`${newName} is already added to phonebook, replace old number?`)
      if(updateConfirm){
        newPerson.id = persons.find(person => person.name===newName).id
        handleUpdate(newPerson)
      }
    } else {
      phonebookService
        .create(newPerson)
        .then(response => {
          newPerson.id = response.id
          setPersons([...persons, newPerson])
          setNewName('')
          setNewNumber('')
          setNotifMessage(`Added ${newPerson.name}`)
          setNotifStatus('success')
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  const handleUpdate = (object) => {
    const filteredPersons = [...persons.filter(person => person.id!==object.id)]
    phonebookService
      .update(object.id, object)
      .then(response => {
        setPersons([...filteredPersons, object])
        setNewName('')
        setNewNumber('')
        setNotifMessage(`updated ${object.name}`)
        setNotifStatus('success')
      })
      .catch(error => {
        console.log(error);
        setNotifMessage(`${object.name} already deleted from server`)
        setNotifStatus('error')
        const newPersons = [...persons.filter(person => person.id!==object.id)]
        setPersons(newPersons)
      })
  }

  const handleDelete = (id) => {
    const deleteConfirm = !window.confirm(`delete ${persons.find(person => person.id===id).name}?`)
    if(deleteConfirm){
      return;
    }
    const newPersons = [...persons.filter(person => person.id!==id)]
    phonebookService
      .del({id:id})
      .then(response => {
        setPersons(newPersons)
      })
      .catch(error => {
        console.log(error);
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
      <Notification
        message={notifMessage}
        status={notifStatus}
      />
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