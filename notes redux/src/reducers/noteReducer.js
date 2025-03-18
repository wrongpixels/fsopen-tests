import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes.js'

const initialState = []

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
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
export const { replaceNote, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
    return async (dispatch) => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}

export const createNewNote = (note) => {
    return async (dispatch) => {
        const newNote = await noteService.createNew(note)
        dispatch(appendNote(newNote))
    }
}

export default noteSlice.reducer