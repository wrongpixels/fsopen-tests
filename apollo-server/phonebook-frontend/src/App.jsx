import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { useState } from 'react'
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import LoginForm from './components/LoginForm.jsx'
import { ALL_PERSONS, PERSON_ADDED } from './queries.js'
import { useNotification } from './context/NotificationContext.jsx'

export const updatePersonsCache = (cache, query, addedPerson) => {
  cache.updateQuery({ query }, (cachedValue) => {
    console.log(addedPerson, query)

    if (!cachedValue.allPersons.find((p) => p.name === addedPerson.name)) {
      return { allPersons: cachedValue.allPersons.concat(addedPerson) }
    }
  })
}

const Notify = () => {
  const { notification } = useNotification()
  if (!notification?.message) {
    return null
  }
  return (
    <h2 style={{ color: notification.isError ? 'red' : 'green' }}>
      {notification.message}
    </h2>
  )
}

const App = () => {
  const { sendNotification } = useNotification()
  useSubscription(PERSON_ADDED, {
    onData: ({ data, client }) => {
      updatePersonsCache(client.cache, ALL_PERSONS, data.data.personAdded)
    },
  })

  const [token, setToken] = useState(() => localStorage.getItem('user-token'))
  const result = useQuery(ALL_PERSONS)
  const apolloClient = useApolloClient()
  const logout = () => {
    setToken(null)
    apolloClient.resetStore()
    localStorage.removeItem('user-token')
    sendNotification('See you soon!')
  }

  if (result.loading) {
    return <>Loading…</>
  }

  if (!token) {
    return (
      <div>
        <Notify />
        <LoginForm setToken={setToken} />
      </div>
    )
  }

  return (
    <div>
      <Notify />
      <button onClick={logout}>Log out</button>
      <Persons persons={result.data.allPersons} />
      <h3>Add a new person</h3>
      <PersonForm ALL_PERSONS={ALL_PERSONS} />
    </div>
  )
}

export default App
