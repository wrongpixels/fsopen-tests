import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      address {
        street
        city
      }
    }
  }
`
const drawData = (person) => {
  return (
    <div>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone} </div>
    </div>
  )
}

const Person = ({ person, showAll }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      {showAll && drawData(person)}
    </div>
  )
}

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState('')
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  })

  return (
    <>
      <h2>Persons</h2>
      {persons.map((p) => {
        const match = nameToSearch === p.name
        return (
          <div key={p.id}>
            <Person person={p} showAll={match} />
            <div>
              <button onClick={() => setNameToSearch(match ? '' : p.name)}>
                {match ? 'Close' : 'Open'}
              </button>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Persons
