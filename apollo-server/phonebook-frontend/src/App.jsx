import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons.jsx'

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

  return <Persons persons={result.data.allPersons} />
}

export default App
