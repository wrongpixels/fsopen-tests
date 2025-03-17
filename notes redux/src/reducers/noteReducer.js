import { createSlice, current } from '@reduxjs/toolkit'

const initialState = [
    {
        content: 'Redux es poderoso para manejar estado',
        important: true,
        id: 1
    },
    {
        content: 'Las acciones describen qué pasó',
        important: false,
        id: 2
    }
];

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote(state, action){
            const content = action.payload
            state.push({
                content: content,
                important: false,
                id: generateId()
            })
        },
        toggleImportanceOf(state, action){
            const note = state.find(n => n.id === action.payload)
            note.important = !note.important
            console.log(current(state))
        }
    }

})
export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer