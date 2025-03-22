import React, {useState, useEffect} from 'react'
import axios from 'axios'

const URL = BACKEND_URL
const useNotes = () => {
    const [value, setValue] = useState([])

    const getAll = async () => {
        const response = await axios.get(URL)
        setValue(response.data)
    }
    const createNew = async (content) => {
        const response = await axios.post(URL, {content, important: false})
        setValue([...value, response.data])
    }

    useEffect(() => {
        getAll()
    }, []);

    return {value, getAll, createNew}
}

const App = () => {

    const [ counter, setCounter ] = useState(0)
    const [ values, setValues ] = useState([])
    const notes = useNotes().value

    const handleClick = () => {
        setCounter(counter + 1)
        setValues(values.concat(counter))
    }

    return (
        <div className="container">
            hello webpack!!! {counter} clicks and {values}
            <button onClick={handleClick}>press</button>
            <div>
                {notes.length} notes on server {URL}
            </div>
        </div>
    )
}

export default App