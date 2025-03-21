import { useState } from 'react'
import styled from 'styled-components'

import {
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch
} from "react-router-dom"


const Home = () => (
    <div>
        <h2>TKTL notes app</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
)

const Note = ({ note }) => {
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div><strong>{note.important ? 'important' : ''}</strong></div>
            <p>
                <Link to="/notes">Go back </Link>
            </p>

        </div>
    )
}

const Notes = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        <ul>
            {notes.map(note =>
                <li key={note.id}>
                    <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </li>
            )}
        </ul>
    </div>
)

const Users = () => (
    <div>
        <h2>TKTL notes app</h2>
        <ul>
            <li>Matti Luukkainen</li>
            <li>Juha Tauriainen</li>
            <li>Arto Hellas</li>
        </ul>
    </div>
)

const Login = (props) => {
    const navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('mluukkai')
        navigate('/')
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username: <Input />
                </div>
                <div>
                    password: <Input type='password' />
                </div>
                <Button type="submit">login</Button>
            </form>
        </div>
    )
}

const Page = styled.div`
    background: #e8e8e8;
    padding: 2em;
`
const NavigationBar = styled.div`
    background: #2b405b;
    color: white;
    padding: 0.75em;

    a {
        color: #85d9ff;
        text-decoration: none;
    }
`
const Footer = styled.footer`
    background: #d9d9d9;
    padding: 1em;
    margin-top: 1em;
`


const Button = styled.button`
    background: #069ecc;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #1174c5;
    border-radius: 3px;
    color: white;
`
const Input = styled.input`
margin: 0.25em;
`

const App = () => {

    const [notes, setNotes] = useState([
        {
            id: 1,
            content: 'HTML is easy',
            important: true,
            user: 'Matti Luukkainen'
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false,
            user: 'Matti Luukkainen'
        },
        {
            id: 3,
            content: 'Most important methods of HTTP-protocol are GET and POST',
            important: true,
            user: 'Arto Hellas'
        }
    ])
    const match = useMatch('/notes/:id')
    const activeNote = match?notes.find(n => n.id === Number(match.params.id)):null
    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }

    const padding = {
        padding: 5
    }

    return (
        <Page>
            <NavigationBar>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/notes">notes</Link>
                {user && <Link style={padding} to="/users">users</Link>}
                {user
                    ? <em>{user} logged in</em>
                    : <Link style={padding} to="/login">login</Link>
                }
            </NavigationBar>

            <Routes>
                <Route path="/notes/:id" element={<Note note={activeNote}/>}/>
                <Route path="/notes" element={<Notes notes={notes}/>}/>
                <Route path="/users" element={user ? <Users/> : <Navigate replace to="/login"/>}/>
                <Route path="/login" element={<Login onLogin={login}/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
            <Footer>
                <em>Note app, Department of Computer Science 2025</em>
            </Footer>
        </Page>
    )
}
export default App