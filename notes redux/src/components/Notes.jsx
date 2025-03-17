import {useDispatch, useSelector} from 'react-redux'
import { replaceNote } from '../reducers/noteReducer.js'
import noteService from '../services/notes.js'

const Note = ({note, handleClick}) => {

    return (
        <li onClick={handleClick}>
            {note.important ? <strong>{note.content}</strong> : note.content}
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const handleNoteClick = async (note) => {
        const editedNote = await noteService.replaceNote({ ...note, important: !note.important})
        dispatch(replaceNote(editedNote))
    }

    const notes = useSelector(({notes, filter}) => filter ==='ALL' ? notes : notes.filter(n => filter === 'IMPORTANT'?n.important:!n.important))
    return (
        <>
            <ul>
                {notes.map(n =>
                    <Note key={n.id} note={n} handleClick={() => handleNoteClick(n)}/>
                )}
            </ul>
        </>
    )
}
//            <button onClick={() => toggleVisibility()}>{visibility ? 'Show All' : 'Show Important Only'}</button>
export default Notes
