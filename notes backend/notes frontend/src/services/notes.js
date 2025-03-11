import axios from 'axios'

const baseURL = '/api/notes/'
let token
let tokenObject

const setToken = newToken => {
  token = `Bearer ${newToken}`
  tokenObject = { headers: { Authorization: token } }
}

const missingNote = () => console.log('Note was not found!')

const getAll = async () => {
  try {
    const response = await axios.get(baseURL)
    return response.data
  } catch (error) {
    missingNote()
  }
}

const remove = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`)
  return response.data
}

const create = async (newNote) => {
  const response = await axios.post(baseURL, newNote, tokenObject)
  return response.data
}

const updateNote = async (updatedNote, id) => {
  const response = await axios.put(baseURL + id, updatedNote, tokenObject)
  return response.data
}

export default { getAll, create, updateNote, setToken, remove }