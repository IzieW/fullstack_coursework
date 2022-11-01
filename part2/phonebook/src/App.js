import {useState, useEffect } from "react"
import axios from "axios"
import personService from "./services/persons"

// Simple phone book app - add names to phone book
const Contact = (props) => (
  <li key={props.name}> {props.name}{props.number}</li>
)
const Persons = ({persons, handleDeletion}) => {
  return (
    <ul>
    {persons.map(person => 
      <li key= {person.name}>
        {person.name} {person.number} <button onClick = {() => handleDeletion(person.id)}>delete</button>
        </li>)
    }
  </ul>
  )
}

const Filter = ({search, handler}) => {
    return (
      <div>
      filter shown with <input value={search} onChange={(event=> handler(event.target.value))}/>
      </div>
    )
  }
const PersonsForm = ({updateNames, newName, newNumber, setName, setNumber}) => (
  <form onSubmit={updateNames}>
        <div> name: <input value={newName} onChange={(event)=> setName(event.target.value)}/> </div>
        <div> number: <input value={newNumber} onChange={(event) => setNumber(event.target.value)}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const App = () => {

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setNewSearch] = useState("")

  const [persons, setPersons] = useState([])


  const hook = () => {
    personService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  }

  useEffect(hook, [])

  const updateNames = (event) => {
      event.preventDefault()
      const match = persons.find(person => JSON.stringify(person.name) === JSON.stringify(newName))
      if (!match) {  // if there are not matches
      //setPersons(persons.concat({name: newName, number:newNumber}))
      personService.create( {name: newName, number:newNumber})
      .then(response => {
        setPersons(persons.concat(response))
        setNewNumber("")
        setNewName("")}
        )

      } else {
        if (window.confirm(match.name + " is already added to the phonebook, replace the old number with a new one?")){
          console.log({...match, number:newNumber})
          personService.update(match.id, {...match, number: newNumber})
          .then( response => {
            setPersons(persons.map(person => person.id !== match.id ? person: response))
          }
          )
        }
      }
  }

  const filterSearch = () => (
     persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
     )

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    console.log(personToDelete)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
    setPersons(persons.filter(person => person.id !== id))
    personService.deleteContact(id)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search = {newSearch} handler = {setNewSearch} />
      <h2> Add a new contact </h2>
      <PersonsForm updateNames = {updateNames} newName = {newName} newNumber= {newNumber} setName = {setNewName} setNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons= {filterSearch()} handleDeletion = {deletePerson}/>
    </div>
  )

}

export default App