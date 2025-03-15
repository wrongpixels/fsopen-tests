import { createRoot } from 'react-dom/client'
import { legacy_createStore as createStore, combineReducers } from 'redux'

const initialState = [
    {
        content: 'Redux es poderoso para manejar estado',
        important: true,
        id: 1
    },
    {
        content: 'Las acciones describen qué pasó',
        important: false,
        id: 2
    }
];


const noteReducer = (state = initialState, {type, payload}) => {
    switch(type)
    {
        case 'NEW_NOTE': return state.concat(payload)
        case 'WIPE_NOTES': return []
        case 'MAKE_IMPORTANT' : {
            return state.map(n => n.id === payload.id?{...n, important:payload.important}:n)
        }
        default: return state
    }
}

const noteContentReducer = (state = '', {type, payload}) => {
    if (type === 'NEW_NOTE_CONTENT')
    {
        state = payload
    }
    return state
}

const visibilityReducer = (state = false, {type}) => {
    switch (type) {
        case 'SHOW_IMPORTANT': return true
        case 'SHOW_ALL': return false
        case 'TOGGLE': return !state
        default: return state
    }
}
const reducerManager = combineReducers({
    notes: noteReducer,
    visibility: visibilityReducer,
    newNoteContent: noteContentReducer
})

const store = createStore(reducerManager)
store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
})

const addNote = (note) => {
   const { notes } = store.getState()
    const newNote = {
        content: note,
        important: true,
        id: notes.length + 1
    }
    store.dispatch({type: 'NEW_NOTE', payload: newNote})
}
const changeNoteImportance = (id, important) => {
    const noteInfo = {id, important}
    store.dispatch({type: 'MAKE_IMPORTANT', payload: noteInfo})
}
const cleanNotes = () => store.dispatch({type: 'WIPE_NOTES'})
const toggleVisibility = () => store.dispatch({type: 'TOGGLE'})
const editNewNote = (content) => {
    store.dispatch({type: 'NEW_NOTE_CONTENT', payload: content})
}

const App = () => {
    const { visibility, newNoteContent, notes } = store.getState()
    const getNotes = () => {
        const visibleNotes = visibility?notes.filter(n => n.important):notes
        return(
            <ul>
                {visibleNotes.map(n =>
                   <li key={n.id}>{n.content}
                       <button
                           onClick={() => changeNoteImportance(n.id, !n.important)} >
                           {n.important?'Make not important':'Make important'}
                       </button>
                   </li>
                )}
            </ul>
        )
    }
    const addNewNote = (e) => {
        e.preventDefault()
        addNote(newNoteContent)
        editNewNote('')
    }
    return (
        <div>
            <h1>Notes!</h1>
            <button onClick={() => toggleVisibility()} >{visibility?'Show All':'Show Important Only'}</button>
            {getNotes()}
            <form onSubmit={addNewNote}>
                <input
                    value={newNoteContent}
                    onChange={({target}) => editNewNote(target.value)}
                />
                <button type='submit'>Add note</button>
            </form>
        </div>
    )
}

const root = createRoot(document.getElementById('root'))

const renderApp = () =>{
    root.render(<App />)
}
renderApp()
store.subscribe(renderApp)
