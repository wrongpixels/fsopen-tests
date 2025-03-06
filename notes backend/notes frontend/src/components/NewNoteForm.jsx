import { useState } from 'react'
import noteService from '../services/notes.js'



const NewNoteForm = ({ setNotes, notes, toggleVisibility }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    if (newNote === '') {
      return
    }
    console.log(newNote)
    const thisNote = {
      content: newNote,
      important: true
    }
    noteService.create(thisNote).then(
      result => {
        setNotes(notes.concat(result))
        setNewNote('')
        toggleVisibility()
      })
  }

  return (
    <>
      <form onSubmit={addNote}>
                New Note:
        <input value={newNote} onChange={({ target }) => setNewNote(target.value)}/>
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default NewNoteForm