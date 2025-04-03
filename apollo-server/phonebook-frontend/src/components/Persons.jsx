import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import useField from '../hooks/useField.js'
import { FIND_PERSON, EDIT_NUMBER } from '../queries.js'
import { useNotification } from '../context/NotificationContext.jsx'

const drawData = (person) => {
  const { sendNotification } = useNotification()
  const [editNumber, setEditNumber] = useState(false)
  const editPhoneField = useField('text')
  const [replaceNum] = useMutation(EDIT_NUMBER, {
    onError: (e) =>
      sendNotification(e.graphQLErrors.map((e) => e.message).join(' ,')),
  })

  const replaceNumber = () => {
    replaceNum({
      variables: {
        name: person.name,
        phone: editPhoneField.value,
      },
    })
  }

  if (!person) {
    return null
  }
  return (
    <div>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>
        {person.phone}{' '}
        <button onClick={() => setEditNumber(!editNumber)}>
          {(person.phone ? 'Edit' : 'Add') + ' number'}
        </button>
        {editNumber && (
          <div>
            <input {...editPhoneField.props} />
            <button onClick={replaceNumber}>Save</button>
          </div>
        )}
      </div>
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
  const [personToFind, setNameToSearch] = useState('')
  const result = useQuery(FIND_PERSON, {
    variables: { personToFind },
    skip: !personToFind,
  })
  return (
    <>
      <h2>Persons</h2>
      {persons.map((p) => {
        const match = result?.data?.findPerson?.name === p.name
        return (
          <div key={p.id}>
            <Person
              person={match ? result.data.findPerson : p}
              showAll={match}
            />
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
