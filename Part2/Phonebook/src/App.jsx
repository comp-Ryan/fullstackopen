import { useState, useEffect } from 'react'
import peopleService from './services/people'
import Notification from './components/notifications'

const Filter = ({filtering, onChange}) => {
  return(
  <div>
    filter shown with <input value={filtering} onChange={onChange}/>
  </div>
  )
}

const PersonForm = ({newName, newNumber, setNewName, setNewNumber, persons, setPersons, setNotificationStatus, setMessage, setNotificationName, setNotificationType}) => {
  const handleNoteChange_name = (event) => setNewName(event.target.value)
  const handleNoteChange_number = (event) => setNewNumber(event.target.value)

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        peopleService.update((persons.find(person => person.name === newName).id), nameObject).then(response => {
          setPersons(persons.map(person => person.name === newName ? response : person))
          setNotificationStatus(true)
          setNotificationType('success')
          setMessage('Updated')
          setNotificationName(newName)
          setTimeout(() => {
            setNotificationType('')
            setNotificationStatus(false)
            setNotificationName('')
            setMessage('')
          }, 2000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage(
            `Information of ${persons.find(p => p.name == newName).name} has already been removed from server`
          )
          setNotificationStatus(true)
          setNotificationType('error')
          setTimeout(() => {
            setNotificationStatus(false)
            setNotificationName('')
            setMessage('')
            setNotificationType('')
          }, 2000)
          setPersons(persons.filter(p => p.name !== newName))
        })
        return
      } else {
        return
      }
    }
    
    peopleService
      .create(nameObject).then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNotificationStatus(true)
        setMessage('Added')
        setNotificationName(newName)
        setNotificationType('success')
        setTimeout(() => {
          setNotificationStatus(false)
          setNotificationName('')
          setMessage('')
          setNotificationType('')
        }, 2000)
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        setMessage(String(error.response.data.error))
        setNotificationStatus(true)
        setNotificationType('error')
        setTimeout(() => {
            setNotificationStatus(false)
            setNotificationName('')
            setMessage('')
            setNotificationType('')
        }, 2000)
    })
  } 

  return(
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNoteChange_name}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNoteChange_number}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({filtering, persons, setPersons, setMessage, setNotificationStatus, setNotificationName, setNotificationType}) => {
  const namesToShow = (filtering == '') ? persons : persons.filter(person => person.name.toLowerCase().includes(filtering.toLowerCase()))
  const Delete = name => {
    if (window.confirm(`Delete ${persons.find(p=>p.name == name).name}`)) {
      peopleService
      .Delete((persons.find(person => person.name === name).id)).then(response =>
        {setPersons(persons.filter(person => person.name != name))}
      )
      .catch(error => {
        setMessage(
          `Information of ${persons.find(p => p.name == name).name} has already been removed from server`
        )
        setNotificationStatus(true)
        setNotificationType('error')
        setTimeout(() => {
          setNotificationStatus(false)
          setNotificationName('')
          setMessage('')
          setNotificationType('')
        }, 2000)
        setPersons(persons.filter(p => p.name !== name))
      })
    } 
  }

  return(<div>
    {namesToShow.map((person) => <div key={person.name}>{person.name} {person.number} <button onClick={()=>Delete(person.name)}>Delete</button></div>)}
  </div>)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtering, setFiltering] = useState('')
  const [showNotification, setNotificationStatus] = useState(false)
  const [notificationName, setNotificationName] = useState('')
  const [message, setMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message} newPerson={notificationName} showNotification={showNotification} notificationType={notificationType}/>
      <Filter filtering={filtering} onChange={(event)=>setFiltering(event.target.value)}/>
      <h2>add a new</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        setNewName={setNewName} 
        setNewNumber={setNewNumber} 
        persons={persons} 
        setPersons={setPersons}
        setNotificationStatus={setNotificationStatus} 
        setMessage={setMessage}
        setNotificationName={setNotificationName}
        setNotificationType={setNotificationType}
      />
      <h2>Numbers</h2>
      <Persons 
        filtering={filtering} 
        persons={persons} 
        setPersons={setPersons} 
        setMessage={setMessage}
        setNotificationStatus={setNotificationStatus} 
        setNotificationName={setNotificationName}
        setNotificationType={setNotificationType}
      />
    </div>
  )
}

export default App