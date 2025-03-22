import React from 'react'
import axios from 'axios'

class App extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            anecdotes: [ ],
            current: 0
        }
    }

    handleNext = () => {
        const current = this.state.current
        const total = this.state.anecdotes.length
        let next = 0

        if (total !== 0)
        {
            next = current + 1 > total-1? 0 : current +1
        }
        this.setState({current: next})
    }

    componentDidMount = async () => {
        const response = await axios.get('http://localhost:3001/anecdotes')
        this.setState({ anecdotes: response.data })
    }


    render() {
        if (this.state.anecdotes.length === 0)
        {
            return <>No anecdotes…</>
        }
        return (
            <div>
                <h1>Anecdote of the day</h1>
                <p>
                    {this.state.anecdotes[this.state.current].content}
                </p>
                <p>
                    <button onClick={this.handleNext} >Next</button>
                </p>
            </div>
        )
    }
}

export default App