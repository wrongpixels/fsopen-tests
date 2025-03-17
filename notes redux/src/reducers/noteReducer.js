import { createSlice, current } from '@reduxjs/toolkit'

const initialState = []

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote(state, { payload }){
            state.push(payload)
        },
        replaceNote(state, { payload }){
            return state.map(n => n.id === payload.id?payload:n)
        },
        appendNote(state, {payload}){
            state.push(payload)
        },
        setNotes(state, {payload}){
            return payload
        }
    }

})
export const { createNote, replaceNote, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer