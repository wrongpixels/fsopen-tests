import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import noteReducer from './reducers/noteReducer.js'
import filterReducer from './reducers/filterReducer.js'
import App from './App.jsx'

const store = configureStore({
    reducer: {
            notes: noteReducer,
            filter: filterReducer
        }
})

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
