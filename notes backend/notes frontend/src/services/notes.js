import axios from 'axios'

const baseURL = '/api/notes/';
const missingNote = () => console.log('Note was not found!');

const getAll = () => axios.get(baseURL)
    .then(response => response.data).catch(missingNote);

const create = (newNote) => axios.post(baseURL, newNote)
    .then(response => response.data);

const updateNote = (updatedNote) => axios.put(baseURL + updatedNote.id, updatedNote)
    .then(response => response.data);

export default {getAll, create, updateNote}
