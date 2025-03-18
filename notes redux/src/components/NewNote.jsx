import { createNewNote } from '../reducers/noteReducer.js'
import { useDispatch } from 'react-redux'

const NewNote = () => {
    const dispatch = useDispatch()

    const addNewNote = async (e) => {
        e.preventDefault()
        dispatch(createNewNote({ content: e.target.note.value, important: false }))
        e.target.note.value = ''
    }
    return(
        <form onSubmit={addNewNote}>
        <input name="note"/>
        <button type='submit'>Add note</button>
    </form>)
}

export default NewNote