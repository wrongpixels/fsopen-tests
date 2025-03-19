import { createContext, useReducer, useContext } from 'react'

const counterReducer = (state = 0, { type }) => {
    switch (type){
        case 'INC': return state + 1
        case 'DEC': return state - 1
        case 'ZERO': return 0
        default: return state
    }
}
const CounterContext = createContext()

export const useDispatch = () => useContext(CounterContext)[1]

export const useState = () => useContext(CounterContext)[0]

export const CounterContextProvider = (props) => {
    const counterValues = useReducer(counterReducer, 0)

    return(
        <CounterContext.Provider value={counterValues} >
            {props.children}
        </CounterContext.Provider>
    )
}

export default CounterContext