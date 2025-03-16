import { createRoot } from 'react-dom/client'
import { legacy_createStore as createStore } from 'redux'
import {Provider} from 'react-redux'
import reducerManager from './reducers/noteReducer.js'
import App from './App.jsx'

const store = createStore(reducerManager)
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
store.subscribe(renderApp)
