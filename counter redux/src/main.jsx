import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { legacy_createStore as createStore } from 'redux'

const counterReducer = (state = 0, {type}) => {
    switch(type)
    {
        case 'INCREMENT': return state + 1
        case 'DECREMENT': return state - 1
        case 'ZERO' : return 0
        default: return state
    }
}
const store = createStore(counterReducer)
store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
})

const incr = ({ type: 'INCREMENT' })
const decr = ({ type: 'DECREMENT' })
const zero = ({ type: 'ZERO' })

const increment = (amount = 1) => {
    for (let i = 0; i < amount; i++) {
        store.dispatch(incr)
    }
}
const decrement = (amount = 1) => {
    for (let i = 0; i < amount; i++) {
        store.dispatch(decr)
    }
}
const clean = () => {
   store.dispatch(zero)
}

const App = () => {
    return (
        <div>
            <h1>Counter app!</h1>
            {store.getState()}
            <p><button onClick={() => increment()} >Add</button> <button onClick={() => decrement()}>Remove</button> </p>
            <button onClick={() => clean()}>Clean</button>
        </div>
    )
}

const root = createRoot(document.getElementById('root'))

const renderApp = () =>{
    root.render(<App />)
}
renderApp()
store.subscribe(renderApp)
