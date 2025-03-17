import noteService from './services/notes.js'
import { useEffect } from 'react'
import { setNotes } from './reducers/noteReducer.js'
import { useDispatch } from 'react-redux'
import NewNote from "./components/NewNote.jsx";
import Notes from './components/Notes.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getNotes = async () => {
           const notes = await noteService.getAll()
            dispatch(setNotes(notes))
        }
        getNotes()
    }, []);
    return (
        <div>
            <h1>Notes!</h1>
            <VisibilityFilter/>
            <Notes/>
            <NewNote/>
        </div>
    )
}

export default App
