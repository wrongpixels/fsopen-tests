import axios from 'axios'

const baseUrl = 'api/login/'

const loginUser = async ({ username, password }) => {

  if (!username || !password) {
    return
  }

  const result = await axios.post(baseUrl, { username, password })
  if (result.data) {
    const token = result.data.token
    console.log('Found token', token, 'for user', result.data.name)
    return result.data
  }
}
export default { loginUser }