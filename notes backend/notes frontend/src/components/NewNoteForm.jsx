import { useState } from 'react'



const NewNoteForm = ({ createNote, toggleVisibility }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = async (event) => {
    event.preventDefault()
    if (newNote === '') {
      return
    }
    console.log(newNote)
    const thisNote = {
      content: newNote,
      important: true
    }
    setNewNote('')
    createNote(thisNote)
    toggleVisibility()
  }

  return (
    <div className="formDiv">
      <form onSubmit={addNote}>
        New Note:
        <input
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
          data-testid="note-content"
        />


        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default NewNoteForm