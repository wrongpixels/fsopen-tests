import { gql, useQuery, useMutation } from '@apollo/client'
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`

const App = () => {
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <>Loading…</>
  }

  return (
    <div>
      <Persons persons={result.data.allPersons} />
      <h3>Add a new person</h3>
      <PersonForm ALL_PERSONS={ALL_PERSONS} />
    </div>
  )
}

export default App
