import { createRoot } from 'react-dom/client'
import { legacy_createStore as createStore, combineReducers } from 'redux'
import {Provider} from 'react-redux'
import noteReducer from './reducers/noteReducer.js'
import filterReducer from './reducers/filterReducer.js'
import App from './App.jsx'

const reducer = combineReducers({
    notes: noteReducer,
    filter: filterReducer
})

const store = createStore(reducer)
store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
})
/*  <input  value={newNoteContent}
                onChange={({target}) => editNewNote(target.value)}
                />
                */

const root = createRoot(document.getElementById('root'))

const renderApp = () =>{
    root.render(
        <Provider store={store}>
        <App />
        </Provider>
    )
}
renderApp()
