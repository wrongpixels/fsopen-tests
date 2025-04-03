import { useState } from 'react'

const useField = (type = 'text', name = '') => {
  const [value, setValue] = useState('')
  const onChange = (e) => setValue(e.target.value)
  const clear = () => setValue('')
  const props = { value, type, name, onChange }
  return {
    value,
    props,
    functions: { clear },
    field: () => {
      return <input {...props}></input>
    },
  }
}
export default useField
