import { createNote, toggleImportanceOf } from './reducers/noteReducer.js';
import { useSelector, useDispatch } from 'react-redux';
import NewNote from "./components/NewNote.jsx";
import Notes from './components/Notes.jsx'

const App = () => {

    return (
        <div>
            <Notes />
            <NewNote />
        </div>
    )
}

export default App
