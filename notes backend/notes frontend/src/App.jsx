import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import noteService from './services/notes.js'
import { save, addToExisting, load, remove } from './services/storageService.js'
import './index.css'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import Toggleable from './components/Toggleable.jsx'
import NewNoteForm from './components/NewNoteForm.jsx'


const doUpdateNote = (updatedNote, allNotes) => allNotes.map(note => note.id === updatedNote.id ? updatedNote : note)

const App = () => {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const loginRef = useRef()
  const noteRef = useRef()

  useEffect(() => {
    const fetchData = async () => {
      const notes = await noteService.getAll()
      setNotes(notes)

      const loadedUser = load('loggedUser')
      if (loadedUser?.token) {
        setUser(loadedUser)
        noteService.setToken(loadedUser.token)
      }
    }
    fetchData()
  }, [])

  const sendErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(wipeErrorMessage, 5000)
  }

  const handleEditNote = (event) => {
    // setNewNote(event.target.value);
  }



  const wipeErrorMessage = () => setErrorMessage('')

  const toggleImportanceOf = async (id) => {
    const note = notes.find(_note => _note.id === id)

    const newNote = { important: !note.important }
    try {
      console.log('importance of ' + id + ' needs to be toggled')
      const result = await noteService.updateNote(newNote, id)
      setNotes(doUpdateNote(result, notes))

    } catch (error) {
      console.log('There was an error. Note does not exist anymore')
      setErrorMessage(`Error: Note ${newNote.content} was already removed`)
      setTimeout(wipeErrorMessage, 5000)
      setNotes(notes.filter(n => n.id !== id))
    }
  }
  const notesToShow = showAll ? notes : notes.filter(note => !note.important)
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
    return(
      <div>
        <Toggleable labelVisible='Close Login'
          labelInvisible='Show Login'
          visibilityOnStart={false}
          ref={loginRef}
        >
          <LoginForm loginVisible={loginVisible}
            setLoginVisible={setLoginVisible}
            save={save}
            setUser={setUser}
            sendErrorMessage={sendErrorMessage}
          />
        </Toggleable>
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
        <Toggleable
          visibilityOnStart={true}
          ref={noteRef}
          labelVisible="Hide notes"
          labelInvisible="Show notes"
          toggleVisibility={() => noteRef.current.toggleVisibility()}
        >
          <NewNoteForm
            notes={notes}
            setNotes={setNotes}

          />
        </Toggleable>
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
          <Note key={note.id}
            note={note}
            toggleImportanceOf={toggleImportanceOf}/>
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