import {createNote} from '../reducers/noteReducer.js'
import { useDispatch } from 'react-redux'

const NewNote = () => {
    const dispatch = useDispatch()

    const addNewNote = (e) => {
        e.preventDefault()
        dispatch(createNote(e.target.note.value))
        e.target.note.value = ''
    }
    return(
        <form onSubmit={addNewNote}>
        <input name="note"/>
        <button type='submit'>Add note</button>
    </form>)
}

export default NewNote