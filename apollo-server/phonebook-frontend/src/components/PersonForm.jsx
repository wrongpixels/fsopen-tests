import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_PERSON = gql`
  mutation addPersonByData(
    $name: String!
    $phone: String
    $city: String!
    $street: String!
  ) {
    addPerson(name: $name, phone: $phone, city: $city, street: $street) {
      name
      phone
      address {
        city
        street
      }
    }
  }
`

const inputField = (type, name = '') => {
  const [value, setValue] = useState('')
  const onChange = (e) => setValue(e.target.value)
  const clear = () => setValue('')
  return {
    value,
    props: { value, type, name, onChange },
    functions: { clear },
  }
}

const PersonForm = ({ ALL_PERSONS }) => {
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
  })
  const nameField = inputField('text')
  const phoneField = inputField('number')
  const streetField = inputField('text')
  const cityField = inputField('text')
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
