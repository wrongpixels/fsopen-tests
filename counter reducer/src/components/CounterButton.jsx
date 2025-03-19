import { useDispatch } from '../CounterContext.jsx'

const CounterButton = ({ label, value }) => {
    const dispatch = useDispatch()
    return (
        <button onClick={() => dispatch({ type: value })}>{label}</button>
    )
}

export default CounterButton