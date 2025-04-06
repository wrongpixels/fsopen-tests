import { useNotification } from '../context/NotificationContext.jsx'
import useField from '../hooks/useField.jsx'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries.js'

const LoginForm = ({ setToken }) => {
  const { sendNotification } = useNotification()
  const usernameField = useField()
  const passwordField = useField('password')
  const [loginMutation, loginResult] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setToken(data.login.value)
      sendNotification(`Welcome back, ${usernameField.value}`)
      localStorage.setItem('user-token', data.login.value)
    },
    onError: (e) => sendNotification(e.message, true),
  })

  const doLogin = (e) => {
    e.preventDefault()
    loginMutation({
      variables: {
        username: usernameField.value,
        password: passwordField.value,
      },
    })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={doLogin}>
        <div>User: {usernameField.field()}</div>
        <div>Password: {passwordField.field()}</div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
