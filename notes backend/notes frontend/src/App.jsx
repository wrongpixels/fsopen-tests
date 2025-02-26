import {useState, useEffect} from 'react'
import Note from './components/Note';
import noteService from './services/notes.js'
import loginServices from './services/login.js'
import {save, addToExisting, load, remove} from './services/storageService.js'
import './index.css'
import Notification from "./components/notification.jsx"

const doUpdateNote = (updatedNote, allNotes) => allNotes.map(note => note.id === updatedNote.id ? updatedNote : note)

const App = () => {
    const [user, setUser] = useState(null)
    const [notes, setNotes] = useState(null)
    const [newNote, setNewNote] = useState('new note!')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        noteService.getAll().then(response => setNotes(response))
        const loadedUser = load('loggedUser')
        if (loadedUser) {
            if (loadedUser.token) {
                setUser(loadedUser)
                noteService.setToken(loadedUser.token)
            }
        }

    }, []);
    const addNote = (event) => {
        event.preventDefault();
        if (newNote === '') {
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

    const sendErrorMessage = (message) => {
        setErrorMessage(message)
        setTimeout(wipeErrorMessage, 5000);
    }

    const handleEditNote = (event) => {
        setNewNote(event.target.value);
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log(username, password, 'to login')
        try {
            const user = await loginServices.loginUser({username, password})
            sendErrorMessage(`Welcome back, ${user.name}!`)
            setPassword('')
            setUsername('')
            setUser(user)
            save('loggedUser', user)
            noteService.setToken(user.token)
        } catch (error) {
            sendErrorMessage('Wrong user or password')
        }

    }

    const wipeErrorMessage = () => setErrorMessage('');

    const toggleImportanceOf = (id) => {
        console.log('importance of ' + id + ' needs to be toggled');
        let note = notes.find(_note => _note.id === id);
        if (id === 99999) {
            note = {content: 'jaja', id: '9999999', important: false}
        }
        const newNote = {...note, important: !note.important};

        noteService.updateNote(newNote).then(result => setNotes(doUpdateNote(result, notes))).catch(error => {
            console.log('There was an error. Note does not exist anymore');
            setErrorMessage(`Error: Note ${newNote.content} was already removed`);
            setTimeout(wipeErrorMessage, 5000);
            setNotes(notes.filter(n => n.id !== id));
        });
    }
    const notesToShow = showAll ? notes : notes.filter(note => !note.important);
    const mainHeaderStyle = {
        color: 'darkblue',
        fontStyle: 'italic',
        fontSize: 35
    }

    const showUserName = () => <h2><p>Welcome back, {user.name}!</p></h2>

    const loginForm = () => {
        if (user) {
            return (<div>
            </div>)
        }
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            name="Username"
                            value={username}
                            type="text"
                            onChange={({target}) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            name="Password"
                            value={password}
                            type="password"
                            onChange={({target}) => setPassword(target.value)}/>
                    </div>
                    <br/>
                    <div>
                        <button type='submit'>Sign in</button>
                        <br/>
                    </div>
                </form>
                <br/><br/>
            </div>
        )
    }

    const newNoteForm = () => {
        if (!user) {
            return (<></>)
        }
        return (
            <>
                <form onSubmit={addNote}>
                    <input value={newNote} onChange={handleEditNote}/>
                    <button type="submit">Add</button>
                </form>
                <button className={'errorButton'} onClick={() => toggleImportanceOf(99999)}>Cause an error!</button>
            </>)
    }

    const logOut = () => {
        remove('loggedUser')
        setUser(null)
    }

    const logOutButton = () => (
        <>
            <button onClick={logOut}>Log out</button>
            <br/><br/>
        </>
    )


    return (
        <div>
            <h1 style={mainHeaderStyle}>Notes</h1>
            <Notification message={errorMessage}/>
            {user ? showUserName() : loginForm()}
            {user && logOutButton()}
            <div>
                <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Only Show Important' : 'Show All'}</button>
            </div>
            <ul>
                {notesToShow?.map(note =>
                    <Note key={note.id} note={note} toggleImportanceOf={() => toggleImportanceOf(note.id)}/>
                )}
            </ul>
            {user && newNoteForm()}
            <Footer/>
        </div>
    )
}

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontSize: 16,
        fontStyle: 'italic'
    }
    return (
        <div style={footerStyle}>
            <br/>
            <em>Note app, Department of WTF of Helsinki</em>
        </div>
    )
}
export default App