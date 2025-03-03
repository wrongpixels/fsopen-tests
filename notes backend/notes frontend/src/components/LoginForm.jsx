
const LoginForm = ({loginVisible, setLoginVisible, handleLogin, setUsername, setPassword, username, password }) => {


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
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        name="Password"
                        value={password}
                        type="password"
                        onChange={({target}) => setPassword(target.value)}/>
                </div>
                <br/>
                <div>
                    <button type='submit'>Sign in</button>
                    <br/>
                </div>
            </form>
            <br/>
            </div>
            <br/>
        </div>
    )
}

export default LoginForm