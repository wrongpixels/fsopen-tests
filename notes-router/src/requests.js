import axios from 'axios'

const URL = 'http://localhost:3001/notes'

export const getNotes = async () => {
    const response = await axios.get(URL)
    return response.data
}

export const createNote = async (note) => {
    const response = await axios.post(URL, note)
    return response.data
}

export const updateNote = async (note) => {
    const response = await axios.put(`${URL}/${note.id}`, note)
    return response.data
}