import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import useField from '../hooks/useField.jsx'
import { FIND_PERSON, EDIT_NUMBER } from '../queries.js'
import { useNotification } from '../context/NotificationContext.jsx'

const Person = ({ person, showAll }) => {
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
  if (!showAll) {
    return (
      <>
        <h2>{person.name}</h2>
      </>
    )
  }
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        <div>
          {person.address.street} {person.address.city}
        </div>
        <div>
          {person.phone}
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
    </div>
  )
}

const Persons = ({ persons }) => {
  const { sendNotification } = useNotification()

  const [personToFind, setNameToSearch] = useState('')
  const result = useQuery(FIND_PERSON, {
    variables: { personToFind },
    skip: !personToFind,
  })
  const [editNum] = useMutation(EDIT_NUMBER, {
    onError: (e) =>
      sendNotification(e.graphQLErrors.map((e) => e.message).join(' ,')),
  })
  const editNameField = useField()
  const editNumField = useField()

  const editNumber = (e) => {
    e.preventDefault()
    editNum({
      variables: {
        name: editNameField.value,
        phone: editNumField.value,
      },
    })
  }

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
      <h2>Edit a number</h2>
      <form onSubmit={editNumber}>
        Person: {editNameField.field()}
        New number: {editNumField.field()}
        <button type="submit">Edit</button>
      </form>
    </>
  )
}

export default Persons
