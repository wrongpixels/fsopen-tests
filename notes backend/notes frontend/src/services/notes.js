import axios from 'axios'

const baseURL = '/api/notes/';
let token;

const setToken = newToken => {
    token = `Bearer ${newToken}`
    tokenObject = {headers: {Authorization: token}}
}
const missingNote = () => console.log('Note was not found!');

let tokenObject

const getAll = () => axios.get(baseURL)
    .then(response => response.data).catch(missingNote);

const create = async (newNote) => {

    const res = await axios.post(baseURL, newNote, tokenObject)
    return res.data
}

const updateNote = (updatedNote) => axios.put(baseURL + updatedNote.id, updatedNote, tokenObject)
    .then(response => response.data);

export default {getAll, create, updateNote, setToken}
