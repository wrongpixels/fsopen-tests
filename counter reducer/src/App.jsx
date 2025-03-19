import CounterButton from './components/CounterButton.jsx'
import { useState } from './CounterContext.jsx'

const App = () => {
    return(
        <div>
            <div>{useState()}</div>
            <CounterButton label="+" value="INC" />
            <CounterButton label="-" value="DEC" />
            <CounterButton label="0" value="ZERO" />
        </div>
    )
}

export default App