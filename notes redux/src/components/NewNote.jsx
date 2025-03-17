import { createNote } from '../reducers/noteReducer.js'
import { useDispatch } from 'react-redux'
import noteService from '../services/notes.js'

const NewNote = () => {
    const dispatch = useDispatch()

    const addNewNote = async (e) => {
        e.preventDefault()
        const newNote = await noteService.createNew(e.target.note.value)
        dispatch(createNote(newNote))
        e.target.note.value = ''
    }
    return(
        <form onSubmit={addNewNote}>
        <input name="note"/>
        <button type='submit'>Add note</button>
    </form>)
}

export default NewNote