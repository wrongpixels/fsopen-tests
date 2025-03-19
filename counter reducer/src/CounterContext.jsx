import { createContext, useReducer } from 'react'

const counterReducer = (state = 0, { type }) => {
    switch (type){
        case 'INC': return state + 1
        case 'DEC': return state - 1
        case 'ZERO': return 0
        default: return state
    }
}
const CounterContext = createContext()

export const CounterContextProvider = (props) => {
    const counterValues = useReducer(counterReducer, 0)

    return(
        <CounterContext.Provider value={counterValues} >
            {props.children}
        </CounterContext.Provider>
    )
}

export default CounterContext