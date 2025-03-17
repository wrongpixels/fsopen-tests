import axios from 'axios'

const baseURL = 'http://localhost:3001/notes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const createNew = async (note) => {
    const response = await axios.post(baseURL, { content: note, important: false })
    return response.data
}

const replaceNote = async (note) => {
    const response = await axios.put(`${baseURL}/${note.id}`, note)
    return response.data
}

export default {
    getAll,
    createNew,
    replaceNote
}