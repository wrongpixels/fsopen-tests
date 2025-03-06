import { useState } from 'react'
import PropTypes from 'prop-types'
import loginServices from '../services/login.js'
import noteService from '../services/notes.js'


const LoginForm = ({ setUser, save, loginVisible, setLoginVisible, sendErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    setLoginVisible: PropTypes.func.isRequired,
    sendErrorMessage: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    loginVisible: PropTypes.bool.isRequired

  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username, password, 'to login')
    try {
      const user = await loginServices.loginUser({ username, password })
      sendErrorMessage(`Welcome back, ${user.name}!`)
      setPassword('')
      setUsername('')
      setUser(user)
      save('loggedUser', user)
      noteService.setToken(user.token)
    } catch (error) {
      sendErrorMessage('Wrong user or password')
    }
  }

  const handleVisibility = (evt) => {
    evt.preventDefault()
    setLoginVisible(!loginVisible)
  }

  return (
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
                    username
            <input
              name="Username"
              value={username}
              type="text"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
                    password
            <input
              name="Password"
              value={password}
              type="password"
              onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <br/>
          <div>
            <button type='submit'>Sign in</button>
            <br/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm