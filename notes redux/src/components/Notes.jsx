import {useDispatch, useSelector} from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer.js'

const Note = ({note, handleClick}) => {

    return (
        <li onClick={handleClick}>
            {note.important ? <strong>{note.content}</strong> : note.content}
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const handleNoteClick = (id) => dispatch(toggleImportanceOf(id))

    const notes = useSelector(({notes, filter}) => filter ==='ALL' ? notes : notes.filter(n => filter === 'IMPORTANT'?n.important:!n.important))
    return (
        <>
            <ul>
                {notes.map(n =>
                    <Note key={n.id} note={n} handleClick={() => handleNoteClick(n.id)}/>
                )}
            </ul>
        </>
    )
}
//            <button onClick={() => toggleVisibility()}>{visibility ? 'Show All' : 'Show Important Only'}</button>
export default Notes
