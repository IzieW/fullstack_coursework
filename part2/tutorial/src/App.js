import { useState, useEffect } from "react";  // state and effect hooks
import Note from "./components/Note"
import axios from "axios"
import noteService from './services/notes'

const App = () => {
const [notes, setNotes] = useState([])
const [newNote, setNewNote] = useState("")
const [showAll, setShowAll] = useState(true)

const hook = () => {
  console.log("effect")
  noteService
    .getAll()
    .then(response => {
      console.log("promise fulfilled")
      setNotes(response)
    })
}

useEffect(hook, [])

const toggleImportanceOf = (id) => {
  const url = `hppt://localhost:3001/notes/${id}`
  const note = notes.find(n=> n.id === id)
  const changedNote = {...note, important: !note.important}  // toggle importance to opposite of current setting

  noteService.update(id, changedNote).then(response => {
    setNotes(notes.map(n=> n.id !== id ? n: response))
  })
  .catch(error => {
    alert(`the note '${note.content}' was already deleted from the server'`)
  })
  setNotes(notes.filter(n=> n.id !==id))
}

console.log("render", notes.length, "notes")

const notesToShow = showAll ? notes : notes.filter(i => i.important)  // compact conditional, i.important true or false

const addNote = (event) => {
  event.preventDefault()  // prevents default method (ie. causing page to reload)

  const noteObject = {
    content: newNote, 
    date: new Date().toISOString(),
    important: Math.random() < 0.5,
    id: notes.length + 1
  }

  noteService
  .create(noteObject)
  .then(response => {
    setNotes(notes.concat(response))
    setNewNote('')
  })
}

const handleNoteChange = (event) => {
  console.log(event.target.value)
  setNewNote(event.target.value)
}

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick = {()=> setShowAll(!showAll)}>  
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance= { () => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
        onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App;
