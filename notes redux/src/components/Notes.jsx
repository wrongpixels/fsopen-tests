import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer.js'

const Note = ({note, handleClick}) =>{

    return (
        <li onClick={handleClick} >
            {note.important ? <strong>{note.content}</strong> : note.content}
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const visibility = useSelector(s => s.visibility)
    const toggleVisibility = () => dispatch({type: 'TOGGLE'})
    const handleNoteClick = (id) => dispatch(toggleImportanceOf(id))

    const notes = useSelector(s => !visibility ? s.notes : s.notes.filter(n => n.important))
    return (
        <>
        <h1>Notes!</h1>
            <button onClick={() => toggleVisibility()}>{visibility ? 'Show All' : 'Show Important Only'}</button>
            <ul>
            {notes.map(n =>
               <Note key={n.id} note={n} handleClick={() => handleNoteClick(n.id)} />
            )}
        </ul>
        </>
    )
}

export default Notes
