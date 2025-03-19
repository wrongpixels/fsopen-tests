import { useContext } from 'react'
import CounterContext from '../CounterContext.jsx'

const CounterButton = ({ label, value }) => {
    const dispatch = useContext(CounterContext)[1]
    return (
        <button onClick={() => dispatch({ type: value })}>{label}</button>
    )
}

export default CounterButton