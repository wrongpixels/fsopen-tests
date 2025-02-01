import {useState, useEffect} from 'react';
import Note from './components/Note';
import noteService from './services/notes.js'
import './index.css'
import Notification from "./components/notification.jsx";

const doUpdateNote = (updatedNote, allNotes) => allNotes.map(note => note.id === updatedNote.id?updatedNote:note);

const App = () => {
const [notes, setNotes] = useState(null);
const [newNote, setNewNote] = useState('new note!');
const [showAll, setShowAll] = useState(true);
const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        noteService.getAll().then(response => setNotes(response));
    }, []);
const addNote = (event) => {
    event.preventDefault();
    if (newNote === '')
    {
        return;
    }
    console.log(newNote);
    const thisNote = {
        content: newNote,
        important: Math.random() < 0.5
    };
    noteService.create(thisNote).then(
        result => {
            setNotes(notes.concat(result));
            setNewNote('');
    })
}

const handleEditNote = (event) => {
    setNewNote(event.target.value);
}

const wipeErrorMessage = () => setErrorMessage('');

const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled');
    let note = notes.find(_note => _note.id === id);
    if (id === 99999)
    {
        note = {content: 'jaja', id: '9999999', important: false}
    }
    const newNote = {...note, important: !note.important};

    noteService.updateNote(newNote).then(result=> setNotes(doUpdateNote(result, notes))).catch(error => {
        console.log('There was an error. Note does not exist anymore');
        setErrorMessage(`Error: Note ${newNote.content} was already removed`);
        setTimeout(wipeErrorMessage, 5000);
        setNotes(notes.filter(n => n.id !== id));
    });
}
    const notesToShow = showAll?notes:notes.filter(note => !note.important);
    const mainHeaderStyle = {
        color: 'darkblue',
        fontStyle: 'italic',
        fontSize: 35
    };
    return (
        <div>
            <h1 style={mainHeaderStyle}>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={()=>setShowAll(!showAll)}>{showAll?'Only Show Important':'Show All'}</button>
            </div>
            <ul>
                {notesToShow?.map(note =>
                    <Note key={note.id} note={note} toggleImportanceOf={()=>toggleImportanceOf(note.id)}/>
                )}
            </ul>
            <form onSubmit={addNote}>
            <input value={newNote} onChange={handleEditNote}/>
                <button type="submit">Add</button>
            </form>
            <button className={'errorButton'} onClick={() => toggleImportanceOf(99999)}>Cause an error!</button>
            <Footer />
        </div>
    )
}

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontSize: 16,
        fontStyle: 'italic'
    }
    return(
        <div style={footerStyle}>
            <br/>
            <em>Note app, Department of WTF of Helsinki</em>
        </div>
    )
}
export default App