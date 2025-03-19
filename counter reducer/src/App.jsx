import { useContext } from 'react'
import CounterButton from './components/CounterButton.jsx'
import CounterContext from './CounterContext.jsx'

const App = () => {
    const counterValues = useContext(CounterContext)
    return(
        <div>
            <div>{counterValues[0]}</div>
            <CounterButton label="+" value="INC" />
            <CounterButton label="-" value="DEC" />
            <CounterButton label="0" value="ZERO" />
        </div>
    )
}

export default App