import useField from '../hooks/useField.js'
import { useMutation } from '@apollo/client'
import { ADD_PERSON, ALL_PERSONS } from '../queries.js'
import { useNotification } from '../context/NotificationContext.jsx'

const PersonForm = () => {
  const { sendNotification } = useNotification()

  const [createPerson] = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (e) =>
      sendNotification(e.graphQLErrors.map((e) => e.message).join('\n'), true),
  })
  const nameField = useField('text')
  const phoneField = useField('number')
  const streetField = useField('text')
  const cityField = useField('text')
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createPerson({
            variables: {
              name: nameField.value,
              phone: phoneField.value,
              city: cityField.value,
              street: streetField.value,
            },
          })
        }}
      >
        <div>
          Name: <input {...nameField.props} />
        </div>
        <div>
          Phone: <input {...phoneField.props} />
        </div>
        <div>
          City; <input {...cityField.props} />
        </div>
        <div>
          Street: <input {...streetField.props} />
        </div>
        <button type="submit">Add person</button>
      </form>
    </div>
  )
}
export default PersonForm
