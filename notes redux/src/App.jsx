import { createNote, toggleImportanceOf } from './reducers/noteReducer.js';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {

    const dispatch = useDispatch()
    const notes = useSelector(s => s.notes)
    const visibility = useSelector(s => s.visibility)

    const addNote = (note) => {
        dispatch(createNote(note))
    }

    const cleanNotes = () => dispatch({type: 'WIPE_NOTES'})
    const toggleVisibility = () => dispatch({type: 'TOGGLE'})
    const changeNoteImportance = (id) => dispatch(toggleImportanceOf(id))
    const getNotes = () => {
        const visibleNotes = visibility?notes.filter(n => n.important):notes
        return(
            <ul>
                {visibleNotes.map(n =>
                    <li key={n.id}
                        onClick={() => changeNoteImportance(n.id)}
                    >
                        {n.important ? <strong>{n.content}</strong> : n.content}
                    </li>
                )}
            </ul>
        )
    }
    const addNewNote = (e) => {
        e.preventDefault()
        addNote(e.target.note.value)
        e.target.note.value = ''
    }
    return (
        <div>
            <h1>Notes!</h1>
            <button onClick={() => toggleVisibility()} >{visibility?'Show All':'Show Important Only'}</button>
            {getNotes()}
            <form onSubmit={addNewNote}>
                <input name="note" />
                <button type='submit'>Add note</button>
            </form>
        </div>
    )
}

export default App
