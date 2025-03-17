import { createNote, toggleImportanceOf } from './reducers/noteReducer.js';
import { useSelector, useDispatch } from 'react-redux';
import NewNote from "./components/NewNote.jsx";
import Notes from './components/Notes.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'

const App = () => {

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
