import {combineReducers} from "redux";

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
const noteReducer = (state = initialState, {type, payload}) => {
    switch(type)
    {
        case 'NEW_NOTE': return state.concat(payload)
        case 'WIPE_NOTES': return []
        case 'TOGGLE_IMPORTANCE' : {
            return state.map(n => n.id === payload.id?{...n, important:!n.important}:n)
        }
        default: return state
    }
}
const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
    const payload = {
        content: content,
        important: true,
        id: generateId()
    }
    return { type: 'NEW_NOTE', payload }
}
export const toggleImportanceOf = (id) => ({type: 'TOGGLE_IMPORTANCE', payload: {id} })

const visibilityReducer = (state = false, {type}) => {
    switch (type) {
        case 'SHOW_IMPORTANT': return true
        case 'SHOW_ALL': return false
        case 'TOGGLE': return !state
        default: return state
    }
}
const reducerManager = combineReducers({
    notes: noteReducer,
    visibility: visibilityReducer,
    newNoteContent: noteContentReducer
})

export default reducerManager