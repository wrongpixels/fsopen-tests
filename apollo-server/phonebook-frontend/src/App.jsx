import { useQuery } from '@apollo/client'
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import { ALL_PERSONS } from './queries.js'
import { useNotification } from './context/NotificationContext.jsx'

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
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <>Loading…</>
  }

  return (
    <div>
      <Notify />
      <Persons persons={result.data.allPersons} />
      <h3>Add a new person</h3>
      <PersonForm ALL_PERSONS={ALL_PERSONS} />
    </div>
  )
}

export default App
